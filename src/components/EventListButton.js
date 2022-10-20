import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PlaceBetButton from './PlaceBetButton';
import { Box } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Popup = React.forwardRef((props, ref) => {
  return <Modal ref={ref} {...props} />;
});

const Component = props => {
  const { id, event_id, price, comment } = props;
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="secondary" onClick={() => setOpen(true)} {...props}>{comment} {price}</Button>
      <Popup open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid  spacing={2} container>
            <Grid item xs={12}>
              <Typography>Please select the amount of rubies you would like to stake.</Typography>
            </Grid>
            <Grid item xs={12}>
              <PlaceBetButton variant="contained" color="primary" id={id} event_id={event_id} price={price} comment={comment} stake={1} />
            </Grid>
            <Grid item xs={12}>
              <PlaceBetButton variant="contained" color="primary" id={id} event_id={event_id} price={price} comment={comment} stake={2} />
            </Grid>
            <Grid item xs={12}>
              <PlaceBetButton variant="contained" color="primary" id={id} event_id={event_id} price={price} comment={comment} stake={5} />
            </Grid>
          </Grid>
        </Box>
      </Popup>
    </React.Fragment>
  )
}

export default Component;
