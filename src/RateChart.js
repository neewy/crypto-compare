import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const data = [
    { name: 'Page A', uv: 4000, amt: 2400 },
    { name: 'Page B', uv: 3000, amt: 2210 },
    { name: 'Page C', uv: 2000, amt: 2290 },
    { name: 'Page D', uv: 2780, amt: 2000 },
    { name: 'Page E', uv: 1890, amt: 2181 },
    { name: 'Page F', uv: 2390, amt: 2500 },
    { name: 'Page G', uv: 3490, amt: 2100 },
];

class RateChart extends Component {
    render() {
        return (
            <LineChart width={900} height={300} data={data}
                margin={{ top: 5, right: 30, left: 20, ottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        );
    }
}

export default RateChart;