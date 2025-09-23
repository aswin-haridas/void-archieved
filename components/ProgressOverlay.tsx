'use client';

import { useEffect, useState } from 'react';

interface ProgressData {
  day: number;
  month: number;
  year: number;
}

const ProgressOverlay = () => {
  const [progress, setProgress] = useState<ProgressData>({ day: 0, month: 0, year: 0 });

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();

      // Day progress (0-100%)
      const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const dayProgress =
        ((now.getTime() - dayStart.getTime()) / (dayEnd.getTime() - dayStart.getTime())) * 100;

      // Month progress (0-100%)
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const monthProgress =
        ((now.getTime() - monthStart.getTime()) / (monthEnd.getTime() - monthStart.getTime())) *
        100;

      // Year progress (0-100%)
      const yearStart = new Date(now.getFullYear(), 0, 1);
      const yearEnd = new Date(now.getFullYear() + 1, 0, 1);
      const yearProgress =
        ((now.getTime() - yearStart.getTime()) / (yearEnd.getTime() - yearStart.getTime())) * 100;

      setProgress({
        day: Math.round(dayProgress * 100) / 100,
        month: Math.round(monthProgress * 100) / 100,
        year: Math.round(yearProgress * 100) / 100,
      });
    };

    // Calculate initially
    calculateProgress();

    // Update every minute
    const interval = setInterval(calculateProgress, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="progress-overlay">
      <div className="progress-item">
        <span className="progress-label">Day</span>
        <span className="progress-value">{progress.day.toFixed(1)}%</span>
      </div>
      <div className="progress-item">
        <span className="progress-label">Month</span>
        <span className="progress-value">{progress.month.toFixed(1)}%</span>
      </div>
      <div className="progress-item">
        <span className="progress-label">Year</span>
        <span className="progress-value">{progress.year.toFixed(1)}%</span>
      </div>
    </div>
  );
};

export default ProgressOverlay;
