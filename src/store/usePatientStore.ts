import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  status: 'Active' | 'Recovered' | 'Critical';
  lastVisit: string;
  condition: string;
  email: string;
  phone: string;
}

interface PatientState {
  patients: Patient[];
  loading: boolean;
  searchQuery: string;
  statusFilter: string;
  setPatients: (patients: Patient[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (filter: string) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
}

export const usePatientStore = create<PatientState>()(
  persist(
    (set) => ({
      patients: [],
      loading: false,
      searchQuery: '',
      statusFilter: 'All',
      setPatients: (patients) => set({ patients }),
      setLoading: (loading) => set({ loading }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setStatusFilter: (statusFilter) => set({ statusFilter }),
      addPatient: (patient) => set((state) => ({ patients: [patient, ...state.patients] })),
      updatePatient: (id, updatedPatient) => set((state) => ({
        patients: state.patients.map((p) => p.id === id ? { ...p, ...updatedPatient } : p)
      })),
      deletePatient: (id) => set((state) => ({
        patients: state.patients.filter((p) => p.id !== id)
      })),
    }),
    {
      name: 'patient-storage-v3', 
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ patients: state.patients }),
    }
  )
);
