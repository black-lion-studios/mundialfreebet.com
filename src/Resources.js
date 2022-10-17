import * as React from "react";
import {
  Datagrid,
  List,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  ReferenceField,
  SelectInput,
  Create,
  FunctionField,
  useRecordContext
} from 'react-admin';
import MyDatagrid from "./EventList";
import CountryItem from "./components/CountryItem";

const CountryField = props => {
  const { subheader, parent_id } = props;
  return <FunctionField render={record => <CountryItem {...record} parent_id={parent_id} subheader={subheader} />} />
}

const ReferenceFieldCarry = props => {
  const { children, ...rest } = props;
  const record = useRecordContext();
  const { id } = record;
  return <ReferenceField {...rest}>{React.cloneElement(children, { parent_id: id })}</ReferenceField>;
}

export const AdminEventList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="home_id" reference="teams">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="draw_id" reference="teams">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="away_id" reference="teams">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);

export const EventList = () => (
  <List exporter={false}>
    <MyDatagrid rowClick="edit" header={() => {}}>
      <ReferenceFieldCarry source="home_id" reference="teams" link={false}>
        <CountryField source="country_code" subheader="home" />
      </ReferenceFieldCarry>
      <ReferenceFieldCarry source="draw_id" reference="teams" link={false}>
        <CountryField source="country_code" />
      </ReferenceFieldCarry>
      <ReferenceFieldCarry source="away_id" reference="teams" link={false}>
        <CountryField source="country_code" subheader="away" />
      </ReferenceFieldCarry>
    </MyDatagrid>
  </List>
);

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="home_id" reference="teams">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="draw_id" reference="teams">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="away_id" reference="teams">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const EventCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <ReferenceInput source="home_id" reference="teams">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="draw_id" reference="teams">
        <SelectInput optionText="name" defaultValue="sxus1qjs3f8t" />
      </ReferenceInput>
      <ReferenceInput source="away_id" reference="teams">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const TeamList = () => (
  <List>
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
