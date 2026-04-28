import type { Patient } from '../store/usePatientStore';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    age: 42,
    gender: 'Male',
    status: 'Active',
    lastVisit: '2026-03-25',
    condition: 'Diabetes Checkup',
    email: 'rajesh.kumar@email.in',
    phone: '+91 98765 43210'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    age: 29,
    gender: 'Female',
    status: 'Critical',
    lastVisit: '2026-03-28',
    condition: 'Cardiac Care',
    email: 'priya.sharma@health.in',
    phone: '+91 87654 32109'
  },
  {
    id: '3',
    name: 'Arjun Singh',
    age: 35,
    gender: 'Male',
    status: 'Recovered',
    lastVisit: '2026-03-20',
    condition: 'Orthopedic Therapy',
    email: 'arjun.singh@gmail.com',
    phone: '+91 76543 21098'
  },
  {
    id: '4',
    name: 'Anjali Desai',
    age: 51,
    gender: 'Female',
    status: 'Active',
    lastVisit: '2026-03-27',
    condition: 'Hypertension',
    email: 'anjali.desai@outlook.in',
    phone: '+91 99887 76655'
  },
  {
    id: '5',
    name: 'Vikram Mehta',
    age: 64,
    gender: 'Male',
    status: 'Recovered',
    lastVisit: '2026-03-15',
    condition: 'Post-COVID Recovery',
    email: 'vikram.mehta@yahoo.in',
    phone: '+91 88776 65544'
  },
  {
    id: '6',
    name: 'Sunita Reddy',
    age: 24,
    gender: 'Female',
    status: 'Active',
    lastVisit: '2026-03-28',
    condition: 'Dermatology Consultation',
    email: 'sunita.reddy@gmail.com',
    phone: '+91 77665 54433'
  }
];
