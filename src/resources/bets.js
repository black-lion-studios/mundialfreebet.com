import * as React from "react";
import { CountryBet } from "../components/CountryItem";
import {
  Datagrid,
  List,
  TextField,
  SimpleForm,
  Create,
  ReferenceField,
  useGetOne,
  useCreateController,
} from 'react-admin';

export const BetsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ReferenceField source="team_id" reference="teams">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="status" />
      <TextField source="stake" />
    </Datagrid>
  </List>
);

export const BetsCreate = () => {
  const { record } = useCreateController({ resource: "bets" });
  const { event_id } = record;
  const { data, isLoading, error } = useGetOne('events', { id: event_id });

  if (isLoading) return <span />;
  if (error) return <p>{error}</p>

  return (
    <Create redirect="list">
      <SimpleForm>
        <CountryBet {...data} />
      </SimpleForm>
    </Create>
  )
}
