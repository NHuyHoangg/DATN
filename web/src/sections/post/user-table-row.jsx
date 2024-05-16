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
  seller_name,
  phone_number,
  email,
  street,
  ward,
  district,
  province,
  name,
  price,
  case_size,
  status,
  date,
  count,
  date_ago,
  formatted_price,
  case_size_num,
  description,
  brand,
  strap_material,
  battery_life,
  waterproof,
  waterproof_number,
  gender,
  seller_id,
  media
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

  const formatDate = date.toLocaleString('vi-VN', options).replace(/^lúc\s+/i, '');

  const change = { post_id,
    verified,
    seller_name,
    phone_number,
    email,
    street,
    ward,
    district,
    province,
    name,
    price,
    case_size,
    status,
    date,
    count,
    date_ago,
    formatted_price,
    case_size_num,
    description,
    brand,
    strap_material,
    battery_life,
    waterproof,
    waterproof_number,
    gender,
    seller_id,
    media,
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell>{post_id}</TableCell>

        <TableCell>{name}</TableCell>

        <TableCell>{seller_name}</TableCell>

        <TableCell>{formatDate}</TableCell>

        <TableCell>{province}</TableCell>

        <TableCell>
          <Label color={(verified === 'denied' && 'error') || (verified === 'waiting' && 'warning') || 'success'}>
            {(verified === 'denied' && 'Từ chối') || (verified === 'waiting' && 'Đang chờ') || 'Đã duyệt'}
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
  email: PropTypes.string,
  post_id: PropTypes.number,
  verified: PropTypes.string,
  seller_name: PropTypes.string,
  phone_number: PropTypes.string,
  street: PropTypes.string,
  ward: PropTypes.string,
  district: PropTypes.string,
  province: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  case_size: PropTypes.number,
  date: PropTypes.object,
  count: PropTypes.number,
  date_ago: PropTypes.string,
  formatted_price: PropTypes.number,
  case_size_num: PropTypes.number,
  description: PropTypes.string,
  brand: PropTypes.string,
  strap_material: PropTypes.string,
  battery_life: PropTypes.number,
  waterproof: PropTypes.bool,
  waterproof_number: PropTypes.number,
  gender: PropTypes.string,
  seller_id: PropTypes.number,
  media: PropTypes.object,
};
