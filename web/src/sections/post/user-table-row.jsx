/* eslint-disable */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';

// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import DeletePost from './delete-post';
// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  post_id,
  verified,
  province,
  name,
  status,
  date,
}) {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDetail= () => {
    navigate(`/post/detail/${post_id}`, { state: {change} });
    setOpen(false);
  }

  const handleDelete = () => {
    setOpenDelete(true);
    setOpen(false);
  }

  const options = {
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  };
  
  // Format the date using toLocaleString with the 'vi-VN' locale
  const dateTo = new Date(date)
  const formatDate = dateTo.toLocaleString('vi-VN', options).replace(/^lúc\s+/i, '');

  const change = { post_id, verified };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell>{post_id}</TableCell>

        <TableCell>{name}</TableCell>

        <TableCell>{formatDate}</TableCell>

        <TableCell>{province}</TableCell>

        <TableCell>
          <Label color={(verified === 1 && 'error') || (verified === 0 && 'warning') || 'success'}>
            {(verified === 1 && 'Từ chối') || (verified === 0 && 'Đang chờ') || 'Đã duyệt'}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleDetail} sx={{ color: 'custom.baemin2' }}>
          <Iconify icon="eva:file-text-outline" sx={{ mr: 2 }} />
          Xem chi tiết
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Xoá
        </MenuItem>
      </Popover>

      <DeletePost open={openDelete} setOpen={setOpenDelete} change={change}/>
    </>
  );
}

UserTableRow.propTypes = {
  selected: PropTypes.any,
  status: PropTypes.string,
  post_id: PropTypes.number,
  verified: PropTypes.string,
  province: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.object,
};
