import React from 'react';
import { HashRouter as Router } from "react-router-dom";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Layout from './Bar';
import authProvider from './authProvider';
import themeProvider from './themeProvider';
import dataProvider from './dataProvider';
import Login from './components/Login';
import { useSelector } from 'react-redux';
import {
  Admin,
  Resource,
  ListGuesser,
  WithPermissions
} from 'react-admin';
import {
  TeamCreate,
  TeamEdit,
  TeamList
} from './resources/teams';
import {
  EventCreate,
  EventEdit,
  EventList
} from './resources/events';

const App = () => {
  const access_token = useSelector(state => state.user.access_token);

  return (
    <Router>
      <Admin key={access_token} loginPage={Login} theme={themeProvider} dataProvider={dataProvider(access_token)} authProvider={authProvider} layout={Layout}>
        <Resource name="events" icon={EmojiEventsIcon} list={<WithPermissions component={EventList} />} create={EventCreate} edit={EventEdit} />
        <Resource name="bets" icon={PlaylistAddCheckIcon} list={ListGuesser} />
        <Resource name="rubies" />
        {permissions => (
          <>
            { permissions === 'admin' && <Resource name="teams" list={TeamList} create={TeamCreate} edit={TeamEdit} icon={GroupAddIcon} />}
          </>
        )}
      </Admin>
    </Router>
  );
}

export default App;
