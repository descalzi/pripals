import { Box, Typography } from '@mui/material';
import { LineChart, Line, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { PointHistoryEntry } from '../types';

interface PointHistoryChartProps {
  history: PointHistoryEntry[];
}

const PointHistoryChart = ({ history }: PointHistoryChartProps) => {
  if (history.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography variant="body2" color="text.secondary">
          No point history yet
        </Typography>
      </Box>
    );
  }

  // Transform data for Recharts
  const chartData = history.map((entry, index) => ({
    index,
    totalPoints: entry.totalPoints,
    change: entry.points,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: 1.5,
            borderRadius: 1,
            boxShadow: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="body2" fontWeight="bold">
            {data.totalPoints} points
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: data.change >= 0 ? 'success.main' : 'error.main',
            }}
          >
            {data.change >= 0 ? '+' : ''}{data.change}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
        Point History (Last {history.length} changes)
      </Typography>
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="totalPoints"
            stroke="#58CC02"
            strokeWidth={3}
            dot={{ fill: '#58CC02', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PointHistoryChart;
