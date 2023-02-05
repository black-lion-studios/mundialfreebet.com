import React from 'react';
import { HashRouter as Router } from "react-router-dom";
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
// import GroupAddIcon from '@mui/icons-material/GroupAdd';
// import Layout from './Bar';
// import authProvider from './authProvider';
import themeProvider from './themeProvider';
import simpleRestProvider from 'ra-data-simple-rest';
// import dataProvider from './dataProvider';
// import Login from './components/Login';
import { useSelector } from 'react-redux';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import { PlayList, PlayCreate, PlayEdit } from './resources/plays';
import { BGStatsPlayerList, BGStatsPlayerEdit } from './resources/bgstats/players';
import { BGStatsLocationList, BGStatsLocationEdit } from './resources/bgstats/locations';
import { BGStatsGamesList } from './resources/bgstats/games';
import { BGStatsPlayList, BGStatsPlayEdit } from './resources/bgstats/plays';
import { CachedpriceList } from './resources/cachedprices';
import Dashboard from './components/Dashboard';

const App = () => {
  const access_token = useSelector(state => state.user.access_token);

  return (
    <Router>
      <Admin key={access_token} theme={themeProvider} dataProvider={simpleRestProvider("http://localhost:10000")} dashboard={Dashboard}>
        <Resource name="players" list={ListGuesser} edit={EditGuesser} recordRepresentation={(record) => `${record.name} ${record.surname}`} />
        <Resource name="plays" list={PlayList} edit={PlayEdit} create={PlayCreate} />
        <Resource name="stats" />
        <Resource name="locations" />
        <Resource name="boardgames" list={ListGuesser} edit={EditGuesser} />
        <Resource name="stores" list={ListGuesser} edit={EditGuesser} />
        <Resource name="bgstatsplayers" list={BGStatsPlayerList} edit={BGStatsPlayerEdit} />
        <Resource name="bgstatslocations" list={BGStatsLocationList} edit={BGStatsLocationEdit} />
        <Resource name="bgstatsgames" list={BGStatsGamesList} />
        <Resource name="bgstatsplays" list={BGStatsPlayList} edit={BGStatsPlayEdit} />
        <Resource name="bgstats" />
        <Resource name="prices" list={ListGuesser} />
        <Resource name="cachedprices" list={CachedpriceList} />
      </Admin>
    </Router>
  );
}

export default App;
