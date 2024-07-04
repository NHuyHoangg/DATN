/* eslint-disable */
import PropTypes from 'prop-types';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { styled, DialogActions, DialogContent } from '@mui/material';
// import palette from '../../../theme/palette';
// import { CreateQuestionAction, GetQuestionAction } from '../../../redux/actions/questionAction';
import { blockUser } from 'src/utils/users';

const Title = styled(DialogTitle)({
  fontSize: '24px',
});

export default function DeleteUser({ setOpen, open, change }) {
  const { id } = change;
  const [err, setErr] = useState(false);

  const handleDelete = async() => {
    try {
      const res = await blockUser(id);
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
  }
  
  return (
    <Dialog onClose={handleClose} open={open}>
      <Title sx={{color: "custom.baemin1"}}>Bạn có muốn sửa trạng thái người dùng này?</Title>
      {err && <DialogContent sx={{color: "error.main"}}>{err}</DialogContent>}
      <DialogActions>
        <Button sx={{color: "error.main"}} onClick={handleClose}>Huỷ</Button>
        <Button sx={{color: "custom.baemin1"}} onClick={handleDelete}>Xác nhận</Button>
      </DialogActions>
    </Dialog>
  );
}
DeleteUser.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  change: PropTypes.object.isRequired,
};
