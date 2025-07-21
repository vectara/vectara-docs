---
    id: RestDeleteDocument.java
    title: RestDeleteDocument.java
    custom_edit_url: https://github.com/vectara/getting-started/blob/main/language-examples/java/rest/src/main/java/com/vectara/examples/rest/RestDeleteDocument.java
    sidebar_label: Java
---

This is an example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at <a href="https://github.com/vectara/getting-started/tree/main/language-examples/java/rest/src/main/java/com/vectara/examples/rest/RestDeleteDocument.java">java/rest/src/main/java/com/vectara/examples/rest/RestDeleteDocument.java</a>

```java title="java/rest/src/main/java/com/vectara/examples/rest/RestDeleteDocument.java"
package com.vectara.examples.rest;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

import CodePanel from '@site/src/theme/CodePanel';


public class RestDeleteDocument {
  /**
   * Deletes a document from a corpus.
   *
   * @param jwtToken    A valid JWT token.
   * @param indexingUrl Indexing URL at which gRPC endpoints are available.
   * @param docId       document id
   * @param customerId  The unique customer ID in the Vectara platform.
   * @param corpusId    The unique corpus ID.
   * @return success or failure.
   */
  public static boolean deleteDocument(
      String jwtToken, String indexingUrl, String docId, long customerId, long corpusId) {
    try {
      ObjectMapper mapper = new ObjectMapper();
      Map<String, Object> writeRequest = new HashMap<>();
      writeRequest.put("customerId", customerId);
      writeRequest.put("corpusId", corpusId);
      writeRequest.put("documentId", docId);
      String deleteJsonRequest = mapper.writer().writeValueAsString(writeRequest);
      System.out.println(deleteJsonRequest);
      HttpRequest.Builder builder = HttpRequest.newBuilder()
          .uri(URI.create(String.format("https://%s/v1/delete-doc", indexingUrl)))
          .headers("Content-Type", "application/json", "customer-id", String.valueOf(customerId))
          .POST(HttpRequest.BodyPublishers.ofString(deleteJsonRequest));
      builder.header("Authorization", "Bearer " + jwtToken);
      HttpRequest httpRequest = builder.build();
      HttpResponse<String> response = RestUtil.newHttpClient().send(httpRequest, HttpResponse.BodyHandlers.ofString());
      System.out.printf("Delete document response: %s%n", response.toString());
      return true;
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
  }
}

```
