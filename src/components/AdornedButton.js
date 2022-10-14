import React from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

const SpinnerAdornment = styled(CircularProgress)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const AdornedButton = (props) => {
  const {
    children,
    loading,
    message,
    show,
    ...rest
  } = props
  return (
    <div>
      <Button {...rest}>
        {children}
        {loading && <SpinnerAdornment size={20} />}
      </Button>
      <Snackbar open={loading || show} autoHideDuration={6000}>
        <MuiAlert severity="success">{message}</MuiAlert>
      </Snackbar>
    </div>
  )
}

export default AdornedButton;
