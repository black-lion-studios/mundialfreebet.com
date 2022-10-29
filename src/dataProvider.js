import postgrestRestProvider from "@promitheus/ra-data-postgrest";
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
      token: `Bearer ${token}`
    };
  }

  return fetchUtils.fetchJson(url, options);
};

const client = token => postgrestRestProvider(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1`, httpClient(token));

export default client;
