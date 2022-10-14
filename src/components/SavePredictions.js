import React, { useState, useCallback } from 'react';
import AdornedButton from './AdornedButton';
import { savePredictions } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux'

const Component = props => {
  const dispatch = useDispatch()
  const { key, predictions } = useSelector(state => state.user)
  const [isSending, setIsSending] = useState(false)

  const sendRequest = useCallback(async() => {
    if (isSending) {
      return
    }

    setIsSending(true)
    dispatch(savePredictions({ key, items: predictions }))
    setTimeout(() => {
      setIsSending(false)
    }, 2000);
  }, [dispatch, isSending, key, predictions])

  if (key === undefined) {
    return (<div></div>);
  }

  return (
    <AdornedButton onClick={sendRequest} loading={isSending} message="Predictions saved successfully!" variant="contained" color="info">
      Save Predictions
    </AdornedButton>
  )
}

export default Component;
