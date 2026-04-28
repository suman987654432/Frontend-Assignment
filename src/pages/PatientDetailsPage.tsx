import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  FileText, 
  Activity, 
  Heart,
  Droplet
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { usePatientStore } from '../store/usePatientStore';

export function PatientDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patients = usePatientStore((state) => state.patients);
  const patient = patients.find(p => p.id === id);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-bold text-slate-900">Patient Not Found</h2>
        <p className="text-slate-500 mt-2">The record you are looking for might have been deleted.</p>
        <Button className="mt-6" onClick={() => navigate('/patients')}>Back to Patients</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/patients')}
        className="gap-2 -ml-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Patients
      </Button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Card */}
        <div className="lg:w-1/3 space-y-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-3xl mx-auto mb-4">
                {patient.name[0]}
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{patient.name}</h2>
              <p className="text-slate-500">ID: PAT-{patient.id}092</p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-3 bg-slate-50 rounded-xl text-center">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Age</p>
                  <p className="text-lg font-bold text-slate-900">{patient.age}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl text-center">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Gender</p>
                  <p className="text-lg font-bold text-slate-900">{patient.gender}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Vitals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-healthcare-50 rounded-lg">
                    <Heart className="w-4 h-4 text-healthcare-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">Heart Rate</span>
                </div>
                <span className="font-bold text-slate-900">72 bpm</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">Blood Pressure</span>
                </div>
                <span className="font-bold text-slate-900">120/80</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Droplet className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">Blood Sugar</span>
                </div>
                <span className="font-bold text-slate-900">95 mg/dL</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details and History */}
        <div className="lg:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { date: 'Mar 15, 2024', event: 'Routine Checkup', doctor: 'Dr. Sarah Wilson' },
                  { date: 'Jan 10, 2024', event: 'Blood Test Results', doctor: 'Dr. Michael Chen' },
                  { date: 'Nov 22, 2023', event: 'Allergy Consultation', doctor: 'Dr. Emma Davis' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-primary-600 rounded-full" />
                      {i !== 2 && <div className="w-px h-12 bg-slate-200" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.event}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          10:30 AM
                        </div>
                        <span className="text-xs font-medium text-primary-600">{item.doctor}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-400" />
                  Current Prescriptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">Amoxicillin</span>
                    <span className="text-slate-500">500mg, 2x daily</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">Lisinopril</span>
                    <span className="text-slate-500">10mg, 1x daily</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-primary-50 rounded-lg border border-primary-100 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm font-bold text-primary-900">April 05, 2024</p>
                    <p className="text-xs text-primary-700">Follow-up Consultation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
