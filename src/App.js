import React from 'react';
import { HashRouter as Router } from "react-router-dom";
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import * as reactRouterDom from "react-router-dom";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { Admin, Resource, CustomRoutes, ListGuesser, defaultTheme } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import Layout from './Bar';
import {
  AdminEventList,
  TeamCreate, TeamEdit, TeamList,
  EventCreate, EventEdit, EventList,
} from './Resources';

const myTheme = {
  ...defaultTheme,
    palette: {
      type: 'light',
      primary: {
        main: '#780f03',
      },
      secondary: {
        main: '#d8cf28',
        contrastText: '#142a3d',
      },
      info: {
        main: '#d8cf28',
      },
      background: {
        default: '#efe9e1',
        paper: '#fffef0',
      },
      text: {
        primary: '#142a3d',
      },
    },
  typography: {
      // Use the system font instead of the default Roboto font.
      fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
  },
};

SuperTokens.init({
  appInfo: {
    appName: "mundial",
    apiDomain: "https://5leb08.deta.dev",
    websiteDomain: process.env.REACT_APP_WEBSITE_DOMAIN,
    apiBasePath: "/auth",
    websiteBasePath: "/#/",
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      getRedirectionURL: async (context) => {
        if (context.action === "SUCCESS") {
          if (context.redirectToPath !== undefined) {
            return context.redirectToPath;
          }
          return "/events";
        }
        return undefined;
      },
      signInAndUpFeature: {
        providers: [
          // Google.init(),
          // Facebook.init(),
        ]
      }
    }),
    EmailPassword.init(),
    Session.init()
  ]
});

export const url = 'https://5leb08.deta.dev';

const dataProvider = jsonServerProvider(url);

const authProvider = {
  login: params => {
    return Promise.resolve();
  },
  checkError: params => {
    const { status } = params;

    if (status === 401 || status === 403) {
        return Promise.reject();
    }

    return Promise.resolve();
  },
  checkAuth: async params => {
    if (await Session.doesSessionExist()) {
      // let userId = await Session.getUserId();
      // let accessTokenPayload = await Session.getAccessTokenPayloadSecurely();
      return Promise.resolve();
    }

    return Promise.reject();
  },
  logout: async params => {
    const { path } = params;
    await signOut();
    window.location.href = path || "/#/";
    return Promise.reject({ redirectTo: '/#/', message: 'login.required' })
  },
  getIdentity: () => Promise.resolve(),
  getPermissions: () => Promise.resolve(),
};

const App = () => {
  return (
    <SuperTokensWrapper>
      <Router>
        <Admin theme={myTheme} dataProvider={dataProvider} authProvider={authProvider} layout={Layout}>
          <Resource name="events" list={EventList} />
          <Resource name="adminevents" options={{ label: 'Admin Events' }} list={AdminEventList} create={EventCreate} edit={EventEdit} />
          <Resource name="bets" list={ListGuesser} />
          <Resource name="teams" list={TeamList} create={TeamCreate} edit={TeamEdit} />
          <CustomRoutes>
            {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
          </CustomRoutes>
        </Admin>
      </Router>
    </SuperTokensWrapper>
  );
}

export default App;
