// import postgrestRestProvider from "@promitheus/ra-data-postgrest";
import postgrestRestProvider from "./dataProvider/index";
import { fetchUtils } from "react-admin";

const httpClient = token => (url, options = {}) => {
  if (options.headers !== undefined) {
    options.headers.set('apikey', process.env.REACT_APP_SUPABASE_KEY);
  } else {
    options.headers = new Headers({
      'apikey': process.env.REACT_APP_SUPABASE_KEY
    });
  }

  if (token !== null) {
    options.user = {
      authenticated: true,
      // token: `Bearer ${token}`
      token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6InJvb3QifQ.mbSOoLla6YEq89skdt9gm-FRXyPYishX5s2hUBUVBfA`
    };
  }

  return fetchUtils.fetchJson(url, options);
};

const client = token => postgrestRestProvider(`http://sol.dictummortuum.com:2345`, httpClient(token));

export default client;
