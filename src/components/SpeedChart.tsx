import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

interface Location {
  latitude: number;
  longitude: number;
  timestamp: number;
  speed?: number;
  heading?: number;
}

interface SpeedChartProps {
  data: Location[];
}

const SpeedChart: React.FC<SpeedChartProps> = ({ data }) => {
  const chartData = data.map((location, index) => ({
    time: index,
    speed: location.speed ? Math.round(location.speed * 3.6) : 0, // Convert m/s to km/h
    timestamp: new Date(location.timestamp).toLocaleTimeString()
  }));

  if (chartData.length === 0) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Typography variant="body2" color="text.secondary">
          No speed data available
        </Typography>
      </Box>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="time" 
          tickFormatter={(value) => `${value}s`}
        />
        <YAxis 
          label={{ value: 'Speed (km/h)', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip 
          labelFormatter={(value) => `Time: ${chartData[value]?.timestamp || 'N/A'}`}
          formatter={(value: number) => [`${value} km/h`, 'Speed']}
        />
        <Line 
          type="monotone" 
          dataKey="speed" 
          stroke="#00bcd4" 
          strokeWidth={2}
          dot={{ fill: '#00bcd4', strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SpeedChart;
