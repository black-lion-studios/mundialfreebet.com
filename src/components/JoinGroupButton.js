import React, { useState, useCallback } from 'react';
import AdornedButton from './AdornedButton';
import { joinGroup } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux'

const Component = props => {
  const dispatch = useDispatch();
  const { group_key } = props;
  const { key } = useSelector(state => state.user);
  const [isSending, setIsSending] = useState(false);

  const sendRequest = useCallback(async() => {
    if (isSending) {
      return
    }

    setIsSending(true);
    dispatch(joinGroup({ user_key: key, group_key }));
    setTimeout(() => {
      setIsSending(false);
    }, 2000);
  }, [dispatch, isSending, key, group_key]);

  if (key === undefined) {
    return (<div></div>);
  }

  return (
    <AdornedButton onClick={sendRequest} loading={isSending} message="Joined group!" variant="contained" color="info">
      Join
    </AdornedButton>
  )
}

export default Component;
