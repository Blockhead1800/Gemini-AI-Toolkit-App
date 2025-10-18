
import React from 'react';
import type { PatientProfile } from '../types';

interface PatientInfoProps {
  profile: PatientProfile;
}

const InfoRow: React.FC<{ label: string; value: string | number | string[] }> = ({ label, value }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-slate-400">{label}</dt>
    <dd className="mt-1 text-sm text-slate-200 sm:mt-0 sm:col-span-2">
      {Array.isArray(value) ? value.join(', ') || 'N/A' : value}
    </dd>
  </div>
);

export const PatientInfo: React.FC<PatientInfoProps> = ({ profile }) => {
  return (
    <div className="bg-slate-800/50 shadow-lg rounded-lg overflow-hidden border border-slate-700">
      <div className="px-4 py-4 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-white">Patient Chart</h3>
        <p className="mt-1 max-w-2xl text-sm text-slate-400">Initial patient details.</p>
      </div>
      <div className="border-t border-slate-700 px-4 py-4 sm:px-6">
        <dl className="divide-y divide-slate-700">
          <InfoRow label="Age" value={profile.age} />
          <InfoRow label="Sex" value={profile.sex} />
          <InfoRow label="Height" value={profile.height} />
          <InfoRow label="Weight" value={profile.weight} />
          <InfoRow label="Past Medications" value={profile.pastMedications} />
          <InfoRow label="Past Medical History" value={profile.pastMedicalHistory} />
        </dl>
      </div>
    </div>
  );
};
