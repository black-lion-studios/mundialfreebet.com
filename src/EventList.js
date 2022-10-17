import * as React from 'react';
import { Datagrid, DatagridBody, RecordContextProvider } from 'react-admin';
import { TableCell, TableRow } from '@mui/material';

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

export default MyDatagrid;
