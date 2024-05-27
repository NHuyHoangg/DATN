/* eslint-disable */
import { useState } from 'react';
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
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

import Iconify from 'src/components/iconify';

const Img = styled('img')({
  marginRight: '5%',
  display: 'block',
  width: '40%',
  height: '40%',
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

export default function OrderShipping() {
  const navigate = useNavigate();
  const location = useLocation();
  const { change } = location.state;
  const id = change.post_id;
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [openPic, setOpenPic] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openVerified, setOpenVerified] = useState(false);
  const imgPerPage = 3;

  const nextImg = () => {
    if (index < change.media.length - 1) setIndex(index + 1);
  };

  const preImg = () => {
    if (index !== 0) setIndex(index - 1);
  };

  const nextPage = () => {
    if (change.media.length > imgPerPage && page < 1) setPage(page + 1);
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

  console.log(change)

  return (
    <>
      <Helmet>
        <title>Chi tiết đơn vận chuyển</title>
      </Helmet>

      <Container>
        <Card sx={{ p: 3, my: 3 }}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Typography variant="h4" sx={{ color: 'custom.baemin1' }}>
                Thông tin vận chuyển
              </Typography>

              <Stack direction="row" alignItems="center" onClick={() => {navigate(`/order/detail/${change.post_id}`, { state: { change } })}} sx={{":hover": {cursor: "pointer"}}} >
                <Img alt="complex" onClick={handleOpen} src={change.media[index].content} />
                <Stack direction="column">
                  <Typography variant="h6" paragraph>
                    {change.name}
                  </Typography>

                  <Typography variant="h6" paragraph sx={{ color: 'custom.baemin1' }}>
                    {new Intl.NumberFormat(['ban', 'id']).format(change.price)}đ
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="column" alignItems="flex-start">
                <Typography variant="h6" paragraph sx={{ color: 'custom.baemin1' }}>
                  Thông tin người mua
                </Typography>

                <Typography variant="body1" paragraph>
                  {change.seller_name}
                </Typography>
                <Typography variant="body1" paragraph>
                  {change.phone_number}
                </Typography>
                <Typography variant="body1" paragraph>
                  {change.street.concat(
                    ', ',
                    change.ward,
                    ', ',
                    change.district,
                    ', ',
                    change.province
                  )}
                </Typography>
              </Stack>

              <Stack direction="column" alignItems="flex-start">
                <Typography variant="h6" paragraph sx={{ color: 'custom.baemin1' }}>
                  Thông tin người bán
                </Typography>

                <Typography variant="body1" paragraph>
                  {change.seller_name}
                </Typography>
                <Typography variant="body1" paragraph>
                  {change.phone_number}
                </Typography>
                <Typography variant="body1" paragraph>
                  {change.street.concat(
                    ', ',
                    change.ward,
                    ', ',
                    change.district,
                    ', ',
                    change.province
                  )}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h4" sx={{ color: 'custom.baemin1' }}>
                Mã vận đơn: {change.post_id}
              </Typography>

              <Timeline
                sx={{
                  [`& .${timelineOppositeContentClasses.root}`]: {
                    flex: 0.2,
                    color: 'custom.baemin1',
                  },
                }}
              >
                <TimelineItem>
                  <TimelineOppositeContent>19:34 03-11-2023</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: 'custom.baemin1' }} />
                    <TimelineConnector sx={{ bgcolor: 'custom.baemin1' }} />
                  </TimelineSeparator>
                  <TimelineContent sx={{ color: 'custom.baemin1' }}>Order is delivering to user</TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineOppositeContent>19:19 03-11-2023</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: 'custom.baemin1' }} />
                    <TimelineConnector sx={{ bgcolor: 'custom.baemin1' }} />
                  </TimelineSeparator>
                  <TimelineContent sx={{ color: 'custom.baemin1' }}>Order is delivered to BW SOC</TimelineContent>
                </TimelineItem>
                
                <TimelineItem>
                  <TimelineOppositeContent>17:45 03-11-2023</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: 'custom.baemin1' }} />
                    <TimelineConnector sx={{ bgcolor: 'custom.baemin1' }} />
                  </TimelineSeparator>
                  <TimelineContent sx={{ color: 'custom.baemin1' }}>Order has left the post office</TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineOppositeContent>17:28 03-11-2023</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: 'custom.baemin1' }} />
                    <TimelineConnector sx={{ bgcolor: 'custom.baemin1' }} />
                  </TimelineSeparator>
                  <TimelineContent sx={{ color: 'custom.baemin1' }}>Order is delivered to 20-HNI Thanh Xuan 2 Hub</TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineOppositeContent>15:26 03-11-2023</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: 'custom.baemin1' }} />
                    <TimelineConnector sx={{ bgcolor: 'custom.baemin1' }} />
                  </TimelineSeparator>
                  <TimelineContent sx={{ color: 'custom.baemin1' }}>Order is delivered to shipping unit</TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineOppositeContent>09:12 03-11-2023</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: 'custom.baemin1' }} />
                    <TimelineConnector sx={{ bgcolor: 'custom.baemin1' }} />
                  </TimelineSeparator>
                  <TimelineContent sx={{ color: 'custom.baemin1' }}>Seller is preparing order</TimelineContent>
                </TimelineItem>
              </Timeline>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
OrderShipping.propTypes = {
  // change: PropTypes.object.isRequired,
};
