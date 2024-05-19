/* eslint-disable */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';

// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import DeletePost from './delete-post';
// ----------------------------------------------------------------------

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

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
  media,
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

  const handleDetail = () => {
    navigate(`/order/detail/${post_id}`, { state: { change } });
    setOpen(false);
  };

  const handleShipping = () => {
    navigate(`/order/shipping/${post_id}`, { state: { change } });
    setOpen(false);
  };

  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };

  const formatDate = date.toLocaleString('vi-VN', options).replace(/^lúc\s+/i, '');

  const change = {
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
    media,
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <Grid sx={{ pt: 3, pl: 3 }} container spacing={2}>
          <Grid item>
            <Typography gutterBottom variant="subtitle1" component="div">
              Đơn hàng: {post_id}
            </Typography>
          </Grid>
        </Grid>

        <Grid sx={{ pl: 3 }} container spacing={2}>
          <Grid item>
            <Grid container>
              <Grid item>
                <Iconify icon="eva:calendar-outline" />
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="body1" component="div">
                  {formatDate}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container>
              <Grid item>
                <Iconify icon="eva:file-text-outline" />
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="body1" component="div">
                  Mã vận đơn: {post_id}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container>
              <Grid item>
                <Iconify icon="eva:car-outline" />
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Order has left the post office
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid sx={{ pl: 3, pb: 3 }} container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={media[0].content} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Người mua: {seller_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Người bán: {seller_name}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div" sx={{ color: 'custom.baemin1' }}>
                {new Intl.NumberFormat(['ban', 'id']).format(price)} đ
              </Typography>
            </Grid>
          </Grid>
        </Grid>

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

        <MenuItem onClick={handleShipping} sx={{ color: 'custom.yellow' }}>
          <Iconify icon="eva:car-outline" sx={{ mr: 2 }} />
          Vận chuyển
        </MenuItem>
      </Popover>

      <DeletePost open={openDelete} setOpen={setOpenDelete} change={change} />
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
