import React, { useState, useCallback } from 'react';
import AdornedButton from './AdornedButton';
// import { useNavigate } from 'react-router-dom';
import { createGroup } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux'

const Component = props => {
  const dispatch = useDispatch()
  // const navigate = useNavigate();
  const { key } = useSelector(state => state.user)
  const [isSending, setIsSending] = useState(false)

  const sendRequest = useCallback(async() => {
    if (isSending) {
      return
    }

    setIsSending(true)
    dispatch(createGroup(key))
    // navigate(`/group/${key}`)
    setIsSending(false)
  }, [dispatch, isSending, key])

  return (
    <AdornedButton onClick={sendRequest} loading={isSending} variant="contained" color="info">
      Create Group
    </AdornedButton>
  )
}

export default Component;
