import { useState, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Snackbar from '@mui/material/Snackbar';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useSheetsData } from 'src/hooks/use-sheets-data';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import SheetsForm from '../sheets-form';
import SheetsTableRow from '../sheets-table-row';
import SheetsTableHead from '../sheets-table-head';
import TableNoData from '../components/table-no-data';
import SheetsTableToolbar from '../sheets-table-toolbar';
import TableEmptyRows from '../components/table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function SheetsView() {
  const {
    records,
    loading,
    error,
    createRecord,
    updateRecord,
    deleteRecord,
    refreshData,
  } = useSheetsData();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const dataFiltered = applyFilter({
    inputData: records,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleSort = useCallback(
    (event, id) => {
      const isAsc = orderBy === id && order === 'asc';
      if (id !== '') {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      }
    },
    [order, orderBy]
  );

  const handleSelectAllClick = useCallback((event) => {
    if (event.target.checked) {
      const newSelecteds = records.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, [records]);

  const handleClick = useCallback((event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  }, [selected]);

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  }, []);

  const handleFilterByName = useCallback((event) => {
    setPage(0);
    setFilterName(event.target.value);
  }, []);

  const handleCreateNew = useCallback(() => {
    setEditingRecord(null);
    setIsFormOpen(true);
  }, []);

  const handleEdit = useCallback((record) => {
    setEditingRecord(record);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((record) => {
    setRecordToDelete(record);
    setDeleteDialogOpen(true);
  }, []);

  const handleFormSubmit = useCallback(async (data) => {
    try {
      if (editingRecord) {
        await updateRecord(editingRecord.id, data);
        setSnackbar({ open: true, message: 'Record updated successfully!', severity: 'success' });
      } else {
        await createRecord(data);
        setSnackbar({ open: true, message: 'Record created successfully!', severity: 'success' });
      }
      setIsFormOpen(false);
      setEditingRecord(null);
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Operation failed', severity: 'error' });
    }
  }, [editingRecord, updateRecord, createRecord]);

  const handleFormClose = useCallback(() => {
    setIsFormOpen(false);
    setEditingRecord(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    try {
      await deleteRecord(recordToDelete.id);
      setSnackbar({ open: true, message: 'Record deleted successfully!', severity: 'success' });
      setDeleteDialogOpen(false);
      setRecordToDelete(null);
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Delete failed', severity: 'error' });
    }
  }, [deleteRecord, recordToDelete]);

  const handleCancelDelete = useCallback(() => {
    setDeleteDialogOpen(false);
    setRecordToDelete(null);
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          Error loading data: {error}
          <Button onClick={refreshData} sx={{ ml: 2 }}>
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Google Sheets Data Entry</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleCreateNew}
        >
          New Record
        </Button>
      </Stack>

      <Card>
        <SheetsTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <SheetsTableHead
                order={order}
                orderBy={orderBy}
                rowCount={records.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'age', label: 'Age' },
                  { id: 'address', label: 'Address' },
                  { id: 'phone', label: 'Phone' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <SheetsTableRow
                      key={row.id}
                      name={row.name}
                      email={row.email}
                      age={row.age}
                      address={row.address}
                      phone={row.phone}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      onEdit={() => handleEdit(row)}
                      onDelete={() => handleDelete(row)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, records.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={records.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Form Dialog */}
      <Dialog
        open={isFormOpen}
        onClose={handleFormClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingRecord ? 'Edit Record' : 'Create New Record'}
        </DialogTitle>
        <DialogContent>
          <SheetsForm
            initialData={editingRecord}
            onSubmit={handleFormSubmit}
            onCancel={handleFormClose}
            loading={loading}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
      >
        <DialogTitle>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the record for &quot;{recordToDelete?.name}&quot;?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}