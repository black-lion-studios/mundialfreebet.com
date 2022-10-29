import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from "react-router-dom";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Layout from './Bar';
import authProvider, { getSession } from './authProvider';
import themeProvider from './themeProvider';
import dataProvider from './dataProvider';
import Login from './components/Login';
import {
  Admin,
  Resource,
  ListGuesser,
  useGetIdentity
} from 'react-admin';
import {
  TeamCreate,
  TeamEdit,
  TeamList
} from './resources/teams';
import {
  AdminEventList,
  EventCreate,
  EventEdit,
  EventList,
} from './resources/events';

export const url = 'https://5leb08.deta.dev';

const useAccessToken = () => {
  const [access_token, setAccessToken] = useState(null);
  const { isLoading } = useGetIdentity();
  // console.log("asdf", asdf);

  useEffect(() => {
    getSession().then(d => {
      const { access_token: token } = d;
      console.log(token);
      setAccessToken(token);
    })
  }, [isLoading]);

  return access_token;
}

const App = () => {
  return (
    <Router>
      <Admin loginPage={Login} theme={themeProvider} dataProvider={dataProvider(useAccessToken())} authProvider={authProvider} layout={Layout}>
        <Resource name="events" list={EventList} icon={EmojiEventsIcon} />
        <Resource name="bets" list={ListGuesser} icon={PlaylistAddCheckIcon} />
        <Resource name="rubies" list={ListGuesser} icon={PlaylistAddCheckIcon} />
        {/* <Resource name="adminevents" options={{ label: 'Admin Events' }} list={AdminEventList} create={EventCreate} edit={EventEdit} icon={MoreTimeIcon} /> */}
        {permissions => (
          <>
            { permissions === 'admin' && <Resource name="adminevents" options={{ label: 'Admin Events' }} list={AdminEventList} create={EventCreate} edit={EventEdit} icon={MoreTimeIcon} />}
            { permissions === 'admin' && <Resource name="teams" list={TeamList} create={TeamCreate} edit={TeamEdit} icon={GroupAddIcon} />}
          </>
        )}
      </Admin>
    </Router>
  );
}

export default App;
