import React from 'react';
import { CircleFlag } from 'react-circle-flags'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {
  SelectInput,
  NumberInput,
  useGetMany,
  TextInput
} from 'react-admin';

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

export const CountryBet = props => {
  const { home_id, draw_id, away_id } = props;
  const { data, isLoading, error } = useGetMany('teams', { ids: [home_id, draw_id, away_id] });

  if (isLoading) return <span />;
  if (error || data.length < 3) return <p>{error}</p>;

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={6}>
        <CountryItem subheader="home" reversed={true} {...data.filter(d => d.id === home_id)[0]} />
      </Grid>
      <Grid item xs={6}>
        <CountryItem source="country_code" subheader="away" {...data.filter(d => d.id === away_id)[0]} />
      </Grid>
      <Grid item xs={12} md={6}>
        <SelectInput source="team_id" fullWidth choices={data} />
      </Grid>
      <Grid item xs={12} md={6}>
        <NumberInput source="stake" fullWidth/>
      </Grid>
      <TextInput source="user_id" sx={{ display: "none"}} />
    </Grid>
  );
}

export default CountryItem;
