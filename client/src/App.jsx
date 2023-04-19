import './App.css';
import Main from './component/Main';
import { Auth0Provider } from '@auth0/auth0-react';
function App() {
  const { VITE_AUTH0_AUDIENCE, VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID } =
    import.meta.env;
  return <Main />;
  // return (
  //   <Auth0Provider
  //     // domain="dev-22f83paft2033tj8.us.auth0.com"
  //     domain={VITE_AUTH0_DOMAIN}
  //     clientId={VITE_AUTH0_CLIENT_ID}
  //     authorizationParams={{
  //       redirect_uri: window.location.origin,
  //     }}
  //   >
  //     <Main />
  //   </Auth0Provider>
  // );
}

export default App;
