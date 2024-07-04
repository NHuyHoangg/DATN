/* eslint-disable */
import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

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
import { emptyRows, applyFilter, getComparator, applyFilterVerified } from '../utils';

// ----------------------------------------------------------------------

export default function OrderPage() {
  const label = useParams();
  console.log(label);
  let date;
  if (label)
    date = new Date(label.date);
  console.log(date);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [filterVerified, setFilterVerified] = useState('');

  const [filterDate, setFilterDate] = useState();

  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (label) {
    // console.log(date);
  }

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
    inputData: posts,
    comparator: getComparator(order, orderBy),
    filterName,
    filterVerified,
  });

  const handleFilterByVerified = (event, value) => {
    setPage(0);
    setFilterVerified(value);
  };

  const dataFilteredVerified = applyFilterVerified({
    inputData: posts,
    comparator: getComparator(order, orderBy),
    filterVerified,
    filterName,
  });

  const formatDateToDMY = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const filterByDate = (data, filterDate) => {
    if (!filterDate) return data;
    return data.filter(row => {
      return formatDateToDMY(row.date) == formatDateToDMY(filterDate)
    });
  };

  const filteredData = filterVerified.length === 0 ? dataFiltered : dataFilteredVerified;
  let dateFilteredData;
  if (label.date) {
    dateFilteredData = filterByDate(filteredData, date);
  } else dateFilteredData = filteredData;
  const paginatedData = dateFilteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const notFound = (!dataFiltered.length && !!filterName) || (!dataFilteredVerified.length && !!filterVerified);

  console.log(filterVerified.length)

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
                rowCount={posts.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  // { id: 'post_id', label: 'ID'},
                  // { id: 'name', label: 'Sản phẩm' },
                  // { id: 'seller_name', label: 'Họ và tên người bán' },
                  // { id: 'date', label: 'Ngày đăng' },
                  // { id: 'province', label: 'Khu vực' },
                  // { id: 'verified', label: 'Trạng thái' },
                  // { id: '' },
                  // { id: '' },
                ]}
              />
              <TableBody>
                {paginatedData
                  .map((row) => (
                    <UserTableRow
                      key={row.post_id}
                      post_id={row.post_id}
                      order_status={row.order_status}
                      seller_name={row.seller_name}
                      phone_number={row.phone_number}
                      email={row.email}
                      street={row.street}
                      ward={row.ward}
                      district={row.district}
                      province={row.province}
                      name={row.name}
                      price={row.price}
                      case_size={row.case_size}
                      status={row.status}
                      date={row.date}
                      count={row.count}
                      date_ago={row.date_ago}
                      formatted_price={row.formatted_price}
                      case_size_num={row.case_size_num}
                      description={row.description}
                      brand={row.brand}
                      strap_material={row.strap_material}
                      battery_life={row.battery_life}
                      waterproof={row.waterproof}
                      waterproof_num ={row.waterproof_num}
                      gender={row.gender}
                      seller_id={row.seller_id}
                      media={row.media}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, posts.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>

            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={label.date ? paginatedData.length : (filterVerified.length === 0 ? dataFiltered.length : dataFilteredVerified.length)}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage='Số hàng:'
        />
      </Card>

    </Container>
  );
}
