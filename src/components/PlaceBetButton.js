import React, { useState, useCallback } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { subtractRubies } from '../reducers/user';
import { url } from '../App';

const placeBet = (id, event_id, stake) => fetch(`${url}/bets`, {
  method: "POST",
  body: JSON.stringify({
    id,
    event_id,
    stake
  })
}).then(res => res.json())

const Component = props => {
  const { id, event_id, price, comment } = props;
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);
  const rubies = useSelector(state => state.user.rubies);
  const stake = useSelector(state => state.user.stake);
  const [isSending, setIsSending] = useState(false);

  const sendRequest = useCallback(async() => {
    setIsSending(true)

    placeBet(id, event_id, stake).then(rs => {
      dispatch(subtractRubies({key: userId, rubies, stake}));
      setTimeout(() => {
        setIsSending(false);
      }, 1000);
    });
  }, [id, event_id, stake, userId, rubies, dispatch])

  return (
    <LoadingButton loading={isSending} onClick={sendRequest} {...props}>{comment} {price}</LoadingButton>
  )
}

export default Component;
