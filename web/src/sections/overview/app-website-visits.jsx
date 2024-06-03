/* eslint-disable */
import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function AppWebsiteVisits({ title, subheader, chart, height, ...other }) {
  const { labels, colors, series, options } = chart;
  const navigate = useNavigate();

  const [axisData, setAxisData] = useState();
  const [clickedLabel, setClickedLabel] = useState('');

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'category',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)}`;
          }
          return value;
        },
      },
    },
    ...options,
    chart: {
      events: {
        click: function(event, chartContext, config) {
          const dataPointIndex = config.dataPointIndex;
          const label = labels[dataPointIndex];
          setAxisData(config);
          setClickedLabel(label);
          navigate(`/order/date/${encodeURIComponent(label)}`);
        }
      }
    }
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={height}
        />
      </Box>
    </Card>
  );
}

AppWebsiteVisits.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
