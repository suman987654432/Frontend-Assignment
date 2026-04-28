import { 
  Users, 
  UserPlus, 
  Calendar, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePatientStore } from '../store/usePatientStore';

const data = [
  { name: 'Mon', visits: 400 },
  { name: 'Tue', visits: 300 },
  { name: 'Wed', visits: 200 },
  { name: 'Thu', visits: 278 },
  { name: 'Fri', visits: 189 },
  { name: 'Sat', visits: 239 },
  { name: 'Sun', visits: 349 },
];

export function DashboardPage() {
  const { patients } = usePatientStore();
  
  const activeCases = patients.filter(p => p.status === 'Active').length;
  const recoveredCases = patients.filter(p => p.status === 'Recovered').length;
  const criticalCases = patients.filter(p => p.status === 'Critical').length;

  const stats = [
    { label: 'Total Patients', value: patients.length.toString(), icon: Users, trend: '+12%', positive: true, delay: 'delay-0' },
    { label: 'Active Cases', value: activeCases.toString(), icon: Activity, trend: '+3%', positive: true, delay: 'delay-75' },
    { label: 'Recovered', value: recoveredCases.toString(), icon: Calendar, trend: '+8%', positive: true, delay: 'delay-150' },
    { label: 'Critical', value: criticalCases.toString(), icon: UserPlus, trend: '-2%', positive: false, delay: 'delay-200' },
  ];

  const recentPatients = patients.slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">HealthCore Dashboard</h1>
          <p className="text-slate-500 mt-1">Real-time overview of your clinic's patient status.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-2 fill-mode-both ${stat.delay}`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-primary-50 transition-colors">
                  <stat.icon className="w-6 h-6 text-primary-600 group-hover:scale-110 transition-transform" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.positive ? 'text-green-600' : 'text-healthcare-600'
                }`}>
                  {stat.trend}
                  {stat.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 animate-in fade-in slide-in-from-bottom-4 delay-300 fill-mode-both">
          <CardHeader>
            <CardTitle>Patient Visits Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  hide={window.innerWidth < 640}
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area 
                  animationDuration={1500}
                  type="monotone" 
                  dataKey="visits" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorVisits)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="animate-in fade-in slide-in-from-bottom-4 delay-500 fill-mode-both">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentPatients.map((patient, i) => {
                const activities = [
                  'New registration',
                  'Vitals update',
                  'Consultation',
                  'Lab report sync'
                ];
                const times = ['15m ago', '1h ago', '3h ago', 'Yesterday'];
                
                return (
                  <div key={patient.id} className="flex gap-4 group cursor-default animate-in fade-in slide-in-from-left-2 delay-700">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary-50 transition-colors">
                        <Users className="w-5 h-5 text-slate-500 group-hover:text-primary-600 transition-colors" />
                      </div>
                      {i !== recentPatients.length - 1 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-6 bg-slate-100" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 group-hover:text-primary-600 transition-colors leading-tight">
                        {activities[i % activities.length]}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        <span className="font-bold text-slate-700">{patient.name}</span> • {times[i % times.length]}
                      </p>
                    </div>
                  </div>
                );
              })}
              
              {recentPatients.length === 0 && (
                <div className="py-10 text-center text-slate-400">
                  No recent activity found.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
