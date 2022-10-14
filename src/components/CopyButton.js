import React, { useState, useCallback } from 'react';
import AdornedButton from './AdornedButton';

const Component = () => {
  const [isSending, setIsSending] = useState(false);

  const sendRequest = useCallback(async() => {
    if (isSending) {
      return
    }

    setIsSending(true);
    navigator.clipboard.writeText(window.location)
    setTimeout(() => {
      setIsSending(false);
    }, 2000);
  }, [isSending]);

  return (
    <AdornedButton onClick={sendRequest} loading={isSending} message="URL copied to clipboard!" variant="contained" color="info">
      Share
    </AdornedButton>
  )
}

export default Component;
