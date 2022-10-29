import * as React from "react";
import {
  Datagrid,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  Create,
} from 'react-admin';

export const TeamList = () => (
  <List perPage={50}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="country_code" />
    </Datagrid>
  </List>
);

export const TeamEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="country_code" />
    </SimpleForm>
  </Edit>
);

export const TeamCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="country_code" />
    </SimpleForm>
  </Create>
);
