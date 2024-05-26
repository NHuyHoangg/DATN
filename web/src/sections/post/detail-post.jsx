/* eslint-disable */
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import {
  Card,
  Grid,
  Stack,
  styled,
  Container,
  Typography,
  DialogActions,
  DialogTitle,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchWatchDetails } from 'src/utils/post';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  width: '70%',
  height: '70%',
  maxWidth: '100%',
  maxHeight: '100%',
});

const SmallImg = styled('img')({
  margin: 'auto',
  display: 'block',
  width: '20%',
  height: '20%',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Title = styled(DialogTitle)({
  fontSize: '24px',
});

export default function DetailPost() {
  const location = useLocation();
  const navigate = useNavigate();
  const { change } = location.state;
  const [data, setData] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [openPic, setOpenPic] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openVerified, setOpenVerified] = useState(false);
  const imgPerPage = 3;

  useEffect(() => {
    const getDetail = async () => {
      setLoading(true);
      try {
        const detail = await fetchWatchDetails(change.post_id);
        console.log(detail);
        setData(detail.product_info);
        setMedia(detail.media);
        setLoading(false);
      } catch (err) {
        setError(true);
      }
    };

    getDetail();
  }, []);

  const nextImg = () => {
    if (index < media.length - 1) setIndex(index + 1);
  };

  const preImg = () => {
    if (index !== 0) setIndex(index - 1);
  };

  const nextPage = () => {
    if (media.length > imgPerPage && page < 1) setPage(page + 1);
  };

  const prePage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleOpen = () => {
    setOpenPic(true);
  };

  const handleClose = () => {
    setOpenPic(false);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenVerified = () => {
    setOpenVerified(true);
  };

  const handleCloseVerified = () => {
    setOpenVerified(false);
  };

  const handleVerified = () => {
    console.log("navigate")
    navigate('/post');
  };

  const OpenImg = (
    <Dialog onClose={handleClose} open={openPic} fullWidth maxWidth="sm">
      <Img alt="complex" src={media[index]?.content} />
    </Dialog>
  );

  const OpenDelete = (
    <Dialog onClose={handleCloseDelete} open={openDelete} fullWidth maxWidth="sm">
      <Title sx={{ color: 'custom.baemin1' }}>Bạn có muốn từ chối kiểm định bài đăng này?</Title>

      <DialogActions>
        <Button sx={{ color: 'error.main' }} onClick={handleCloseDelete}>
          Huỷ
        </Button>
        <Button sx={{ color: 'custom.baemin1' }} onClick={handleVerified}>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );

  const OpenVerified = (
    <Dialog onClose={handleCloseVerified} open={openVerified} fullWidth maxWidth="sm">
      <Title sx={{ color: 'custom.baemin1' }}>Bạn có chấp nhận kiểm định bài đăng này?</Title>

      <DialogActions>
        <Button sx={{ color: 'error.main' }} onClick={handleCloseVerified}>
          Huỷ
        </Button>
        <Button sx={{ color: 'custom.baemin1' }} onClick={handleVerified}>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );

  if (loading)
    return (
      <Container sx={{ display: 'flex', height: "100%", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress color="success" />
      </Container>
    );

  return (
    <>
      <Helmet>
        <title>Chi tiết bài đăng</title>
      </Helmet>

      <Container>
        {change.verified == 0 && (
          <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5}>
            <Button
              variant="contained"
              color="inherit"
              onClick={handleOpenVerified}
              sx={{ backgroundColor: 'custom.baemin1', mr: 5 }}
              startIcon={<Iconify icon="eva:checkmark-fill" />}
            >
              Duyệt
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleOpenDelete}
              startIcon={<Iconify icon="eva:close-fill" />}
            >
              Từ chối
            </Button>
          </Stack>
        )}

        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={4}>
            <Stack direction="row" alignItems="center">
              <IconButton
                size="large"
                onClick={preImg}
                sx={{ backgroundColor: 'grey.500', color: 'white' }}
              >
                <Iconify width={20} icon="eva:chevron-left-fill" />
              </IconButton>

              <Img alt="complex" onClick={handleOpen} src={media[index]?.content} />

              <IconButton
                size="large"
                onClick={nextImg}
                sx={{ backgroundColor: 'grey.500', color: 'white' }}
              >
                <Iconify width={20} icon="eva:chevron-right-fill" />
              </IconButton>
            </Stack>

            <Stack direction="row" alignItems="center" my={3}>
              <IconButton
                size="small"
                onClick={prePage}
                sx={{ backgroundColor: 'grey.500', color: 'white' }}
              >
                <Iconify width={20} icon="eva:chevron-left-fill" />
              </IconButton>

              {media.slice(page * imgPerPage, page * imgPerPage + imgPerPage).map((item) => (
                <SmallImg alt="complex" src={item.content} />
              ))}

              <IconButton
                size="small"
                onClick={nextPage}
                sx={{ backgroundColor: 'grey.500', color: 'white' }}
              >
                <Iconify width={20} icon="eva:chevron-right-fill" />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={8}>
            <Typography variant="h3">{data.name || "Không có thông tin"}</Typography>

            <Typography variant="body1" paragraph>
              {data.description || "Không có thông tin"}
            </Typography>

            <Typography variant="h3" sx={{ color: 'custom.baemin1' }}>
              {data.formatted_price || "Không có thông tin"}
            </Typography>

            <Card sx={{ p: 3, my: 3 }}>
              <Typography variant="h4" sx={{ color: 'custom.baemin1' }}>
                Thông tin người bán
              </Typography>
              <Grid container spacing={1} columnSpacing={1}>
                <Grid item xs={6} my={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify width={20} sx={{ mr: 1 }} icon="eva:person-outline" />
                    <Typography variant="h6">Họ và tên</Typography>
                  </Stack>
                  <Typography sx={{ ml: 1 }}>{data.user_name || "Không có thông tin"}</Typography>
                </Grid>

                <Grid item xs={6} my={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify width={20} sx={{ mr: 1 }} icon="eva:pin-outline" />
                    <Typography variant="h6">Khu vực</Typography>
                  </Stack>
                  <Typography sx={{ ml: 1 }}>{data.province || "Không có thông tin"}</Typography>
                </Grid>

                <Grid item xs={6} my={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify width={20} sx={{ mr: 1 }} icon="eva:home-outline" />
                    <Typography variant="h6">Địa chỉ</Typography>
                  </Stack>
                  <Typography sx={{ ml: 1 }}>
                    {data?.street?.concat(', ', data?.ward, ', ', data?.district) || "Không có thông tin"}
                  </Typography>
                </Grid>

                <Grid item xs={6} my={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify width={20} sx={{ mr: 1 }} icon="eva:phone-outline" />
                    <Typography variant="h6">Số điện thoại</Typography>
                  </Stack>
                  <Typography sx={{ ml: 1 }}>{data.phone || "Không có thông tin"}</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h4" sx={{ color: 'custom.baemin1', my: 3 }}>
                Mô tả
              </Typography>
              <Grid container spacing={1} columnSpacing={1}>
                <Grid item xs={4} my={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify width={20} sx={{ mr: 1 }} icon="mingcute:watch-line" />
                    <Typography variant="h6">Hãng</Typography>
                  </Stack>
                  <Typography sx={{ ml: 1 }}>{data.brand || "Không có thông tin"}</Typography>
                </Grid>

                <Grid item xs={4} my={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify width={20} sx={{ mr: 1 }} icon="iconamoon:category-light" />
                    <Typography variant="h6">Loại đồng hồ</Typography>
                  </Stack>
                  <Typography sx={{ ml: 1 }}>{data.origin || "Không có thông tin"}</Typography>
                </Grid>

                <Grid item xs={4} my={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify width={20} sx={{ mr: 1 }} icon="icon-park-outline:oceanengine" />
                    <Typography variant="h6">Động cơ</Typography>
                  </Stack>
                  <Typography sx={{ ml: 1 }}>{data.engine || "Không có thông tin"}</Typography>
                </Grid>

                <Grid item xs={4} my={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify width={20} sx={{ mr: 1 }} icon="radix-icons:button" />
                    <Typography variant="h6">Số nút bấm</Typography>
                  </Stack>
                  <Typography sx={{ ml: 1 }}>{data.engine || "Không có thông tin"}</Typography>
                </Grid>

                <Grid item xs={4} my={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify width={20} sx={{ mr: 1 }} icon="eva:checkmark-circle-2-outline" />
                    <Typography variant="h6">Tình trạng</Typography>
                  </Stack>
                  <Typography sx={{ ml: 1 }}>{(data.status === 'new' && 'Mới') || 'Cũ'}</Typography>
                </Grid>

                <Grid item xs={4} my={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify width={20} sx={{ mr: 1 }} icon="eva:clock-outline" />
                    <Typography variant="h6">Kích thước mặt số</Typography>
                  </Stack>
                  <Typography sx={{ ml: 1 }}>{data.case_size || "Không có thông tin"} mm</Typography>
                </Grid>

                <Grid item xs={4} my={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify width={20} sx={{ mr: 1 }} icon="eva:clock-outline" />
                    <Typography variant="h6">Màu mặt kính</Typography>
                  </Stack>
                  <Typography sx={{ ml: 1 }}>{data.case_size || "Không có thông tin"}</Typography>
                </Grid>

                <Grid item xs={4} my={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify width={20} sx={{ mr: 1 }} icon="solar:user-circle-broken" />
                    <Typography variant="h6">Kiểu dáng</Typography>
                  </Stack>
                  <Typography sx={{ ml: 1 }}>{data.gender || "Không có thông tin"}</Typography>
                </Grid>

                <Grid item xs={4} my={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify width={20} sx={{ mr: 1 }} icon="mdi:water-off-outline" />
                    <Typography variant="h6">Chống nước</Typography>
                  </Stack>
                  <Typography sx={{ ml: 1 }}>{data.waterproof || "Không có thông tin"}</Typography>
                </Grid>

                <Grid item xs={4} my={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify width={20} sx={{ mr: 1 }} icon="logos:fabric" />
                    <Typography variant="h6">Loại dây</Typography>
                  </Stack>
                  <Typography sx={{ ml: 1 }}>{data.strap_material || "Không có thông tin"}</Typography>
                </Grid>

                <Grid item xs={4} my={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify width={20} sx={{ mr: 1 }} icon="logos:fabric" />
                    <Typography variant="h6">Màu dây</Typography>
                  </Stack>
                  <Typography sx={{ ml: 1 }}>{data.strap_color || "Không có thông tin"}</Typography>
                </Grid>

                <Grid item xs={4} my={1}>
                  <Stack direction="row" alignItems="center">
                    <Iconify width={20} sx={{ mr: 1 }} icon="mage:battery-full" />
                    <Typography variant="h6">Thời gian sử dụng pin</Typography>
                  </Stack>
                  <Typography sx={{ ml: 1 }}>{data.battery_life || "Không có thông tin"}</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>

        {OpenImg}
        {OpenDelete}
        {OpenVerified}
      </Container>
    </>
  );
}
DetailPost.propTypes = {
  // change: PropTypes.object.isRequired,
};
