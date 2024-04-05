---
    id: RestQueryData.cs
    title: RestQueryData.cs
    custom_edit_url: https://github.com/vectara/getting-started/blob/main/language-examples/csharp/rest/RestQueryData.cs
    sidebar_label: C#
---

This is an example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at <a href="https://github.com/vectara/getting-started/tree/main/language-examples/csharp/rest/RestQueryData.cs">csharp/rest/RestQueryData.cs</a>

```cs title="csharp/rest/RestQueryData.cs"
using System.Text.Json;
using Newtonsoft.Json.Linq;

class RestQueryData
{
    /// <summary>
    /// Queries a Vectara corpus.
    /// </summary>
    /// <param name="customerId"> The unique customer ID in Vectara platform. </param>
    /// <param name="corpusId"> The corpus that needs to be queried. </param>
    /// <param name="query"> The query text. </param>
    /// <param name="jwtToken"> A valid authentication token. </param>
    /// <throws> Exception if no results are found. </throws>
    public static void Query(long customerId, long corpusId, string query, string jwtToken)
    {
        using (var client = new HttpClient())
        {
            try
            {
                var request = new HttpRequestMessage
                {
                    RequestUri = new Uri($"https://{ServerEndpoints.commonEndpoint}/v1/query"),
                    Method = HttpMethod.Post,
                };
                Dictionary<string, object> queryData = new();
                List<object> queryList = new();
                List<object> corpusList = new()
                {
                    new Dictionary<string, object>()
                    {
                        {"customerId", customerId},
                        {"corpusId", corpusId}
                    }
                };
                queryList.Add(new Dictionary<string, object>()
                    {
                        {"query", query},
                        {"numResults", 10},
                        {"corpusKey", corpusList}
                    });

                queryData.Add("query", queryList);

                string jsonData = JsonSerializer.Serialize(queryData);

                request.Content = new StringContent(jsonData);
                request.Content.Headers.Remove("Content-Type");
                request.Content.Headers.Add("Content-Type", "application/json");

                request.Headers.Add("Authorization", $"Bearer {jwtToken}");
                request.Headers.Add("customer-id", customerId.ToString());

                HttpResponseMessage response = client.Send(request);
                string result = response.Content.ReadAsStringAsync().Result;
                JObject resultObj = JObject.Parse(result);
                JToken? statusArray = resultObj["status"];
                if (statusArray == null)
                {
                    throw new Exception("No results found");
                }
                foreach (var status in statusArray)
                {
                    JObject statusObj = JObject.Parse(status.ToString());
                    if (statusObj["code"].ToString() != "OK")
                    {
                        Console.Error.WriteLine(string.Format("Failure status on query: {0}", statusObj["statusDetail"]));
                    }
                }
                JToken? responseSetArray = resultObj["responseSet"];
                if (responseSetArray == null)
                {
                    throw new Exception("No results found");
                }
                foreach (var responseSet in responseSetArray)
                {
                    JObject responseSetObj = JObject.Parse(responseSet.ToString());
                    JToken? documents = responseSetObj["document"];

                    foreach (JToken docSection in responseSetObj["response"])
                    {
                        string text = docSection["text"].ToString();
                        double score = double.Parse(docSection["score"].ToString());
                        // doc that this section belongs to
                        int documentIndex = int.Parse(docSection["documentIndex"].ToString()); 
                        JToken doc = documents.ElementAt(documentIndex);
                        string docId = doc["id"].ToString();
                        Console.WriteLine("[score:{0:N2}] [docId:{1}] [text:{2}]", score, docId, text);
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
```
