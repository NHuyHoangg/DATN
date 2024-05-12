import { useState } from 'react';
import PropTypes from 'prop-types';

// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

import ChangeAd from './change-ad';
import DeleteAd from './delete-ad';
// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  id,
  duration,
  price,
  name,
  description,
}) {
  const [open, setOpen] = useState(false);

  const [openChange, setOpenChange] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleChange = () => {
    setOpenChange(true);
    setOpen(false);
  }

  const handleDelete = () => {
    setOpenDelete(true);
    setOpen(false);
  }

  const change = { id, duration, price, name, description };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell>{id}</TableCell>

        <TableCell>{name}</TableCell>

        <TableCell>{price}đ</TableCell>

        <TableCell>{duration} ngày</TableCell>

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
        <MenuItem onClick={handleChange} sx={{ color: 'custom.baemin2' }}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Chỉnh sửa
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Xoá
        </MenuItem>
      </Popover>

      <ChangeAd open={openChange} setOpen={setOpenChange} change={change}/>
      <DeleteAd open={openDelete} setOpen={setOpenDelete} change={change}/>
    </>
  );
}

UserTableRow.propTypes = {
  selected: PropTypes.any,
  id: PropTypes.number,
  duration: PropTypes.number,
  price: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
};
