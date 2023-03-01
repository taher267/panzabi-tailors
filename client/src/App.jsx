import './App.css';
import Main from './component/Main';
import { Auth0Provider } from '@auth0/auth0-react';
function App() {
  return (
    <Auth0Provider
      domain="dev-22f83paft2033tj8.us.auth0.com"
      clientId="GucWmvzJZYCkeLE2FbdCeOU5aOHBhId0"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Main />
    </Auth0Provider>
  );
}

export default App;
