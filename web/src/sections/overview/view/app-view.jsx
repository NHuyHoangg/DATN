/* eslint-disable */
// import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} md={8} lg={8}>
          <AppWebsiteVisits
            title="Lượt truy cập"
            // subheader="(+43%) than last year"
            height={364}
            chart={{
              labels: [
                '05/18/2024',
                '05/19/2024',
                '05/20/2024',
                '05/21/2024',
                '05/22/2024',
                '05/23/2024',
                '05/24/2024',
                '05/25/2024',
                '05/26/2024',
                '05/27/2024',
                '05/28/2024',
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
            height={364}
            subheader={`Tổng: ${new Intl.NumberFormat(['ban', 'id']).format([5461000, 3541000, 2784000, 465000, 1234000, 945000, 7541000, 452100, 8541000, 1235600, 2132000].reduce((a, b) => a + b, 0))} đ`}
            chart={{
              labels: [
                '05/18/2024',
                '05/19/2024',
                '05/20/2024',
                '05/21/2024',
                '05/22/2024',
                '05/23/2024',
                '05/24/2024',
                '05/25/2024',
                '05/26/2024',
                '05/27/2024',
                '05/28/2024',
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
            subheader={`Tổng: ${new Intl.NumberFormat(['ban', 'id']).format([324000, 267000, 1674000, 965000, 2657000, 542000, 364000, 2142000, 455000, 123000, 913000].reduce((a, b) => a + b, 0))} đ`}
            chart={{
              labels: [
                '05/18/2024',
                '05/19/2024',
                '05/20/2024',
                '05/21/2024',
                '05/22/2024',
                '05/23/2024',
                '05/24/2024',
                '05/25/2024',
                '05/26/2024',
                '05/27/2024',
                '05/28/2024',
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
            subheader={`Tổng: ${new Intl.NumberFormat(['ban', 'id']).format([241000, 845000, 646000, 956000, 244000, 865000, 353000, 217000, 542000, 141000, 152000].reduce((a, b) => a + b, 0))} đ`}
            chart={{
              labels: [
                '05/18/2024',
                '05/19/2024',
                '05/20/2024',
                '05/21/2024',
                '05/22/2024',
                '05/23/2024',
                '05/24/2024',
                '05/25/2024',
                '05/26/2024',
                '05/27/2024',
                '05/28/2024',
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
      </Grid>
    </Container>
  );
}
