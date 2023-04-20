import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, Select, MenuItem, Typography } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  useGridApiContext,
  gridPaginationModelSelector,
  gridPageSelector,
  gridPageSizeSelector,
  gridPaginationRowRangeSelector,
  gridPageCountSelector,
  gridPaginatedVisibleSortedGridRowEntriesSelector
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

function CustomToolbar() {
  const apiRef = useGridApiContext();

  const totalRows = apiRef.current.getRowsCount(); // total rows
  const pageCount = gridPageCountSelector(apiRef); // current total pages
  const page = gridPageSelector(apiRef); // current page
  const gridPageSizeSelector1 = gridPageSizeSelector(apiRef); // current pageSize
  const gridPaginationRowRangeSelector1 = gridPaginationRowRangeSelector(apiRef); // {firstRowIndex: 0, lastRowIndex: 9}

  const firstRowIndex = gridPaginationRowRangeSelector1 ? gridPaginationRowRangeSelector1.firstRowIndex + 1 : 0;
  const secondRowIndex = gridPaginationRowRangeSelector1 ? gridPaginationRowRangeSelector1.lastRowIndex + 1 : 0;

  // eslint-disable-next-line
  const gridPaginationModelSelector1 = gridPaginationModelSelector(apiRef); // {page: 0, pageSize: 25}
  // eslint-disable-next-line
  const gridPaginatedVisibleSortedGridRowEntriesSelector1 = gridPaginatedVisibleSortedGridRowEntriesSelector(apiRef); // array of all current rows and their data/state


  const nextPage = () => {
    apiRef.current.setPage(page + 1);
  }

  const backPage = () => {
    apiRef.current.setPage(page - 1);
  }

  const firstPage = () => {
    apiRef.current.setPage(0);
  }

  const lastPage = () => {
    apiRef.current.setPage(pageCount);
  }

  const handleSelectDropdown = (e) => {
    apiRef.current.setPageSize(e.target.value);
  }

  return (
    <GridToolbarContainer sx={{ display: "flex", gap: "8px" }}>
      <Typography variant="body1" color="initial">Rows per page: {firstRowIndex} - {secondRowIndex} to {totalRows}</Typography>
      <FormControl size="small">
        <Select
          value={gridPageSizeSelector1}
          onChange={handleSelectDropdown}
          displayEmpty
        >
          <MenuItem value={10} aria-label="select 10">10</MenuItem>
          <MenuItem value={25} aria-label="select 50">25</MenuItem>
          <MenuItem value={50} aria-label="select 100">50</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={firstPage}>firstPage</Button>
      <Button onClick={backPage}>backPage</Button>
      <Button onClick={nextPage}>nextPage</Button>
      <Button onClick={lastPage}>lastPage</Button>
    </GridToolbarContainer>
  );
}

export default function UseGridApiContext() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        {...data}
        pageSizeOptions={[10, 25, 50]}
        pagniation
        slots={{
          toolbar: CustomToolbar,
        }}
        initialState={{
          ...data.initialState,
          pagination: {
            paginationModel: { pageSize: 25, page: 0 },
          },
        }}
      />
    </Box>
  );
}