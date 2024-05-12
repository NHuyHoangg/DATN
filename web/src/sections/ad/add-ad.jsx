import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, styled, FormLabel, TextField, DialogActions } from '@mui/material';
// import palette from '../../../theme/palette';

const InputBox = styled(Box)({
  marginLeft: '20px',
  marginRight: '20px',
  width: '30rem',
});
const InputText = styled(TextField)({
  width: '100%',
});
const Title = styled(DialogTitle)({
  fontSize: '24px',
});
const Label = styled(FormLabel)({
  color: 'black',
});

export default function AddAd({ setOpen, open }) {
  const [validationErrors, setValidationErrors] = useState({});
  const [data, setData] = useState({
    name: '',
    price: '',
    duration: '',
    description: '',
  });

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
    if (data.name && data.price && data.duration && data.description) {
      setOpen(false);
      // window.location.reload();
    } else {
      if (!data.name) 
        setValidationErrors(preError => ({...preError, name: 'Vui lòng điền đầy đủ'}))
      if (!data.price)
        setValidationErrors(preError => ({...preError, price: 'Vui lòng điền đầy đủ'}))
      if (!data.duration)
        setValidationErrors(preError => ({...preError, duration: 'Vui lòng điền đầy đủ'}))
      if (!data.description)
        setValidationErrors(preError => ({...preError, description: 'Vui lòng điền đầy đủ'}))
    }
  };
  
  return (
    <Dialog onClose={handleClose} open={open}>
      <Title sx={{color: "custom.baemin1"}}>Thêm gói đẩy tin</Title>
      <InputBox>
      <Label>Tên gói</Label>
        <InputText
          type="text"
          value={data?.name}
          name="name"
          onChange={handleChangeValue}
          helperText={validationErrors.name}
          error={Boolean(validationErrors.name)}
        />
        <Label>Mức giá</Label>
        <InputText
          type="text"
          value={data?.price}
          name="price"
          onChange={handleChangeValue}
          helperText={validationErrors.price}
          error={Boolean(validationErrors.price)}
        />
        <Label>Thời hạn (ngày)</Label>
          <InputText
            type="text"
            value={data?.duration}
            name="duration"
            onChange={handleChangeValue}
            helperText={validationErrors.duration}
            error={Boolean(validationErrors.duration)}
          />
        <Label>Mô tả</Label>
        <InputText
          type="text"
          value={data?.description}
          name="description"
          multiline
          onChange={handleChangeValue}
          helperText={validationErrors.description}
          error={Boolean(validationErrors.description)}
        />
      </InputBox>
      <DialogActions>
        <Button sx={{color: "error.main"}} onClick={handleClose}>Huỷ</Button>
        <Button sx={{color: "custom.baemin1"}} onClick={handleCreateClick}>Xác nhận</Button>
      </DialogActions>
    </Dialog>
  );
}
AddAd.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
