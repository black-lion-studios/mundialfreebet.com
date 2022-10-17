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
  useRecordContext,
  NumberField,
  NumberInput,
  DateField,
  DateTimeInput,
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
      <DateField source="start_date" showTime={true} />
      <TextField source="group" />
      <ReferenceField source="home_id" reference="teams">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="home_price" />
      <ReferenceField source="draw_id" reference="teams">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="draw_price" />
      <ReferenceField source="away_id" reference="teams">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="away_price" />
    </Datagrid>
  </List>
);

// export const EventList = () => (
//   <List exporter={false}>
//     <MyDatagrid rowClick="edit" header={() => {}}>
//       {/* <DateField source="start_date" showTime={true} options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }} /> */}
//       <ReferenceFieldCarry source="home_id" reference="teams" link={false}>
//         <CountryField source="country_code" subheader="home" />
//       </ReferenceFieldCarry>
//       <ReferenceFieldCarry source="draw_id" reference="teams" link={false}>
//         <CountryField source="country_code" />
//       </ReferenceFieldCarry>
//       <ReferenceFieldCarry source="away_id" reference="teams" link={false}>
//         <CountryField source="country_code" subheader="away" />
//       </ReferenceFieldCarry>
//     </MyDatagrid>
//   </List>
// );

export const EventList = () => (
  <MyDatagrid>
    <DateField source="start_date" showTime={true} showDate={false} options={{timeStyle: 'short'}} />
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
);

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <DateTimeInput source="start_date" />
      <TextInput source="group" />
      <ReferenceInput source="home_id" reference="teams">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="home_price" defaultValue={3.00} />
      <ReferenceInput source="draw_id" reference="teams">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="draw_price" defaultValue={3.00} />
      <ReferenceInput source="away_id" reference="teams">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="away_price" defaultValue={3.00} />
    </SimpleForm>
  </Edit>
);

export const EventCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <DateTimeInput source="start_date" />
      <TextInput source="group" />
      <ReferenceInput source="home_id" reference="teams">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="home_price" defaultValue={3.00} />
      <ReferenceInput source="draw_id" reference="teams">
        <SelectInput optionText="name" defaultValue="sxus1qjs3f8t" />
      </ReferenceInput>
      <NumberInput source="draw_price" defaultValue={3.00} />
      <ReferenceInput source="away_id" reference="teams">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="away_price" defaultValue="3.04" />
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
