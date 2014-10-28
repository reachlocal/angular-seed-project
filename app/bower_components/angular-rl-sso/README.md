# AngularJS SSO Authentication
Add SSO support to your Angular (1.2+) app.  This is not a stand-alone SSO solution; you will need a server-side component to complete your app's SSO integration.

### Client Setup (Angular)
1. Install this module `bower install --save ssh://git@stash.lax.reachlocal.com/cpi/angular-rl-sso.git`
2. Include this module as a dependancy in your project `angular.module('rl.myApp', ['rl.sso'])`

### Server Setup (Rack/Rails)
See the [rl-rack-sso project](https://stash.lax.reachlocal.com/projects/CPI/repos/rack-rl-sso/browse) for details on installing and configuring the Gem.

### Server Setup (Generic)
If you need to setup your own REST SSO server integration, here's a quick guide.

![image](https://stash.lax.reachlocal.com/projects/CPI/repos/rack-rl-sso/browse/rl-sso-annotated.png?at=master&raw)

#### 401 Responses
**Given** a client does not have a valid JWT token for your app  
**When** a client makes a REST request  
**And** they do not have a valid Authentication header  
**Then** respond with a 401 Denied and the body:

```json
{
  "message": "Access denied.",
  "realm": {{ URL to SSO server (including app-specific params)}}
}
```

Example realm:  https://ssoqa.reachlocal.com/adfs/ls/?SAMLRequest=nZJRS8MwFIX%2FSt%2FylDbtuqlhHZQNYTBFNvXBl3FJb10hTbrc1Ll%2Fb9YpKqIP%0APl0I53zn3kOmBK3uZNn7nVnjvkfyUUmEzjfWzK2hvkW3QffSKHxYrwq2874j%0AmSSqa57B4wGOvCeI9xA7BLXTVoGOlW0TIpuE2Wn0yKJFADcGTtRPRpD89EFV%0AU6IpYdFyUbCtqCegrnLBVS1qLtJRyrNxnfELSCcjFJjVuQpSoh6XhjwYX7BM%0ApDkXEy7G9%2BmlzDOZ5U8sekRHQ3wWCxa9ttqQHK4vWO%2BMtEANSQMtkvRKbsqb%0AlQxK2TnrrbKazaYntRyi3Bf%2F33b4KJPNQmXb9862e5gmX3Bndidvg3%2B5uLO6%0AUceo1Noe5qEejwXzrg81XlvXgv89MY3T4aWpeD1IJbbQ6LKqHBL95%2Bpkdl70%0A%2Bx%2BZvQE%3D%0A

(The above response will trigger the login action in the client.  The client will direct the login realm.  When the user authenticates, they will be redirected back to your gateway.)

#### SSO Redirects
**Given** a user logs into the SSO ident provider login page  
**When** the gateway recieves a succussful redirect from the SSO ident provider  
**Then** it will create a JWT authentication token  
**And** it will pass the token through the iframe via a message  

Here's an example of a redirect page.  This should be the only non-REST page on your gateway.

```html
<!DOCTYPE html>
<html><head><script>

window.onload = function () {
  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRvbS5ob29kQHJlYWNobG9jYWwuY29tIiwiZXhwIjoxNDA0NTEyNjUwMzE4fQ.ShAO77Rq_KECS3YQghaRvw3lWSZuXuQzID6cyJNyU60';
  parent.postMessage({ type: 'token', value: token }, '*');
};

</script></head></html>
```

##### A Note on Tokens
The token you give to the client will be passed to the server with every request.  You can put any kind of data into your token.  By using JWT tokens, it allows for stateless/sessionless opperation.

The token in the example above contains the following data:

```json
{"email":"tom.hood@reachlocal.com","exp":1404512650318}
```

## Building and Releasing the Client
Currently, the only thing we build is the css file.  We are not minifying any assets or creating a dist directory.

To rebuild the css file from the scss source, just run:
```
bower install
npm install
gulp
```

Be sure to increment the version in the bower.json file and add a tag to the git commit.
