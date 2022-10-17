import React, { useEffect, forwardRef } from 'react';
import { UserMenu, AppBar, Layout } from 'react-admin';
import MenuItem from '@mui/material/MenuItem';
import ExitIcon from '@mui/icons-material/PowerSettingsNew';
import { signOut } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import Badge from '@mui/material/Badge';
import DiamondIcon from '@mui/icons-material/Diamond';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { useDispatch, useSelector } from 'react-redux';
import { url } from './App';
import { setSession, setRubies } from './reducers/user';

const useSession = () => {
  const session = useSessionContext();

  if (session.loading) {
    return null;
  }

  let { doesSessionExist } = session;

  if (!doesSessionExist) {
    return null;
  }

  return session;
}

const useRubies = session => {
  const dispatch = useDispatch();
  const rubies = useSelector(state => state.user.rubies);

  useEffect(() => {
    if (session !== undefined && session !== null) {
      const { userId: key } = session;

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
  async function onLogout() {
    await signOut();
    window.location.href = "/#/";
  }

  return (
    <MenuItem onClick={onLogout} ref={ref}>
      <ExitIcon /> Logout
    </MenuItem>
  )
});

const MyUserMenu = () => <UserMenu><MyLogoutButton /></UserMenu>;

const MyAppBar = () => {
  const session = useSession();
  const rubies = useRubies(session);

  return (
    <AppBar userMenu={<MyUserMenu />}>
      <div style={{ color: "white", marginLeft: 'auto', padding: 12 }}>
        <Badge badgeContent={rubies}>
          <DiamondIcon />
        </Badge>
      </div>
    </AppBar>
  );
}

const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

export default MyLayout;
