import React from 'react';
import { CircleFlag } from 'react-circle-flags'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const CountryItem = props => {
  const { country_code, name, reversed } = props;

  if (reversed) {
    return (
      <Stack direction="column" spacing={2} style={{ paddingTop: 20 }} alignItems="center" justifyContent="center">
        <CircleFlag countryCode={country_code} style={{ width: '5em', height: '5em' }} />
        <Typography>{name}</Typography>
      </Stack>
    )
  } else {
    return (
      <Stack direction="column" spacing={2} style={{ paddingTop: 20 }} alignItems="center" justifyContent="center">
        <CircleFlag countryCode={country_code} style={{ width: '5em', height: '5em' }} />
        <Typography>{name}</Typography>
      </Stack>
    )
  }
}

export default CountryItem;
