---
    id: queryDataApiKey.php
    title: queryDataApiKey.php
    custom_edit_url: https://github.com/vectara/getting-started/blob/main/language-examples/php/rest/queryDataApiKey.php
    sidebar_label: PHP
---

This is a complete example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at <a href="https://github.com/vectara/getting-started/tree/main/language-examples/php/rest/queryDataApiKey.php">php/rest/queryDataApiKey.php</a>

```php title="php/rest/queryDataApiKey.php"
<?php
/**
 * Queries a corpus corpus in Vectara platform using HTTP/REST.
 *
 * @customer_id         Unique customer ID in Vectara platform.
 * @corpus_id           ID of corpus to be queried.
 * @serving_endpoint    The endpoint of Vectara Querying server.
 * @api_key             The API Key from Vectara platform.
 * @query               The query text.
 *
 * Returns              The result of query rest call.
 */


$url = 'https://' . $_POST['serving_endpoint'] . '/v1/query';
$customer_id = $_POST['customer_id'];
$corpus_id = $_POST['corpus_id'];
$query = $_POST['query'];
$api_key = $_POST['api_key'];

$query_data = [
    'query' => $query,
    'numResults' => 10,
    'corpusKey' => [
        [
            'customerId' => $customer_id,
            'corpusId' => $corpus_id,
        ],
    ],
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type:application/json',
    'x-api-key:' . strval($api_key),
    'customer-id: ' . strval($customer_id),
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['query' => [$query_data]]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($ch);
curl_close($ch);

echo $result;
?>

```
