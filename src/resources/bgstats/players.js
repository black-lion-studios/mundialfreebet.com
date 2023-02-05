import {
  BooleanField,
  Datagrid,
  List,
  ReferenceField,
  DateField,
  TextField,
  BooleanInput,
  DateInput,
  Edit,
  ReferenceInput,
  SimpleForm,
  TextInput,
  AutocompleteInput,
  useRecordContext
} from 'react-admin';
import { filterToQuery } from '../util/common';
import Button from '@mui/material/Button';
import { createPlayer, updateStatsPlayer } from '../api';

const CreatePlayerButton = () => {
  const record = useRecordContext();

  const handleClick = async () => {
    createPlayer(record.name).then(rs => rs.json()).then(rs => {
      updateStatsPlayer(record.id, rs.id);
    });
  }

  return <Button variant="contained" disabled={record.player_id !== null} onClick={handleClick}>Create</Button>;
}

export const BGStatsPlayerList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="uuid" />
      <ReferenceField source="player_id" reference="players">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
      <BooleanField source="is_anonymous" />
      <DateField source="modification_date" />
      <TextField source="bgg_username" />
      <CreatePlayerButton />
    </Datagrid>
  </List>
);

export const BGStatsPlayerEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="uuid" />
      <TextInput source="name" />
      <BooleanInput source="is_anonymous" />
      <DateInput source="modification_date" />
      <DateInput source="bgg_username" />
      <ReferenceInput source="player_id" reference="players">
        <AutocompleteInput source="name" optionValue="id" filterToQuery={filterToQuery} />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
