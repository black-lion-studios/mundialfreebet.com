import React from 'react';
import { HashRouter as Router } from "react-router-dom";
import { Admin, Resource, ListGuesser, defaultTheme } from 'react-admin';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import jsonServerProvider from 'ra-data-json-server';
import Layout from './Bar';
import {
  AdminEventList,
  TeamCreate, TeamEdit, TeamList,
  EventCreate, EventEdit, EventList,
} from './Resources';
import authProvider from './authProvider';
import Login from './components/Login';

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
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'].join(','),
  },
};

export const url = 'https://5leb08.deta.dev';
const dataProvider = jsonServerProvider(url);

const App = () => {
  return (
    <Router>
      <Admin loginPage={Login} theme={myTheme} dataProvider={dataProvider} authProvider={authProvider} layout={Layout}>
        <Resource name="events" list={EventList} icon={EmojiEventsIcon} />
        <Resource name="bets" list={ListGuesser} icon={PlaylistAddCheckIcon} />
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
