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
import { setSession, setRubies, setStake } from './reducers/user';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

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
  const dispatch = useDispatch();
  const stake = useSelector(state => state.user.stake);

  return (
    <AppBar color="primary" userMenu={<MyUserMenu />}>
      <div style={{ marginLeft: 'auto', padding: 12 }}>
        <ButtonGroup variant="contained" color="secondary" style={{ marginRight: 12 }}>
          <Button color={ stake === 1 ? "error" : "secondary"} startIcon={stake === 1 ? <DiamondIcon /> : null} onClick={() => dispatch(setStake(1))}>1</Button>
          <Button color={ stake === 2 ? "error" : "secondary"} startIcon={stake === 2 ? <DiamondIcon /> : null} onClick={() => dispatch(setStake(2))}>2</Button>
          <Button color={ stake === 5 ? "error" : "secondary"} startIcon={stake === 5 ? <DiamondIcon /> : null} onClick={() => dispatch(setStake(5))}>5</Button>
        </ButtonGroup>
        <Badge badgeContent={rubies} max={9999} >
          <DiamondIcon />
        </Badge>
      </div>
    </AppBar>
  );
}

const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

export default MyLayout;
