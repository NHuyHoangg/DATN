/* eslint-disable */
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
// import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { posts } from 'src/_mock/post';

// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import CircularProgress from '@mui/material/CircularProgress';
import { emptyRows, applyFilter, getComparator, applyFilterVerified } from '../utils';
import { searchWatch } from 'src/utils/post';

// ----------------------------------------------------------------------

export default function PostPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [filterVerified, setFilterVerified] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [watch, setWatch] = useState([]);
  const [curr, setCurr] = useState(1);
  const [total, setTotal] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWatchPosts = async () => {
      setLoading(true);
      try {
        const { data: dataFetch, currPage: currPage, totalPage: totalPage } = await searchWatch(1);
        setWatch(dataFetch);
        setCurr(currPage);
        setTotal(totalPage);
        fetchMore(currPage, totalPage);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getWatchPosts();
  }, []);

  const fetchMore = async (currPage, totalPage) => {
    try {
      let now = currPage;
      while (now < totalPage) {
        console.log('do');
        now++;
        const { data: newData, currPage: c, totalPage: t } = await searchWatch(now);
        // const updatedData = [...watch, ...newData];
        // setWatch(updatedData);
        setWatch((prevWatch) => [...prevWatch, ...newData]);
        setCurr(now);
      }
    } catch (err) {
      setError(true);
    }
  };

  console.log(watch);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = posts.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: watch,
    comparator: getComparator(order, orderBy),
    filterName,
    filterVerified,
  });

  const handleFilterByVerified = (event, value) => {
    setPage(0);
    setFilterVerified(value);
  };

  const dataFilteredVerified = applyFilterVerified({
    inputData: watch,
    comparator: getComparator(order, orderBy),
    filterVerified,
    filterName,
  });

  const notFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFilteredVerified.length && !!filterVerified) ||
    error;

  if (loading)
    return (
      <Container sx={{ display: 'flex', height: "100%", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress color="success" />
      </Container>
    );

  return (
    <Container>
      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          filterVerified={filterVerified}
          onFilterVerified={handleFilterByVerified}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={watch.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'post_id', label: 'ID' },
                  { id: 'name', label: 'Sản phẩm' },
                  { id: 'date', label: 'Ngày đăng' },
                  { id: 'province', label: 'Khu vực' },
                  { id: 'verified', label: 'Trạng thái' },
                  { id: '' },
                ]}
              />
              {notFound ? (
                <TableBody>
                  <TableNoData query={filterName} />
                </TableBody>
              ) : (
                <TableBody>
                  {(filterVerified.length === 0 ? dataFiltered : dataFilteredVerified)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row.post_id}
                        post_id={row.post_id}
                        verified={row.is_verified}
                        province={row.province}
                        name={row.name}
                        status={row.status}
                        date={row.date}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, posts.length)}
                  />

                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={filterVerified.length === 0 ? dataFiltered.length : dataFilteredVerified.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng:"
        />
      </Card>
    </Container>
  );
}
