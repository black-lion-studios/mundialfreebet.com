import { BooleanField, Datagrid, DateField, List, NumberField, ReferenceField, TextField, UrlField } from 'react-admin';

export const PriceList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="boardgame_id" reference="boardgames" />
      <DateField source="date" />
      <ReferenceField source="store_id" reference="stores" />
      <TextField source="store_thumb" />
      <TextField source="name" />
      <NumberField source="price" />
      <NumberField source="stock" />
      <UrlField source="url" />
      <BooleanField source="mapped" />
      <BooleanField source="ignored" />
      <DateField source="batch" />
    </Datagrid>
  </List>
);
