'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/types';

interface EditProfileModalProps {
  initial: UserProfile;
  onSave: (profile: UserProfile) => void;
  onClose: () => void;
}

export default function EditProfileModal({ initial, onSave, onClose }: EditProfileModalProps) {
  const [form, setForm] = useState<UserProfile>(initial);

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  const handleChange = (key: keyof UserProfile, value: string | number) => {
    setForm(prev => ({ ...prev, [key]: value as any }));
  };

  const handleSubmit = () => {
    const sanitized: UserProfile = {
      ...form,
      age: Math.max(0, Number(form.age || 0)),
      yearsExperience: Math.max(0, Number(form.yearsExperience || 0)),
      netWorth: Math.max(0, Number(form.netWorth || 0)),
      salary: Math.max(0, Number(form.salary || 0)),
      name: (form.name || 'User').trim(),
      path: (form.path || '').trim(),
      company: (form.company || '').trim(),
      browseMarket: (form.browseMarket || 'NYSE, NASDAQ').trim(),
    };
    onSave(sanitized);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/50 rounded-xl p-5 w-full max-w-lg shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-4">Edit Profile</h2>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <label className="text-gray-300">Name</label>
            <input className="mt-1 w-full bg-gray-800/80 border border-gray-700/50 rounded-lg px-3 py-2 text-white" value={form.name}
              onChange={e => handleChange('name', e.target.value)} />
          </div>
          <div>
            <label className="text-gray-300">Company</label>
            <input className="mt-1 w-full bg-gray-800/80 border border-gray-700/50 rounded-lg px-3 py-2 text-white" value={form.company}
              onChange={e => handleChange('company', e.target.value)} />
          </div>
          <div>
            <label className="text-gray-300">Path</label>
            <input className="mt-1 w-full bg-gray-800/80 border border-gray-700/50 rounded-lg px-3 py-2 text-white" value={form.path}
              onChange={e => handleChange('path', e.target.value)} />
          </div>
          <div>
            <label className="text-gray-300">Browse Market</label>
            <input className="mt-1 w-full bg-gray-800/80 border border-gray-700/50 rounded-lg px-3 py-2 text-white" value={form.browseMarket}
              onChange={e => handleChange('browseMarket', e.target.value)} />
          </div>
          <div>
            <label className="text-gray-300">Age</label>
            <input type="number" min={0} className="mt-1 w-full bg-gray-800/80 border border-gray-700/50 rounded-lg px-3 py-2 text-white" value={form.age ?? 0}
              onChange={e => handleChange('age', Number(e.target.value))} />
          </div>
          <div>
            <label className="text-gray-300">Years Experience</label>
            <input type="number" step="0.1" min={0} className="mt-1 w-full bg-gray-800/80 border border-gray-700/50 rounded-lg px-3 py-2 text-white" value={form.yearsExperience ?? 0}
              onChange={e => handleChange('yearsExperience', Number(e.target.value))} />
          </div>
          <div>
            <label className="text-gray-300">Net Worth ($)</label>
            <input type="number" min={0} className="mt-1 w-full bg-gray-800/80 border border-gray-700/50 rounded-lg px-3 py-2 text-white" value={form.netWorth ?? 0}
              onChange={e => handleChange('netWorth', Number(e.target.value))} />
          </div>
          <div>
            <label className="text-gray-300">Salary ($)</label>
            <input type="number" min={0} className="mt-1 w-full bg-gray-800/80 border border-gray-700/50 rounded-lg px-3 py-2 text-white" value={form.salary ?? 0}
              onChange={e => handleChange('salary', Number(e.target.value))} />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-600 text-gray-200 bg-gray-800/60 hover:bg-gray-800">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white border border-green-500/30">Save</button>
        </div>
      </div>
    </div>
  );
}
