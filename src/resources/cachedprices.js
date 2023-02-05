import {
  Datagrid,
  ImageField,
  List,
  NumberField,
  ReferenceField,
  TextField,
  UrlField,
  useRecordContext,
} from 'react-admin';
import { createIgnore } from './api';
import Button from '@mui/material/Button';

const IgnoreButton = () => {
  const record = useRecordContext();

  const handleClick = async () => {
    createIgnore(record.name).then(rs => rs.json()).then(rs => {
      console.log(rs);
    });
  }

  return <Button variant="contained" onClick={handleClick}>Ignore</Button>;
}

export const CachedpriceList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="store_id" reference="stores">
        <TextField source="name" />
      </ReferenceField>
      <ImageField source="store_thumb" />
      <TextField source="name" />
      <NumberField source="price" />
      <NumberField source="stock" />
      <UrlField source="url" />
      <IgnoreButton />
    </Datagrid>
  </List>
);
