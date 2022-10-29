import React, { useEffect, forwardRef } from 'react';
import { UserMenu, AppBar, Layout, useGetIdentity, useLogout, useGetList } from 'react-admin';
import MenuItem from '@mui/material/MenuItem';
import ExitIcon from '@mui/icons-material/PowerSettingsNew';
import Badge from '@mui/material/Badge';
import DiamondIcon from '@mui/icons-material/Diamond';
import { useDispatch } from 'react-redux';
import { setSession } from './reducers/user';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo }  from './logo.svg';

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

const MyRubies = props => {
  const { data, total, isLoading } = useGetList('rubies');

  if (isLoading || total !== 1) {
    return (
      <Badge badgeContent={0} max={9999} {...props}>
        <DiamondIcon />
      </Badge>
    )
  }

  const [{ count }] = data;

  return (
    <Badge badgeContent={count} max={9999} {...props}>
      <DiamondIcon />
    </Badge>
  )
}

const MyAppBar = () => {
  const dispatch = useDispatch();
  const { identity, isLoading } = useGetIdentity();

  useEffect(() => {
    if (identity !== undefined) {
      dispatch(setSession(identity));
    }
  }, [isLoading, dispatch, identity])

  return (
    <AppBar color="primary" userMenu={<MyUserMenu />}>
      <MyLogo />
      <Stack direction="row" alignItems="center" style={{ marginLeft: 'auto', padding: 12 }}>
        <MyRubies />
      </Stack>
    </AppBar>
  );
}

const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

export default MyLayout;
