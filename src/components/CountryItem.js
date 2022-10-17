import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { CircleFlag } from 'react-circle-flags'
import BalanceIcon from '@mui/icons-material/Balance';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PlaceBetButton from './PlaceBetButton';

const CountryItem = props => {
  const { id, country_code, name, subheader, parent_id } = props;

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
            minWidth:120
          }
        }}
        title={<Typography>{name}</Typography>}
        subheader={subheader}
        action={
          <Stack direction="row" spacing={1} sx={{ padding: 1 }}>
            <PlaceBetButton stake={1} id={id} event_id={parent_id} />
            <PlaceBetButton stake={2} id={id} event_id={parent_id} />
            <PlaceBetButton stake={5} id={id} event_id={parent_id} />
          </Stack>
        }
      />
    </Card>
  );
}

export default CountryItem;
