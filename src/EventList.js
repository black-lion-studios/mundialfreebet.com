import * as React from 'react';
import { TableCell, TableRow } from '@mui/material';
import {
  Datagrid,
  DatagridBody,
  RecordContextProvider,
  useGetList,
  useList,
  ListContextProvider,
} from 'react-admin';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

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
        <CardHeader title={`Group ${String.fromCharCode(group+65)}`} />
        <MyDatagrid rowClick="edit" header={() => {}}>
          {children}
        </MyDatagrid>
      </Card>
    </ListContextProvider>
  )
}

const MyCustomList = props => {
  const { children } = props;
  // pagination: { page: 1, perPage: 20 },
  const { data, isLoading } = useGetList('events', {
    sort: { field: 'group', order: 'DESC' },
  });
  const tofilter = data || [];

  const fromfilter = tofilter.reduce((acc, cur) => {
    const i = cur.group.charCodeAt(0)-65;
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

export default MyCustomList;
