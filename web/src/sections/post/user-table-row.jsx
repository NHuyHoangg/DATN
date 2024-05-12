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

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import ChangeUser from './change-user';
import DeletePost from './delete-post';
// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  first_name,
  last_name,
  role,
  status,
  email,
  id,
  password,
  phone_number,
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

  const change = { id, first_name, last_name, email, phone_number, role, status, password };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell>{id}</TableCell>

        <TableCell>{first_name.concat(" ", last_name)}</TableCell>

        <TableCell>{email}</TableCell>

        {role === 'admin' ? (
          <TableCell>Admin</TableCell>
        ) : (
          <TableCell>Người dùng</TableCell>
        )}

        <TableCell>
          <Label color={(status === 'block' && 'error') || 'success'}>{status}</Label>
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
        <MenuItem onClick={handleChange} sx={{ color: 'custom.baemin2' }}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Chỉnh sửa
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Xoá
        </MenuItem>
      </Popover>

      <ChangeUser open={openChange} setOpen={setOpenChange} change={change}/>
      <DeletePost open={openDelete} setOpen={setOpenDelete} change={change}/>
    </>
  );
}

UserTableRow.propTypes = {
  first_name: PropTypes.any,
  last_name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.number,
  password: PropTypes.string,
  phone_number: PropTypes.string,
};
