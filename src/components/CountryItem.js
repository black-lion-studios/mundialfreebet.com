import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { CircleFlag } from 'react-circle-flags'
import BalanceIcon from '@mui/icons-material/Balance';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PlaceBetButton from './PlaceBetButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const CountryItem = props => {
  const { id, country_code, name, subheader, parent_record } = props;
  const { id: parent_id } = parent_record;

  let price;
  if (subheader === "home") {
    price = parent_record.home_price;
  } else if (subheader === "away") {
    price = parent_record.away_price;
  } else {
    price = parent_record.draw_price;
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            { name === "Draw" ? <BalanceIcon /> : <CircleFlag countryCode={country_code} style={{ width: '2em', height: '2em' }} />}
          </Avatar>
        }
        sx={{
          display: "flex",
          overflow: "hidden",
          "& .MuiCardHeader-content": {
            overflow: "hidden",
          }
        }}
        title={<Typography>{name}</Typography>}
        subheader={subheader}
        action={
          <Stack direction="row" spacing={1} sx={{ padding: 1 }}>
                          <Button color="primary" variant="contained">{price.toFixed(2)}</Button>
            <ButtonGroup variant="contained">

              <PlaceBetButton stake={1} id={id} event_id={parent_id} />
              <PlaceBetButton stake={2} id={id} event_id={parent_id} />
              <PlaceBetButton stake={5} id={id} event_id={parent_id} />
            </ButtonGroup>
          </Stack>
        }
      />
      {/* <CardActions>
        <Stack direction="column" spacing={1} sx={{ padding: 1 }}>
          <PlaceBetButton stake={1} id={id} event_id={parent_id} />
          <PlaceBetButton stake={2} id={id} event_id={parent_id} />
          <PlaceBetButton stake={5} id={id} event_id={parent_id} />
        </Stack>
      </CardActions> */}
    </Card>
  );
}

export default CountryItem;
