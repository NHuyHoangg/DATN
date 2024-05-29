/* eslint-disable */
// import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, Typography, styled } from '@mui/material';
// import Typography from '@mui/material/Typography';

// import Iconify from 'src/components/iconify';

// import AppTasks from '../app-tasks';
// import AppNewsUpdate from '../app-news-update';
// import AppOrderTimeline from '../app-order-timeline';
// import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';
// import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} md={8} lg={8}>
          <AppWebsiteVisits
            title="Lượt truy cập"
            // subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Lượt truy cập',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
              ],
            }}
          />
        </Grid>
        <Grid container xs={12} md={4} lg={4}>
          <Grid xs={6} lg={6} md={6}>
            <AppWidgetSummary
              title="Bài đăng mới"
              total={63}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            />
          </Grid>
          <Grid xs={6} md={6}>
            <AppWidgetSummary
              title="Người dùng mới"
              total={5}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            />
          </Grid>
          <Grid xs={6} md={6}>
            <AppWidgetSummary
              title="Đơn hàng mới"
              total={63}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
            />
          </Grid>
          <Grid xs={6} md={6}>
            <AppWidgetSummary
              title="Báo cáo bài đăng"
              total={32}
              color="error"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
            />
          </Grid>
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <AppWebsiteVisits
            title="Tổng số tiền các đơn hàng"
            subheader={`Tổng: ${[5461000, 3541000, 2784000, 465000, 1234000, 945000, 7541000, 452100, 8541000, 1235600, 2132000].reduce((a, b) => a + b, 0)}đ`}
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Số tiền',
                  type: 'column',
                  fill: 'solid',
                  data: [5461000, 3541000, 2784000, 465000, 1234000, 945000, 7541000, 452100, 8541000, 1235600, 2132000],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <AppWebsiteVisits
            title="Tổng số tiền COD phía giao hàng đã trả"
            subheader={`Tổng: ${[324000, 267000, 1674000, 965000, 2657000, 542000, 364000, 2142000, 455000, 123000, 913000].reduce((a, b) => a + b, 0)}đ`}
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Số tiền',
                  type: 'column',
                  fill: 'solid',
                  data: [324000, 267000, 1674000, 965000, 2657000, 542000, 364000, 2142000, 455000, 123000, 913000],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <AppWebsiteVisits
            title="Tổng số tiền đã trả khách hàng"
            subheader={`Tổng: ${[241000, 845000, 646000, 956000, 244000, 865000, 353000, 217000, 542000, 141000, 152000].reduce((a, b) => a + b, 0)}đ`}
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Số tiền',
                  type: 'column',
                  fill: 'solid',
                  data: [324000, 267000, 1674000, 965000, 2657000, 542000, 364000, 2142000, 455000, 123000, 913000],
                },
              ],
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
      <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={6}>
        <Card sx={{ p: 3, my: 3, width: '100%' }}>
          <Typography variant="h6">
            Người dùng mới gần đây
          </Typography>

          <Grid xs={12} lg={12} md={12} container justifyContent="space-between" sx={{ my: 1 }}>
            <Grid item>
              <Typography variant="body1">Pink Duc</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">1 phút trước</Typography>
            </Grid>
          </Grid>
          <Grid xs={12} lg={12} md={12} container justifyContent="space-between" sx={{ my: 1 }}>
            <Grid item>
              <Typography variant="body1">Hello Hi</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">18 phút trước</Typography>
            </Grid>
          </Grid>
          <Grid xs={12} lg={12} md={12} container justifyContent="space-between" sx={{ my: 1 }}>
            <Grid item>
              <Typography variant="body1">Lẽo Lẽo</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">2 ngày trước</Typography>
            </Grid>
          </Grid>
          <Grid xs={12} lg={12} md={12} container justifyContent="space-between" sx={{ my: 1 }}>
            <Grid item>
              <Typography variant="body1">Phan Name</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">3 ngày trước</Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Grid item xs={12} md={12} lg={6}>
        <Card sx={{ p: 3, my: 3, width: '100%' }}>
          <Typography variant="h6">
            Đơn hàng mới gần đây
          </Typography>

          <Grid xs={12} lg={12} md={12} container justifyContent="space-between" sx={{ my: 1 }}>
            <Grid item>
              <Typography variant="body1">Citizen FB1443-08A</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">12 phút trước</Typography>
            </Grid>
          </Grid>
          <Grid xs={12} lg={12} md={12} container justifyContent="space-between" sx={{ my: 1 }}>
            <Grid item>
              <Typography variant="body1">Casio MTP-1374D-1AVDF Nam Quartz</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">4 giờ trước</Typography>
            </Grid>
          </Grid>
          <Grid xs={12} lg={12} md={12} container justifyContent="space-between" sx={{ my: 1 }}>
            <Grid item>
              <Typography variant="body1">Pierre Lannier 255F466 Nam Quartz</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">1 ngày trước</Typography>
            </Grid>
          </Grid>
          <Grid xs={12} lg={12} md={12} container justifyContent="space-between" sx={{ my: 1 }}>
            <Grid item>
              <Typography variant="body1">Casio G-SHOCK GA-110AC-7ADR Nam Quartz</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">2 ngày trước</Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      </Grid>
    </Container>
  );
}
