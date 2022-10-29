import React, { useState, useCallback } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { subtractRubies } from '../reducers/user';
import DiamondIcon from '@mui/icons-material/Diamond';
import { useNotify } from "react-admin";
export const url = 'https://5leb08.deta.dev';

const placeBet = (id, event_id, stake) => fetch(`${url}/bets`, {
  method: "POST",
  body: JSON.stringify({
    id,
    event_id,
    stake
  })
}).then(res => res.json())

const Component = props => {
  const { id, event_id, stake } = props;
  const dispatch = useDispatch();
  const notify = useNotify();
  const email = useSelector(state => state.user.email);
  const rubies = useSelector(state => state.user.rubies);
  const [isSending, setIsSending] = useState(false);

  const sendRequest = useCallback(async() => {
    setIsSending(true)

    placeBet(id, event_id, stake).then(rs => {
      dispatch(subtractRubies({email, rubies, stake})).then(() => {
        notify('Bet placed successfully.', { type: 'success' })
      });
      setTimeout(() => {
        setIsSending(false);
      }, 1000);
    });
  }, [id, event_id, stake, email, rubies, notify, dispatch])

  return (
    <LoadingButton startIcon={<DiamondIcon />} loading={isSending} onClick={sendRequest} {...props}>{stake}</LoadingButton>
  )
}

export default Component;
