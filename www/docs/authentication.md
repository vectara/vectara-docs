---
id: authentication
title: OAuth 2.0
sidebar_label: Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from './definitions.md';
import {vars} from '@site/static/variables.json';

[OAuth 2.0](https://oauth.net/2/) forms the basis for authentication on the
platform. This section provides practical guidance, in several languages, for
authenticating requests.

## Client Credentials Grant

The most straightforward scenario is machine-to-machine authentication, which is
handled with a [client credentials
grant](https://tools.ietf.org/html/rfc6749#section-4.4). In this scenario, a
trusted, confidential server uses its own credentials, generally referred to as
an `app-id` and `app-secret` tuple, to authenticate requests. The server,
not <Config v="names.product"/>, is responsible for managing authentication and authorization
of individual users.

The server behind a publicly-accessible semantic search engine such as [Quanta
Search](https://quantasearch.club/) should use this strategy.

:::important

If you are using Java, please contact us for convenient helper libraries that
encapsulate the steps below.

:::

### Obtain the JWT Token

In the code snippet below, the **token endpoint** is `<AUTH_URL>/oauth2/token`
where AUTH_URL is the location of your account's authentication domain.
To determine its value, navigate to the [Authentication page](
https://console.vectara.com/authentication) of the console and select the
App Client tab.

![Authentication Domain](/img/auth_domain.png)

The **client id** is the `app_id`, and the **redirect URI**
must match the redirect URL configured for the client. Note the peculiarities
of the HTTP authorization header: this is per the OAuth 2.0 standard.

The **grant type** should be `client_credentials` for App Clients. This auth
flow is commonly used for servers that must communicate with the platform. It
should be `authorization_code` for authentication from apps installed on a
device, such as web browsers. Finally, `refresh_token` is used to referesh
an expired token.

<Tabs
  defaultValue="java"
  values={[
    { label: 'Java', value: 'java', },
    { label: 'Python', value: 'py', },
    { label: 'PHP', value: 'php', },
    { label: 'cURL', value: 'curl', },
  ]
}>
<TabItem value="php">

This example uses [League/oauth2-client](https://oauth2-client.thephpleague.com/).

<pre>{`$provider = new \\League\\OAuth2\\Client\\Provider\\GenericProvider([
    'clientId'                => '...',
    'clientSecret'            => '...',
    'urlAuthorize'            => 'https://${vars['domains.oauth']}/oauth2/authorize',
    'urlAccessToken'          => 'https://${vars['domains.oauth']}/oauth2/token',
    'urlResourceOwnerDetails' => 'https://${vars['domains.oauth']}/oauth2/resource'
]);

// Note that the response includes an expiration date. It should be valid
// for at least one hour. Any requests that are sent during that validity
// timeframe can reuse this accessToken.
try {
    // Try to get an access token using the client credentials grant.
    $accessToken = $provider->getAccessToken('client_credentials');
} catch (\\League\\OAuth2\\Client\\Provider\\Exception\\IdentityProviderException $e) {
    // Failed to get the access token
    exit($e->getMessage());
}
`}
</pre>

</TabItem>
<TabItem value="py">

<pre>{`from authlib.integrations.requests_client import OAuth2Session

token_endpoint="https://${vars['domains.oauth']}/oauth2/token"
session = OAuth2Session(app_id, app_secret, scope="")
token = session.fetch_token(token_endpoint, grant_type="client_credentials")`}
</pre>

</TabItem>
<TabItem value="java">

```java
// The code below uses the java.net.http package.
String grantType = "authorization_code";  // or "client_credentials"
HttpRequest.Builder builder = HttpRequest.newBuilder()
    .uri(tokenEndpoint)
    .header("Content-Type", "application/x-www-form-urlencoded")
    .POST(BodyPublishers.ofString(
        String.format(
            "grant_type=%s&client_id=%s&redirect_uri=%s",
            grantType, clientId, redirectUri
     )));
if (clientSecret != null) {
  builder.header(
      "Authorization", "Basic " +
      BaseEncoding.base64().encode((clientId + ":" + clientSecret).getBytes()));
}
HttpRequest request = builder.build();
```

</TabItem>
<TabItem value="curl">

The Bash code below retrieves a JWT token and saves it into an environment
variable named `JWT_TOKEN`.

<pre>{`CUSTOMER_ID=...
AUTH_DOMAIN=https://${vars['domains.oauth']}
APP_ID=...
APP_SECRET=...
JWT_TOKEN=$(curl -s --request POST \\
  --url "\${AUTH_DOMAIN}/oauth2/token" \\
  --header 'content-type: application/x-www-form-urlencoded' \\
  --data grant_type=client_credentials \\
  --data client_id=\${APP_ID} \\
  --data client_secret=\${APP_SECRET})
`}</pre>

If you have [jq](https://stedolan.github.io/jq/) installed on your system, you
can pretty-print the output token:

```bash
jq . <<< $JWT_TOKEN
```

</TabItem>
</Tabs>


In response, the authentication server will return a JWT token that can be
presented to the search platform.

:::note

The TokenResponse and StatusOr helper classes simplify handling of the JWT
token. We should release it as part of our public security JAR.

:::

```java
    try {
      HttpResponse<String> response =
          httpClient.send(request, BodyHandlers.ofString());
      @SuppressWarnings("unchecked")
      Map<String, Object> map = new Gson().fromJson(response.body(), Map.class);
      TokenResponse tok = new TokenResponse(map);
      return tok.hasError()
          ? new StatusOr<>(StatusCode.FAILURE, tok.getError())
          : new StatusOr<>(tok);
    } catch (IOException | InterruptedException e) {
      return new StatusOr<>(e);
    }
```

### Configure Call Credentials

Every request to the platform must include the customer id in addition to the
previously-obtained JWT token. The `CallCredentials` utility class handles both
of these on a gRPC credential, using code that looks like this:

<Tabs
  defaultValue="java"
  values={[
    { label: 'Java', value: 'java', },
    { label: 'Python', value: 'py', },
    { label: 'PHP', value: 'php', },
  ]
}>
<TabItem value="php">

In PHP, the call credentials are set by specifying a method at the time the
gRPC client is created.

<pre>{`$client = new ${vars['package.php']}\\\\QueryServiceClient('${vars['domains.grpc.serving']}:443', [
  'credentials' => Grpc\ChannelCredentials::createSsl(),
  'update_metadata' => function($metaData) use ($accessToken) {
     $metaData['Authorization'] = ['Bearer ' . $accessToken];
     $metaData['customer-id-bin'] = [pack('J', $customerId)];
     return $metaData;
  }
]);
`}</pre>

</TabItem>
<TabItem value="py">

```py
# Create the call credentials using the access token returned by the
# OAuth 2.0 provider.
call_credentials = grpc.access_token_call_credentials(token["access_token"])

# Attach the credentials to the actual gRPC call.
response = stub.IndexDocument(index_req,
                              credentials=call_credentials,
                              metadata=[('customer-id-bin', packed_customer_id)])
```

</TabItem>
<TabItem value="java">

```java
BatchQueryResponse response = vectaraClient
    .withCallCredentials(
        new CognitoCallCredentials(customerId, jwtAccessToken))
    .query(servingRequest.build());
```

</TabItem>
</Tabs>

:::note

We should release it as part of our public security JAR.

:::

## Authorization Code Grant

The authorization code grant should be used whenever an end user will directly
authenticate themselves, and those authentication credentials should be passed
to the platform for authorization. Compared with machine-to-machine
authentication, this approach allows much finer-grained control of access to the
system.

TODO(amin): Fill this section in, once the helper classes have been published.

## Call Metadata

<Config v="names.product"/> requires certain metadata to be present in every call. This
section explains the meaning of each value.

### customer-id-bin

An 8-byte big endian representation of the customer ID. This must be present in
every request to the platform.


<Tabs
  defaultValue="java"
  values={[
    { label: 'Java', value: 'java', },
    { label: 'Python', value: 'py', },
    { label: 'PHP', value: 'php', },
  ]
}>
<TabItem value="php">

The code below is part of the `update_metadata` function passed during creation
of the gRPC client.

```php
$metaData['customer-id-bin'] = [pack('J', $customerId)];
```

</TabItem>
<TabItem value="py">

```py
packed_customer_id = struct.pack('>q', customer_id)

# Later, specify the packed_customer_id as call metadata.
response = stub.IndexDocument(
    index_req,
    credentials=call_credentials,
    metadata=[('customer-id-bin', packed_customer_id)])
```

</TabItem>
<TabItem value="java">

```java
// The BinaryMarshaller instance below can be used to create
// an 8-byte big endian representation of a value.
private static final BinaryMarshaller<Long> LONG_MARSHALLER =
    new BinaryMarshaller<Long>() {
      @Override
      public byte[] toBytes(Long value) {
        return Longs.toByteArray(value);
      }

      @Override
      public Long parseBytes(byte[] serialized) {
        return Longs.fromByteArray(serialized);
      }
    };


// Define a Metadata Key using code like below.
public static final Metadata.Key<Long> CUSTOMER_ID =
    Metadata.Key.of("customer-id-bin", LONG_MARSHALLER);


// Later, you specify your own subclass of io.grpc.CallCredentials.
public class VectaraCallCredentials extends CallCredentials {
  ...
  @Override
  public void applyRequestMetadata(RequestInfo requestInfo,
      Executor appExecutor, MetadataApplier applier) {
    Metadata m = new Metadata();
    m.put(CUSTOMER_ID, customerId);
    applier.apply(m);
  }
}

// When these call credentials are attached to a gRPC call, the customer ID will
// automatically be included.
BatchQueryResponse response = syncStub
    .withCallCredentials(new VectaraCallCredentials(jwtToken, customerId))
    .query(servingRequest);
```

</TabItem>
</Tabs>
