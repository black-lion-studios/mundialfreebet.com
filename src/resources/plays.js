import React from 'react';
import LocationInput from './util/LocationInput';
import { filterToQuery } from './util/common';
import {
  ArrayInput,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  SimpleFormIterator,
  Create,
  AutocompleteInput,
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  List,
  SingleFieldList,
  TextField,
  DateInput,
  Edit,
  ReferenceField,
  TextInput,
  BooleanInput
} from 'react-admin';

const createTransform = record => {
  return {
    ...record,
    date: new Date(record.date),
    stats: record.stats.map(d => ({...d, boardgame_id: record.boardgame_id})),
    play_data: record.play_data === "" ? null : record.play_data,
  }
}

const PlayForm = () => {
  return (
    <SimpleForm>
      <ReferenceInput source="boardgame_id" reference="boardgames" sort={{ "field": "name", "order": "ASC" }}>
        <AutocompleteInput source="name" optionText="name" optionValue="id" filterToQuery={filterToQuery} />
      </ReferenceInput>
      <LocationInput />
      <DateInput source="date" />
      <TextInput source="play_data" />
      <ArrayInput source="stats">
        <SimpleFormIterator inline>
          <TextField source="player.id" />
          <ReferenceInput source="player_id" reference="players">
            <AutocompleteInput source="name" optionValue="id" filterToQuery={filterToQuery} />
          </ReferenceInput>
          <NumberInput source="data.score" />
          <BooleanInput source="data.won" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  )
}

export const PlayEdit = () => (
  <Edit transform={createTransform}>
    <PlayForm />
  </Edit>
);

export const PlayCreate = () => (
  <Create transform={createTransform}>
    <PlayForm />
  </Create>
);

export const PlayList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="boardgame_id" reference="boardgames">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="date" />
      <TextField source="location.name" />
      <ArrayField source="stats">
        <SingleFieldList>
          <ChipField source="player.name" />
        </SingleFieldList>
      </ArrayField>
      <TextField source="play_data" />
    </Datagrid>
  </List>
);
