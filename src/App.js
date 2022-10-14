import React from 'react';
import { BrowserRouter, Routes } from "react-router-dom";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { Route } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
    appName: "mundial",
    apiDomain: "https://5leb08.deta.dev",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init(),
    Session.init()
  ]
});

const Bla = () => {
  let session = useSessionContext();

  if (session.loading) {
      return null;
  }

  let {doesSessionExist, userId, accessTokenPayload} = session;

  // doesSessionExist will always be true if this is wrapped in `<SessionAuth>`
  if (!doesSessionExist) {
      // TODO
  }

  // let userId = accessTokenPayload.userName;

  console.log(session, accessTokenPayload);

  return <h1>{userId}</h1>
}

const App = () => {
  return (
    <SuperTokensWrapper>
      <BrowserRouter>
        <Routes>
          {/*This renders the login UI on the /auth route*/}
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
          <Route exact path="/" element={<Bla />} />
          {/*Your app routes*/}
        </Routes>
      </BrowserRouter>
    </SuperTokensWrapper>
  );
}

export default App;
