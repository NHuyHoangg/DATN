/* eslint-disable */
import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Select, styled, MenuItem, FormLabel, TextField, DialogActions } from '@mui/material';
// import palette from '../../../theme/palette';
// import { CreateQuestionAction, GetQuestionAction } from '../../../redux/actions/questionAction';
import { isValidEmail, isValidPhoneNumber } from 'src/utils/inputValidation';
import { changeUser } from 'src/utils/users';

const InputBox = styled(Box)({
  marginLeft: '20px',
  marginRight: '20px',
  width: '30rem',
});
const InputText = styled(TextField)({
  width: '100%',
});
const SelectBox = styled(Select)({
  width: '100%',
});
const Title = styled(DialogTitle)({
  // color: `${palette.maincolor.primary}`,
  fontSize: '24px',
});
const Label = styled(FormLabel)({
  color: 'black',
});

export default function ChangeUser({ setOpen, open, change }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState();
  const [data, setData] = useState({
    id: change.id,
    first_name: change.first_name,
    last_name: change.last_name,
    email: change.email,
    phone: change.phone_number,
    is_active: change.status,
    is_admin: change.role,
  });

  console.log(data)

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeValue = useCallback(
    (e) => {
      const { value, name } = e.target;
      setData({
        ...data,
        [name]: value,
      });
      setValidationErrors({
        ...validationErrors,
        [name]: value ? '' : 'Vui lòng điền đầy đủ',
      });
    },
    [data, validationErrors]
  );

  const handleCreateClick = async () => {
    if (data.last_name && data.first_name && data.email && data.phone && data.password) {
      setOpen(false);
      // window.location.reload();
    } else {
      if (!data.last_name) 
        setValidationErrors(preError => ({...preError, last_name: 'Vui lòng điền đầy đủ'}))
      if (!data.first_name)
        setValidationErrors(preError => ({...preError, first_name: 'Vui lòng điền đầy đủ'}))
      if (!data.phone) {
        setValidationErrors(preError => ({...preError, phone: 'Vui lòng điền đầy đủ'}))
      } else {
        const {isValid: isPhone, message: messagePhone} = isValidPhoneNumber(data.phone);
        if (!isPhone)
          setValidationErrors(preError => ({...preError, phone: messagePhone}))
      }
      if (!data.email){
        setValidationErrors(preError => ({...preError, email: 'Vui lòng điền đầy đủ'}))
      } else {
        const {isValid: isEmail, message: messageEmail} = isValidEmail(data.email);
        if (!isEmail)
          setValidationErrors(preError => ({...preError, email: messageEmail}))
      }
    }
    try {
      if (validationErrors) {
        await changeUser(data);
        setError(null);
        setOpen(false);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      setError("Có lỗi xảy ra khi thực hiện! Vui lòng thử lại!");
    }
  };
  
  return (
    <Dialog onClose={handleClose} open={open}>
      <Title sx={{color: "custom.baemin1"}}>Chỉnh sửa thông tin người dùng</Title>
      <InputBox>
        <Label>Họ</Label>
        <InputText
          type="text"
          value={data?.last_name}
          name="last_name"
          onChange={handleChangeValue}
          helperText={validationErrors.last_name}
          error={Boolean(validationErrors.last_name)}
        />
        <Label>Tên</Label>
        <InputText
          type="text"
          value={data?.first_name}
          name="first_name"
          onChange={handleChangeValue}
          helperText={validationErrors.first_name}
          error={Boolean(validationErrors.first_name)}
        />
        <Label>Email</Label>
        <InputText
          type="email"
          value={data?.email}
          name="email"
          onChange={handleChangeValue}
          helperText={validationErrors.email}
          error={Boolean(validationErrors.email)}
        />
        <Label>Số điện thoại</Label>
        <InputText
          type="text"
          value={data?.phone}
          name="phone"
          onChange={handleChangeValue}
          helperText={validationErrors.phone}
          error={Boolean(validationErrors.phone)}
        />
        <Label>Trạng thái</Label>
        <SelectBox value={data.is_active} name="is_active" onChange={handleChangeValue}>
          <MenuItem value="1">Active</MenuItem>
          <MenuItem value="0">Block</MenuItem>
        </SelectBox>
        <Label>Phân quyền</Label>
        <SelectBox value={data.is_admin} name="is_admin" onChange={handleChangeValue}>
          <MenuItem value="0">Người dùng</MenuItem>
          <MenuItem value="1">Admin</MenuItem>
        </SelectBox>

        {error && <Label sx={{color: "error.main"}}>{error}</Label>}
      </InputBox>
      <DialogActions>
        <Button sx={{color: "error.main"}} onClick={handleClose}>Huỷ</Button>
        <Button sx={{color: "custom.baemin1"}} onClick={handleCreateClick}>Xác nhận</Button>
      </DialogActions>
    </Dialog>
  );
}
ChangeUser.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  change: PropTypes.object.isRequired,
};
