import React from 'react';
import {
  ReferenceInput,
  AutocompleteInput,
  useCreate,
  useCreateSuggestionContext,
} from 'react-admin';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField as Text,
} from '@mui/material';
import { filterToQuery } from './common';

const CreateLocation = () => {
  const { filter, onCancel, onCreate } = useCreateSuggestionContext();
  const [value, setValue] = React.useState(filter || '');
  const [create] = useCreate();

  const handleSubmit = event => {
      event.preventDefault();
      create("locations", {
        data: {
          name: value,
        },
      },
      {
        onSuccess: (data) => {
          setValue('');
          onCreate(data);
        },
      }
    );
  };

  return (
    <Dialog open onClose={onCancel}>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Text label="New location name" value={value} onChange={event => setValue(event.target.value)} autoFocus />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const LocationInput = props => (
  <ReferenceInput source="location_id" reference="locations" sort={{ "field": "name", "order": "ASC" }}>
    <AutocompleteInput source="name" optionText="name" optionValue="id" filterToQuery={filterToQuery} create={<CreateLocation />} />
  </ReferenceInput>
)

export default LocationInput;
