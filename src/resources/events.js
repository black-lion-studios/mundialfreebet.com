import * as React from 'react';
import CountryItem from "../components/CountryItem";
import EventListButton from '../components/EventListButton';
import {
  Datagrid,
  DatagridBody,
  RecordContextProvider,
  useGetList,
  useList,
  ListContextProvider,
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
import {
  Card,
  CardHeader,
  TableCell,
  TableRow,
  ButtonGroup,
  Grid,
  Typography,
  Stack,
  useMediaQuery
} from '@mui/material';

const MyDatagridRow = ({ record, id, onToggleItem, children, selected, selectable }) => (
  <RecordContextProvider value={record}>
    <TableRow>
      {React.Children.map(children, field => (
        <TableCell key={`${id}-${field.props.source}`}>
          {field}
        </TableCell>
      ))}
    </TableRow>
  </RecordContextProvider>
);

const MyDatagridBody = props => <DatagridBody {...props} row={<MyDatagridRow />} />;
const MyDatagrid = props => <Datagrid {...props} body={<MyDatagridBody />} />;

const MyContext = props => {
  const { children, isLoading, data, group } = props;
  const contextProvider = useList({ data, isLoading });

  return (
    <ListContextProvider value={contextProvider}>
      <Card style={{ marginTop: 20 }}>
        <CardHeader title={`Group ${String.fromCharCode(group + 65)}`} />
        <MyDatagrid rowClick="edit" header={() => { }}>
          {children}
        </MyDatagrid>
      </Card>
    </ListContextProvider>
  )
}

const MyCustomList = props => {
  const { children } = props;

  const { data, isLoading } = useGetList('events', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'start_date', order: 'ASC' },
  });
  const tofilter = data || [];

  const fromfilter = tofilter.reduce((acc, cur) => {
    const i = cur.group.charCodeAt(0) - 65;
    if (acc[i] === undefined) {
      acc[i] = [];
    }
    acc[i].push(cur);
    return acc;
  }, []);

  return (
    <React.Fragment>
      {fromfilter.map((d, i) => (
        <MyContext key={i} data={d} isLoading={isLoading} group={i}>
          {children}
        </MyContext>
      ))}
    </React.Fragment>
  );
};

const CountryField = props => {
  const { subheader, parent_record } = props;
  return <FunctionField render={record => <CountryItem {...record} parent_record={parent_record} subheader={subheader} />} />
}

const LargeScreen = props => {
  const { id, home_price, home_id, draw_price, draw_id, away_price, away_id } = props;

  return (
    <Grid container alignItems="center">
      <Grid item xs={4}>
        <ReferenceFieldCarry source="home_id" reference="teams" link={false}>
          <CountryField source="country_code" subheader="home" reversed={true} />
        </ReferenceFieldCarry>
      </Grid>
      <Grid item xs={4}>
        <Stack spacing={1} direction="column" justifyContent="center" alignItems="center" style={{ height: "100%" }}>
          <DateField source="start_date" showTime={true} options={{ dateStyle: 'long', timeStyle: 'short' }} />
          <ButtonGroup variant="outlined" color="primary" fullWidth>
            <EventListButton id={home_id} event_id={id} price={home_price} comment="home" />
            <EventListButton id={draw_id} event_id={id} price={draw_price} comment="draw" />
            <EventListButton id={away_id} event_id={id} price={away_price} comment="away" />
          </ButtonGroup>
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <ReferenceFieldCarry source="away_id" reference="teams" link={false}>
          <CountryField source="country_code" subheader="away" />
        </ReferenceFieldCarry>
      </Grid>
    </Grid>
  );
}

const SmallScreen = props => {
  const { id, home_price, home_id, draw_price, draw_id, away_price, away_id } = props;

  return (
    <Grid container alignItems="center">
      <Grid item xs={12}>
        <Stack spacing={1} direction="column" justifyContent="center" alignItems="center" style={{ height: "100%" }}>
          <DateField source="start_date" showTime={true} options={{ dateStyle: 'long', timeStyle: 'short' }} />
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <ReferenceFieldCarry source="home_id" reference="teams" link={false}>
                <CountryField source="country_code" subheader="home" reversed={true} />
              </ReferenceFieldCarry>
            </Grid>
            <Grid item xs={6}>
              <ReferenceFieldCarry source="away_id" reference="teams" link={false}>
                <CountryField source="country_code" subheader="away" />
              </ReferenceFieldCarry>
            </Grid>
          </Grid>
          <ButtonGroup variant="outlined" color="primary" fullWidth>
            <EventListButton id={home_id} event_id={id} price={home_price} comment="home" />
            <EventListButton id={draw_id} event_id={id} price={draw_price} comment="draw" />
            <EventListButton id={away_id} event_id={id} price={away_price} comment="away" />
          </ButtonGroup>
        </Stack>
      </Grid>
    </Grid>
  );
}

const ReferenceFieldCarry = props => {
  const { children, ...rest } = props;
  const record = useRecordContext();
  return <ReferenceField {...rest}>{React.cloneElement(children, { parent_record: record })}</ReferenceField>;
}

const MarginField = record => {
  const { away_price, home_price, draw_price } = record;
  const margin = 1/away_price + 1/home_price + 1/draw_price;
  return <Typography>{margin}</Typography>;
}

export const EventList = () => {
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('md'));

  return (
    <MyCustomList>
      <FunctionField render={record => isSmall ? <SmallScreen {...record} /> : <LargeScreen {...record} />} />
    </MyCustomList>
  );
}

export const AdminEventList = () => (
  <List perPage={50}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <FunctionField label="Margin" render={MarginField} />
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

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <DateTimeInput source="start_date" />
      <TextInput source="group" />
      <ReferenceInput perPage={50} sort={{ field: "name", order: "ASC" }} source="home_id" reference="teams">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="home_price" defaultValue={3.00} />
      <ReferenceInput perPage={50} sort={{ field: "name", order: "ASC" }} source="draw_id" reference="teams">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="draw_price" defaultValue={3.00} />
      <ReferenceInput perPage={50} sort={{ field: "name", order: "ASC" }} source="away_id" reference="teams">
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
      <ReferenceInput perPage={50} sort={{ field: "name", order: "ASC" }} source="home_id" reference="teams">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="home_price" defaultValue={3.00} />
      <ReferenceInput perPage={50} sort={{ field: "name", order: "ASC" }} source="draw_id" reference="teams">
        <SelectInput optionText="name" defaultValue="sxus1qjs3f8t" />
      </ReferenceInput>
      <NumberInput source="draw_price" defaultValue={3.00} />
      <ReferenceInput perPage={50} sort={{ field: "name", order: "ASC" }} source="away_id" reference="teams">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="away_price" defaultValue={3.00} />
    </SimpleForm>
  </Create>
);
