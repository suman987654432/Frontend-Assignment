import { useEffect, useState } from 'react';
import { 
  LayoutGrid, 
  List, 
  Search, 
  Phone, 
  Mail, 
  Calendar,
  Plus,
  ArrowRight,
  Edit,
  Trash2
} from 'lucide-react';
import { usePatientStore } from '../store/usePatientStore';
import type { Patient } from '../store/usePatientStore';
import { useUIStore } from '../store/useUIStore';
import { MOCK_PATIENTS } from '../utils/mockData';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/Table';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/Dialog";

export function PatientsPage() {
  const { 
    patients, 
    setPatients, 
    loading, 
    addPatient,
    updatePatient,
    deletePatient,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter
  } = usePatientStore();
  const { viewMode, setViewMode } = useUIStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'Male',
    condition: '',
    status: 'Active' as Patient['status']
  });

  useEffect(() => {
    // If patients is empty (which it will be after the storage reset), load MOCK_PATIENTS
    if (patients.length === 0) {
      setPatients(MOCK_PATIENTS);
    }
  }, [patients.length, setPatients]);

  const handleOpenModal = (patient?: Patient) => {
    if (patient) {
      setEditingPatient(patient);
      setFormData({
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        age: patient.age.toString(),
        gender: patient.gender,
        condition: patient.condition,
        status: patient.status
      });
    } else {
      setEditingPatient(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: 'Male',
        condition: '',
        status: 'Active'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPatient) {
      updatePatient(editingPatient.id, {
        ...formData,
        age: parseInt(formData.age) || 0
      });
      toast.success('Patient details updated successfully');
    } else {
      const patient: Patient = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        age: parseInt(formData.age) || 0,
        lastVisit: new Date().toISOString().split('T')[0],
      };
      addPatient(patient);
      toast.success('New patient registered successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deletePatient(id);
    toast.error('Patient record deleted');
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'Recovered': return 'text-green-600 bg-green-50 border-green-100';
      case 'Critical': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Patients Directory</h1>
          <p className="text-slate-500 mt-1">Manage and monitor patient records and statuses.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-white shadow-sm hover:bg-white' : ''}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-white shadow-sm hover:bg-white' : ''}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setPatients(MOCK_PATIENTS);
              toast.success('Data reset to Indian defaults');
            }}
            className="hidden sm:flex gap-2 text-slate-500 hover:text-slate-900"
          >
            Reset
          </Button>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 shadow-lg shadow-primary-600/20" onClick={() => handleOpenModal()}>
                <Plus className="w-4 h-4" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>{editingPatient ? 'Edit Patient' : 'Register New Patient'}</DialogTitle>
                  <DialogDescription>
                    {editingPatient ? 'Update the details of the patient.' : 'Enter the details of the new patient to add them to the system.'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      label="Full Name" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required 
                    />
                    <Input 
                      label="Age" 
                      type="number" 
                      placeholder="45" 
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      required 
                    />
                  </div>
                  <Input 
                    label="Email" 
                    type="email" 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                  <Input 
                    label="Phone" 
                    placeholder="+1 234 567 8900" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required 
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Condition</label>
                    <textarea 
                      className="w-full min-h-[80px] p-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 text-sm"
                      placeholder="Primary diagnosis or reason for visit..."
                      value={formData.condition}
                      onChange={(e) => setFormData({...formData, condition: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <select 
                        className="w-full h-10 px-3 rounded-md border border-slate-200 text-sm"
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                      >
                        <option value="Active">Active</option>
                        <option value="Recovered">Recovered</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Gender</label>
                      <select 
                        className="w-full h-10 px-3 rounded-md border border-slate-200 text-sm"
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button type="submit">{editingPatient ? 'Save Changes' : 'Register Patient'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            className="pl-10 h-11 border-slate-200 focus:border-slate-400 transition-all" 
            placeholder="Search by name, email or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Filter:</span>
          <select 
            className="h-11 px-4 rounded-md border border-slate-200 text-sm bg-white hover:border-slate-300 transition-colors cursor-pointer min-w-[140px]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Recovered">Recovered</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-slate-50 animate-pulse rounded-xl border border-slate-100" />
          ))}
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-2xl">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No patients found</h3>
          <p className="text-slate-500 mt-1">Try adjusting your search or filter criteria.</p>
          <Button variant="outline" className="mt-6" onClick={() => {setSearchQuery(''); setStatusFilter('All');}}>
            Clear all filters
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="group hover:border-primary-200 transition-all duration-300 relative overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-200">
                      {patient.name[0]}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900" onClick={(e) => { e.stopPropagation(); handleOpenModal(patient); }}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600" onClick={(e) => handleDelete(e, patient.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{patient.name}</h3>
                  <p className="text-sm text-slate-500 font-medium mb-6">{patient.condition}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-slate-400" />
                      </div>
                      {patient.email}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-slate-400" />
                      </div>
                      {patient.phone}
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 bg-slate-50/50 flex justify-between items-center border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    {patient.lastVisit}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-slate-900 font-bold gap-1 group-hover:gap-2 transition-all"
                    onClick={() => navigate(`/patients/${patient.id}`)}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden border-slate-200 shadow-xl shadow-slate-100">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-bold text-slate-900">Patient Details</TableHead>
                <TableHead className="font-bold text-slate-900">Status</TableHead>
                <TableHead className="font-bold text-slate-900">Age / Gender</TableHead>
                <TableHead className="font-bold text-slate-900">Condition</TableHead>
                <TableHead className="font-bold text-slate-900">Last Visit</TableHead>
                <TableHead className="font-bold text-slate-900 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="group cursor-pointer" onClick={() => navigate(`/patients/${patient.id}`)}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900 font-bold text-sm group-hover:bg-primary-600 group-hover:text-white transition-colors">
                        {patient.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{patient.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{patient.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-slate-900 font-semibold">{patient.age} years</span>
                      <span className="text-xs text-slate-500 font-medium">{patient.gender}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-slate-600 font-medium max-w-[200px] truncate">{patient.condition}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-slate-600 font-bold text-xs uppercase tracking-tight">{patient.lastVisit}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-slate-400 hover:text-slate-900" 
                        onClick={(e) => { e.stopPropagation(); handleOpenModal(patient); }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-slate-400 hover:text-red-600" 
                        onClick={(e) => handleDelete(e, patient.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
