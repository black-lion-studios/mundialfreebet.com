import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid } from "@mui/material";
import {
  Title,
  useList,
  ListContextProvider,
  Datagrid,
  TextField,
  Pagination,
  useCreate,
  useRecordContext,
} from 'react-admin';

const LikeButton = () => {
  const record = useRecordContext();

  const data = {
    name: record.name,
    id: record.uuid,
    player_id: null,
  }

  const [create, { isLoading, error }] = useCreate('bgstatsplayers', { data });

  const handleClick = () => {
    create()
  }

  if (error) { return <p>ERROR</p>; }
  return <button disabled={isLoading} onClick={handleClick}>Create</button>;
};

const Upload = () => {
  const [files, setFiles] = useState("");

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      console.log("e.target.result", e.target.result);
      setFiles(JSON.parse(e.target.result));
    };
  };

  console.log(files.players)

  const listContext = useList({ data: files.players, perPage: 20 });

  return (
    <>
      <h1>Upload Json file - Example</h1>
      <input type="file" onChange={handleChange} />
      <br />
      <ListContextProvider value={listContext}>
        <Datagrid>
          <TextField source="id" />
          <TextField source="uuid" />
          <TextField source="name" />
          <LikeButton />
        </Datagrid>
        <Pagination />
      </ListContextProvider>
    </>
  );
}

const Dashboard = () => (
  <Card>
    <Title title="Home" />
    <CardContent>
      <Grid container>
        <Grid md={12} xs={12}>
          <Upload />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default Dashboard;
