import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'mui-image'
import { Card, CardContent, Grid, Typography } from '@mui/material';
import {
  FilterForm,
  FilterContext,
  ListBase,
  Pagination,
  Title,
  useGetResourceLabel,
  TopToolbar,
  FilterButton,
  TextInput,
  ReferenceInput,
  SelectInput,
  useListContext,
  TextField,
  Show,
  SimpleShowLayout,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
} from 'react-admin';

const LoadedGridList = props => {
  const { component: Element, setPrices } = props;
  const { data } = useListContext();
  if (!data) return null;

  return (
    <Grid container>
      {data.map(record => <Element record={record} setPrices={setPrices} />)}
    </Grid>
  );
};

const Boardgame = props => {
  const { setPrices, record } = props;

  return (
    <Grid xs={12} md={3} xl={3} component={Link} key={record.id} onClick={() => setPrices(record.prices)}>
      <Card variant="outlined" sx={{ margin: 1, height: 400 }}>
        <CardContent>
          <Image src={record.square200} fit="contain" height={300} />
          <TextField source="name" record={record} />
          <Typography>{record.prices.length} available</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

const Aside = props => {
  const { data } = props;
  return <>{data.map(d => <Typography>{d.name}</Typography>)}</>;
}

export const BoardgameList = () => {
  const getResourceLabel = useGetResourceLabel();
  const [prices, setPrices] = useState([]);
  const perPage = [12, 24, 48];

  console.log(prices);

  return (
    <ListBase
      perPage={24}
      sort={{ field: 'rank,id', order: 'ASC' }}
      queryOptions={{ meta: {
        "select": "id,bgg->item->yearpublished,bgg->item->images->square200,prices!inner(id,url,cr_date,price,stock)",
        "prices.order": "id",
        "bgg": "not.is.null"
      }}}
      aside={<Aside />}
    >
      <Title defaultTitle={getResourceLabel('prices')} />
      <FilterContext.Provider value={filters}>
        <TopToolbar>
          <Grid container alignItems="center">
            <Grid xs={12} md={6}>
              <Grid container alignItems="center">
                <Grid>
                  <FilterForm />
                </Grid>
                <Grid>
                  <FilterButton />
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} md={6}>
              <Pagination rowsPerPageOptions={perPage} />
            </Grid>
          </Grid>
        </TopToolbar>
      </FilterContext.Provider>
      <Grid container>
        {/* <Grid xs={4}>
          <Aside data={prices} />
        </Grid> */}
        <Grid xs={12}>
          <LoadedGridList component={Boardgame} setPrices={setPrices} />
        </Grid>
      </Grid>
      <Pagination rowsPerPageOptions={perPage} />
    </ListBase>
  );
};

export const BoardgameShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceManyField reference="prices" target="boardgame_id" label="" pagination={<Pagination />}>
        <Datagrid>
          <TextField source="name" />
          <ReferenceField reference="stores" source="store_id">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="price" />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);

export const filters = [
  <TextInput source="prices.name@ilike" label="Search" />,
  <ReferenceInput source="prices.store_id" reference="stores" label="Stores" sort={{ field: "name", order: "ASC" }}>
    <SelectInput optionText="name" optionValue="id" label="Stores" />
  </ReferenceInput>,
  <SelectInput source="prices.stock" label="Stock" choices={[
    { id: 0, name: "In Stock" },
    { id: 1, name: "Preorder" },
    { id: 2, name: "Out of Stock" },
  ]} />
];
