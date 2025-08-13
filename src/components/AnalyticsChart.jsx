import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const lineData = [
  { name: 'Jan', profit: 120 },
  { name: 'Feb', profit: 200 },
  { name: 'Mar', profit: -50 },
  { name: 'Apr', profit: 300 },
  { name: 'May', profit: 150 },
  { name: 'Jun', profit: 400 },
];

const barData = [
  { category: 'Crypto', wins: 12, losses: 5 },
  { category: 'Sports', wins: 8, losses: 7 },
  { category: 'Politics', wins: 6, losses: 3 },
];

const pieData = [
  { name: 'Wins', value: 65, color: '#10B981' },
  { name: 'Losses', value: 35, color: '#EF4444' },
];

export function AnalyticsChart({ variant = 'line', data }) {
  const chartData = variant === 'line' ? lineData : variant === 'bar' ? barData : pieData;

  if (variant === 'line') {
    return (
      <div className="bg-surface rounded-lg shadow-card p-4">
        <h3 className="text-lg font-bold text-textPrimary mb-4">Profit Over Time</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="profit" stroke="hsl(240, 80%, 50%)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (variant === 'bar') {
    return (
      <div className="bg-surface rounded-lg shadow-card p-4">
        <h3 className="text-lg font-bold text-textPrimary mb-4">Performance by Category</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="wins" fill="#10B981" />
            <Bar dataKey="losses" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg shadow-card p-4">
      <h3 className="text-lg font-bold text-textPrimary mb-4">Win Rate</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center space-x-4 mt-4">
        {chartData.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm text-textSecondary">{entry.name}: {entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}