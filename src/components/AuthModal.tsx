import React, { useState } from 'react';
import { 
  X, 
  User, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<UserRole>('USER');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isSignUp && !name)) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    const demoUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: name || (email.split('@')[0] || 'Community Citizen'),
      email: email,
      role: role,
      preferredLanguage: 'en',
      bookmarkedDiseaseIds: ['dengue', 'malaria'],
      savedAssessmentsCount: 2
    };

    onLoginSuccess(demoUser);
    onClose();
  };

  const handleQuickDemoLogin = (selectedRole: UserRole) => {
    if (selectedRole === 'ADMIN') {
      onLoginSuccess({
        id: 'admin-101',
        name: 'Dr. Anita Sharma (Nodal Officer)',
        email: 'anita.sharma@health.gov.in',
        role: 'ADMIN',
        preferredLanguage: 'en',
        bookmarkedDiseaseIds: ['dengue', 'tuberculosis', 'cholera'],
        savedAssessmentsCount: 14
      });
    } else {
      onLoginSuccess({
        id: 'user-202',
        name: 'Rahul Verma (Citizen)',
        email: 'rahul.verma@example.com',
        role: 'USER',
        preferredLanguage: 'hi',
        bookmarkedDiseaseIds: ['dengue'],
        savedAssessmentsCount: 3
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8" id="auth-modal-content">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-tr from-slate-900 via-teal-950 to-slate-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Close auth modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wide">
              SwasthyaVani Authentication
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-white">
            {isSignUp ? 'Create Citizen Account' : 'Welcome to SwasthyaVani'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {isSignUp 
              ? 'Join the public health awareness network to save triage reports and customize regional advisories.' 
              : 'Sign in to access personalized disease trackers, saved assessments, and administrative tools.'}
          </p>
        </div>

        {/* 1-Click Fast Demo Switcher */}
        <div className="px-6 pt-5 pb-2 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Fast 1-Click Evaluation Login</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              id="demo-user-login-btn"
              onClick={() => handleQuickDemoLogin('USER')}
              className="p-2.5 rounded-xl border border-teal-200 bg-white hover:bg-teal-50 text-left transition group shadow-xs"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-bold text-slate-900">Citizen / User</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">Symptom Checker & Chat</span>
            </button>

            <button
              type="button"
              id="demo-admin-login-btn"
              onClick={() => handleQuickDemoLogin('ADMIN')}
              className="p-2.5 rounded-xl border border-indigo-200 bg-white hover:bg-indigo-50 text-left transition group shadow-xs"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900">Health Admin</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">Outbreak & KB Manager</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {errorMsg}
            </div>
          )}

          {/* Role selector on SignUp */}
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Select Account Role
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('USER')}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    role === 'USER' 
                      ? 'border-teal-600 bg-teal-50 text-teal-800' 
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Citizen (Public)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('ADMIN')}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    role === 'ADMIN' 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-800' 
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Health Admin</span>
                </button>
              </div>
            </div>
          )}

          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Priya Patel"
                  className="w-full px-3.5 py-2.5 pl-10 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-hidden"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 pl-10 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-hidden"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 pl-10 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-hidden"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            id="auth-submit-btn"
            className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition shadow-md shadow-teal-600/20 flex items-center justify-center gap-2"
          >
            <span>{isSignUp ? 'Create My Account' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg('');
              }}
              className="text-xs text-teal-600 hover:text-teal-800 font-semibold"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account yet? Sign up"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
