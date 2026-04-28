import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const monthlyData = [
  { month: 'Jan', patients: 65, revenue: 4000 },
  { month: 'Feb', patients: 59, revenue: 3000 },
  { month: 'Mar', patients: 80, revenue: 5000 },
  { month: 'Apr', patients: 81, revenue: 4500 },
  { month: 'May', patients: 56, revenue: 3500 },
  { month: 'Jun', patients: 55, revenue: 3200 },
];

const patientDistribution = [
  { name: 'Pediatrics', value: 400 },
  { name: 'Cardiology', value: 300 },
  { name: 'Orthopedics', value: 300 },
  { name: 'General', value: 200 },
];

const COLORS = ['#0ea5e9', '#6366f1', '#f05252', '#22c55e'];

export function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Health Analytics</h1>
        <p className="text-slate-500">Key performance indicators and patient statistics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient Growth & Revenue</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="patients" 
                  stroke="#0ea5e9" 
                  strokeWidth={3} 
                  dot={{ fill: '#0ea5e9', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  dot={{ fill: '#6366f1', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip cursor={false} />
                <Bar dataKey="patients" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={patientDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {patientDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
                <p className="text-sm font-semibold text-primary-700 uppercase tracking-wider mb-1">Growth</p>
                <p className="text-slate-700">Patient admissions increased by <span className="font-bold">12%</span> this month compared to the last quarter.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <p className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-1">Efficiency</p>
                <p className="text-slate-700">Average consultation time has decreased by <span className="font-bold">5 mins</span> per patient.</p>
              </div>
              <div className="p-4 bg-healthcare-50 rounded-lg border border-healthcare-100">
                <p className="text-sm font-semibold text-healthcare-700 uppercase tracking-wider mb-1">Critical Alert</p>
                <p className="text-slate-700">Cardiology department is reaching <span className="font-bold">95%</span> capacity.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
