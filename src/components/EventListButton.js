import React from 'react';
import Button from '@mui/material/Button';
import { useRedirect } from 'react-admin';
import { useSelector } from 'react-redux';

const Component = props => {
  const { id: team_id, event_id, price, comment } = props;
  const id = useSelector(state => state.user.id);
  const redirect = useRedirect();
  const payload = JSON.stringify({
    event_id,
    team_id,
    user_id: id
  });

  return (
    <Button variant="contained" color="secondary" onClick={() => redirect(`/bets/create?source=${payload}`)} {...props}>{comment} {price}</Button>
  )
}

export default Component;
