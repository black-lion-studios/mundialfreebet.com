import React, { useState, useCallback } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { subtractRubies } from '../reducers/user';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import DiamondIcon from '@mui/icons-material/Diamond';
import { url } from '../App';

const placeBet = (id, event_id, stake) => fetch(`${url}/bets`, {
  method: "POST",
  body: JSON.stringify({
    id,
    event_id,
    stake
  })
}).then(res => res.json())

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Component = props => {
  const { id, event_id, stake } = props;
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);
  const rubies = useSelector(state => state.user.rubies);
  const [isSending, setIsSending] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const sendRequest = useCallback(async() => {
    setIsSending(true)

    placeBet(id, event_id, stake).then(rs => {
      dispatch(subtractRubies({key: userId, rubies, stake}));
      setTimeout(() => {
        setIsSending(false);
        setOpen(true);
      }, 1000);
    });
  }, [id, event_id, stake, userId, rubies, dispatch])

  return (
    <React.Fragment>
      <LoadingButton startIcon={<DiamondIcon />} variant="contained" color="primary" loading={isSending} onClick={sendRequest} {...props}>{stake}</LoadingButton>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Success!
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}

export default Component;
