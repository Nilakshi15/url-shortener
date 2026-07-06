import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import './ClickChart.css';

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="click-chart__tooltip">
      <p className="click-chart__tooltip-date">{formatDate(label)}</p>
      <p className="click-chart__tooltip-value">
        <span>{payload[0].value}</span>
        {payload[0].value === 1 ? ' click' : ' clicks'}
      </p>
    </div>
  );
}

/**
 * Props:
 *   data — [{ date: "YYYY-MM-DD", clicks: number }]
 */
export default function ClickChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="click-chart click-chart--empty">
        <p>No click data yet. Share the link to start tracking!</p>
      </div>
    );
  }

  // Ensure data is sorted ascending by date
  const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="click-chart">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={sorted} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fill: '#4B5A6E', fontSize: 11, fontFamily: 'Inter' }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: '#4B5A6E', fontSize: 11, fontFamily: 'Inter' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(99,102,241,0.2)', strokeWidth: 1 }} />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#6366F1"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: '#6366F1', stroke: 'rgba(99,102,241,0.3)', strokeWidth: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
