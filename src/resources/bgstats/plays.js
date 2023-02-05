import {
  ArrayField,
  BooleanField,
  BooleanInput,
  ChipField,
  Datagrid,
  DateField,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  SingleFieldList,
  TextField,
  SimpleForm,
  TextInput,
  DateInput,
  ReferenceInput,
  AutocompleteInput,
  ArrayInput,
  SimpleFormIterator,
  Edit,
  useRecordContext,
  EditButton
} from 'react-admin';
import Button from '@mui/material/Button';
import { createPlay, updateStatsPlay } from '../api';
import { filterToQuery } from '../util/common';

const createTransform = record => {
  return {
    ...record,
    play_id: record.play_id === "" ? null : record.play_id,
  }
}

const CreateLocationButton = () => {
  const record = useRecordContext();

  const handleClick = () => {
    createPlay(record).then(rs => rs.json()).then(rs => {
      updateStatsPlay(record.id, rs.id).then(rs => rs.json()).then(rs => {
        console.log(rs);
      })
    });
  }

  return <Button variant="contained" disabled={record.play_id !== null} onClick={handleClick}>Create</Button>;
}

export const BGStatsPlayList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="uuid" />
      <DateField source="play_date" />
      <ReferenceField source="game_id" reference="bgstatsgames" >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="play_id" reference="plays" >
        <TextField source="id" />
      </ReferenceField>
      <TextField source="location.name" />
      <BooleanField source="uses_teams" />
      <BooleanField source="ignored" />
      <BooleanField source="manual_winner" />
      <NumberField source="rounds" />
      <ArrayField source="stats">
        <SingleFieldList>
          <ChipField source="player.name" />
        </SingleFieldList>
      </ArrayField>
      <DateField source="modification_date" />
      <CreateLocationButton />
      <EditButton />
    </Datagrid>
  </List>
);

const PlayForm = () => {
  return (
    <SimpleForm>
      <TextInput source="uuid" />
      <DateInput source="play_date" />
      <DateInput source="modification_date" />
      <ReferenceInput source="game_id" reference="bgstatsgames">
        <AutocompleteInput source="name" optionText="name" optionValue="id" filterToQuery={filterToQuery} />
      </ReferenceInput>
      <NumberInput source="play_id"  />
      <ReferenceInput source="location_id" reference="bgstatslocations">
        <AutocompleteInput source="id" optionText="name" optionValue="id" />
      </ReferenceInput>
      <BooleanInput source="uses_teams" />
      <BooleanInput source="ignored" />
      <BooleanInput source="manual_winner" />
      <NumberInput source="rounds" />
      <ArrayInput source="stats">
        <SimpleFormIterator inline>
          <TextField source="player.id" />
          <TextField source="player.name" />
          <BooleanInput source="winner" />
          <BooleanInput source="new_player" />
          <BooleanInput source="start_player" />
          <NumberInput source="score" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  )
}

export const BGStatsPlayEdit= () => (
  <Edit transform={createTransform}>
    <PlayForm />
  </Edit>
);
