import {
  BooleanField,
  Datagrid,
  List,
  ReferenceField,
  DateField,
  TextField,
} from 'react-admin';

export const BGStatsGamesList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="uuid" />
      <ReferenceField source="boardgame_id" reference="boardgames" >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
      <DateField source="modification_date" />
      <BooleanField source="cooperative" />
      <BooleanField source="highest_wins" />
      <BooleanField source="no_points" />
      <BooleanField source="uses_teams" />
    </Datagrid>
  </List>
);
