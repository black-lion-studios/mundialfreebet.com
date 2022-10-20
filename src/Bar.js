import React, { useEffect, forwardRef } from 'react';
import { UserMenu, AppBar, Layout, useGetIdentity, useLogout } from 'react-admin';
import MenuItem from '@mui/material/MenuItem';
import ExitIcon from '@mui/icons-material/PowerSettingsNew';
import Badge from '@mui/material/Badge';
import DiamondIcon from '@mui/icons-material/Diamond';
import { useDispatch, useSelector } from 'react-redux';
import { url } from './App';
import { setSession, setRubies } from './reducers/user';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo }  from './logo.svg';

const useRubies = session => {
  const dispatch = useDispatch();
  const rubies = useSelector(state => state.user.rubies);

  useEffect(() => {
    if (session !== undefined && session !== null) {
      const { email: key } = session;
      dispatch(setSession(session));

      fetch(`${url}/rubies/${key}`).then(res => res.json()).then(rs => {
        const { count, exists } = rs;

        if (exists !== undefined) {
          dispatch(setRubies(count));
        } else {
          fetch(`${url}/rubies`, {
            method: "POST",
            body: JSON.stringify({
              key,
              count: 100,
              exists: true,
            })
          }).then(res => res.json())
          .then(rs => {
            dispatch(setRubies(rs.count));
          });
        }
      });
    }
  }, [session, dispatch]);

  return rubies
}

const MyLogoutButton = forwardRef((props, ref) => {
  const logout = useLogout();
  const handleClick = () => logout();
  return (
    <MenuItem onClick={handleClick} ref={ref}>
      <ExitIcon /> Logout
    </MenuItem>
  );
});

const MyUserMenu = () => <UserMenu><MyLogoutButton /></UserMenu>;

const MyLogo = () => {
  return (
    <React.Fragment>
      <Link to="/">
        <Logo fill="white" style={{ height: 50, width: 50 }} />
      </Link>
    </React.Fragment>
  );
}

const MyAppBar = () => {
  const auth = useGetIdentity();
  const { identity } = auth;
  const rubies = useRubies(identity);

  return (
    <AppBar color="primary" userMenu={<MyUserMenu />}>
      <MyLogo />
      <Stack direction="row" alignItems="center" style={{ marginLeft: 'auto', padding: 12 }}>
        <Badge badgeContent={rubies} max={9999} >
          <DiamondIcon />
        </Badge>
      </Stack>
    </AppBar>
  );
}

const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

export default MyLayout;
