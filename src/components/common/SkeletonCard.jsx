import React from 'react';

export const SkeletonDoctorCard = () => {
  return (
    <div className="glass-card rounded-3xl p-5 border border-[var(--border)] shadow-lg space-y-4 bg-[var(--bg-card)]">
      <div className="w-full h-48 rounded-2xl animate-shimmer" />
      <div className="space-y-2">
        <div className="h-5 w-3/4 rounded-md animate-shimmer" />
        <div className="h-4 w-1/2 rounded-md animate-shimmer" />
        <div className="h-3 w-2/3 rounded-md animate-shimmer" />
      </div>
      <div className="pt-2 border-t border-[var(--border)] space-y-2">
        <div className="h-3 w-4/5 rounded-md animate-shimmer" />
        <div className="h-3 w-1/2 rounded-md animate-shimmer" />
      </div>
      <div className="flex gap-2 pt-2">
        <div className="h-6 w-16 rounded-lg animate-shimmer" />
        <div className="h-6 w-20 rounded-lg animate-shimmer" />
      </div>
      <div className="pt-3 border-t border-[var(--border)] flex justify-between items-center">
        <div className="h-8 w-20 rounded-xl animate-shimmer" />
        <div className="h-9 w-24 rounded-xl animate-shimmer" />
      </div>
    </div>
  );
};

export const SkeletonMedicalRecordCard = () => {
  return (
    <div className="glass-card p-5 rounded-3xl border border-[var(--border)] shadow-md space-y-4 bg-[var(--bg-card)]">
      <div className="flex justify-between items-center">
        <div className="h-5 w-20 rounded-full animate-shimmer" />
        <div className="h-4 w-16 rounded-md animate-shimmer" />
      </div>
      <div className="h-6 w-3/4 rounded-md animate-shimmer" />
      <div className="h-4 w-1/2 rounded-md animate-shimmer" />
      <div className="h-10 w-full rounded-xl animate-shimmer" />
      <div className="pt-3 border-t border-[var(--border)] flex justify-between items-center">
        <div className="h-4 w-32 rounded-md animate-shimmer" />
        <div className="h-8 w-16 rounded-xl animate-shimmer" />
      </div>
    </div>
  );
};

export const SkeletonAppointmentRow = () => {
  return (
    <div className="glass-card p-5 rounded-3xl border border-[var(--border)] shadow-md flex justify-between items-center bg-[var(--bg-card)]">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-2xl animate-shimmer shrink-0" />
        <div className="space-y-2">
          <div className="h-5 w-40 rounded-md animate-shimmer" />
          <div className="h-3 w-32 rounded-md animate-shimmer" />
        </div>
      </div>
      <div className="h-8 w-28 rounded-xl animate-shimmer" />
    </div>
  );
};

export default SkeletonDoctorCard;
