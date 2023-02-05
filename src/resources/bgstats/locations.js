import {
  Datagrid,
  List,
  ReferenceField,
  DateField,
  TextField,
  DateInput,
  Edit,
  SimpleForm,
  TextInput,
  useRecordContext,
  EditButton,
} from 'react-admin';
import Button from '@mui/material/Button';
import LocationInput from '../util/LocationInput';
import { createLocation, updateStatsLocation } from '../api';

const CreateLocationButton = () => {
  const record = useRecordContext();

  const handleClick = async () => {
    createLocation(record.name).then(rs => rs.json()).then(rs => {
      updateStatsLocation(record.id, rs.id);
    });
  }

  return <Button variant="contained" disabled={record.location_id !== null} onClick={handleClick}>Create</Button>;
}

export const BGStatsLocationList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="uuid" />
      <ReferenceField source="location_id" reference="locations">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
      <DateField source="modification_date" />
      <CreateLocationButton />
      <EditButton />
    </Datagrid>
  </List>
);

export const BGStatsLocationEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="uuid" />
      <TextInput source="name" />
      <DateInput source="modification_date" />
      <LocationInput />
    </SimpleForm>
  </Edit>
);
