import React from 'react';
import {
  ComposedChart, Line, XAxis, Tooltip, ReferenceLine, YAxis,
  Label
} from 'recharts';

const data = [
  { name: '52W Low', value: 10.81 },
  { name: 'Today Low', value: 16.52 },
  { name: 'Today High', value: 17.9},
  { name: '52W High', value: 48 },
];

const PerformanceChart = () => {
  return (
    <ComposedChart width={600} height={200} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 30 }}>
    <XAxis type="number" hide />
    <YAxis dataKey="name" type="category" scale="band" />
    <Tooltip />
    <ReferenceLine x={data[0].value} stroke="#8884d8" strokeDasharray="3 3">
      <Label value={`52W Low: ${data[0].value}`} position="insideLeft" fill="#8884d8" />
    </ReferenceLine>
    <ReferenceLine x={data[1].value} stroke="#82ca9d" strokeDasharray="3 3">
      <Label value={`Today's Low: ${data[1].value}`} position="insideLeft" fill="#82ca9d" />
    </ReferenceLine>
    <ReferenceLine x={data[2].value} stroke="#82ca9d" strokeDasharray="3 3">
    <Label value={`Today's High: ${data[2].value}`} position="insideRight" fill="#82ca9d" />
    </ReferenceLine>
    <ReferenceLine x={data[3].value} stroke="#8884d8" strokeDasharray="3 3">
    <Label value={`52W High: ${data[3].value}`} position="insideRight" fill="#8884d8" />
    </ReferenceLine>
    <Line dataKey="value" stroke="#8884d8" dot={false} />
  </ComposedChart>
);
}
export default PerformanceChart;