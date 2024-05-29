/* eslint-disable */
import PropTypes from 'prop-types';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { styled, DialogActions, DialogContent } from '@mui/material';
// import palette from '../../../theme/palette';
import { deleteAd } from 'src/utils/ad';

const Title = styled(DialogTitle)({
  fontSize: '24px',
});

export default function DeleteAd({ setOpen, open, change }) {
  const { id } = change;
  const [err, setErr] = useState(false);

  const handleDelete = async() => {
    try {
      const res = await deleteAd(id);
      console.log(res)
      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setErr("Có lỗi xảy ra khi thực hiện! Vui lòng thử lại!")
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <Dialog onClose={handleClose} open={open}>
      <Title sx={{color: "custom.baemin1"}}>Bạn có muốn xoá gói đẩy tin này?</Title>
      {err && <DialogContent sx={{color: "error.main"}}>{err}</DialogContent>}
      <DialogActions>
        <Button sx={{color: "error.main"}} onClick={handleClose}>Huỷ</Button>
        <Button sx={{color: "custom.baemin1"}} onClick={handleDelete}>Xác nhận</Button>
      </DialogActions>
    </Dialog>
  );
}
DeleteAd.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  change: PropTypes.object.isRequired,
};
