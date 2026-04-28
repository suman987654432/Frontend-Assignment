import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase.ts';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Plus, HeartPulse } from 'lucide-react';
import { toast } from 'sonner';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      toast.success('Welcome back to HealthCore');
      navigate('/');
    } catch (err: any) {
      const message = err.message || 'Failed to login. Please check your credentials.';
      setError(message);
      toast.error('Login Failed', { description: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-6 shadow-xl shadow-primary-500/20">
            <HeartPulse className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">HealthCore</h1>
          <p className="text-slate-500 mt-2">B2B Healthcare Management System</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="admin@healthcore.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <div className="p-3 bg-healthcare-50 border border-healthcare-100 rounded-lg">
                <p className="text-sm text-healthcare-600 font-medium">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full h-12" loading={loading}>
              Sign In to Dashboard
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Demo Credentials</p>
              <div className="space-y-1">
                <p className="text-xs text-slate-600 flex justify-between">
                  <span>Email:</span>
                  <span className="font-bold text-slate-900">admin@healthcore.com</span>
                </p>
                <p className="text-xs text-slate-600 flex justify-between">
                  <span>Password:</span>
                  <span className="font-bold text-slate-900">12345678</span>
                </p>
              </div>
            </div>
           
          </div>
        </div>
        
        <p className="text-center mt-10 text-xs text-slate-400">
          &copy; 2026 HealthCore. All rights reserved.
        </p>
      </div>
    </div>
  );
}
