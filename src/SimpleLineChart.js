import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import axios from 'axios';

/* const data = [
  { name: 'Mon', Visits: 1600, Orders: 6300 },
  { name: 'Tue', Visits: 3170, Orders: 4798 },
  { name: 'Wed', Visits: 4890, Orders: 2900 },
  { name: 'Thu', Visits: 6270, Orders: 5308 },
  { name: 'Fri', Visits: 3840, Orders: 3500 },
  { name: 'Sat', Visits: 7110, Orders: 8300 },
  { name: 'Sun', Visits: 3760, Orders: 3400 },
];*/

const data = [];
getData();

function getData() {
  axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(res => {
    const contentData = res.data;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    for(let i = 0; i < days.length; i++){
      let id = contentData[i].id;
      data.push({ name: days[i], Visits: Math.random() * Math.floor(((id + (30 % id)) * 1000 - id^2)),
        Orders: Math.random() * (id * 1300 - id * 200) + id^3});
    }
  });
}

function SimpleLineChart() {
  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={320}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Visits" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Orders" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;
