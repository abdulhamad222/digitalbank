'use client';

import {
  ChartCanvas,
  Chart,
  CandlestickSeries,
  XAxis,
  YAxis,
  discontinuousTimeScaleProviderBuilder,
} from 'react-financial-charts';
import { scaleTime } from 'd3-scale';
import { timeParse } from 'd3-time-format';
import { last } from 'lodash'; 
import { format } from 'date-fns';

const parseDate = timeParse('%Y-%m-%d');

export const CandlestickChart = ({ transactions }) => {
  const formattedData = transactions.slice(0, 20).map((t, i) => {
    const base = 100 + i * 5;
    return {
      date: new Date(t.date),
      open: base,
      high: base + 4,
      low: base - 3,
      close: t.type === 'deposit' ? base + 2 : base - 2,
    };
  });

  const scaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(d => d.date);
  const { data, xScale, xAccessor, displayXAccessor } = scaleProvider(formattedData);
  const start = xAccessor(last(data));
  const end = xAccessor(data[Math.max(0, data.length - 20)]);
  const xExtents = [start, end];

  return (
    <ChartCanvas
      height={300}
      width={1000}
      ratio={1}
      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
      data={data}
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xExtents={xExtents}
    >
      <Chart id={1} yExtents={d => [d.high, d.low]}>
        <XAxis />
        <YAxis />
        <CandlestickSeries />
      </Chart>
    </ChartCanvas>
  );
};
