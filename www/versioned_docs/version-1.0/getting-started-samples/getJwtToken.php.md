---
    id: getJwtToken.php
    title: getJwtToken.php
    custom_edit_url: https://github.com/vectara/getting-started/blob/main/language-examples/php/rest/getJwtToken.php
    sidebar_label: PHP
---

This is an example of using the platform via REST.  For more sample code, including any dependencies this file has, please have a look at our GitHub examples repository.  This file can be found in that repo at <a href="https://github.com/vectara/getting-started/tree/main/language-examples/php/rest/getJwtToken.php">php/rest/getJwtToken.php</a>

```php title="php/rest/getJwtToken.php"
<?php
/**
 * Returns an Authentication token based on the parameters passed.
 *
 * @auth_url         Authentication URL for this customer.
 * @client_id        App client ID.
 * @client_secret    App client secret.
 *
 * Returns           A valid app token in case of success or empty in case of failure.
 */
function get_token($auth_url, $client_id, $client_secret)
{
    //remove trialing / from auth_url
    $url = rtrim($auth_url, '/');

    // append /oauth2/token to the auth_url if it does not end with it 
    if (!str_ends_with($url, '/oauth2/token')) {
        $auth_url .= '/oauth2/token';
    }

    $fields = [
        'grant_type' => 'client_credentials',
        'client_id' => $client_id,
        'client_secret' => $client_secret
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($fields));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec($ch);
    curl_close($ch);

    $data = json_decode($result);
    return $data->access_token;
}
?>

```
