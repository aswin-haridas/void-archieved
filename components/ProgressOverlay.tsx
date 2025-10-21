"use client";

import { useEffect, useState } from "react";

const ProgressOverlay = () => {
  const [p, setP] = useState({ day: 0, month: 0, year: 0 });

  useEffect(() => {
    const calc = () => {
      const n = Date.now();
      const d = new Date(n);
      const y = d.getFullYear();
      const m = d.getMonth();
      const dt = d.getDate();

      const ds = +new Date(y, m, dt);
      const ms = +new Date(y, m, 1);
      const ys = +new Date(y, 0, 1);

      setP({
        day: Math.round(((n - ds) / 864e5) * 1e4) / 100,
        month:
          Math.round(((n - ms) / (+new Date(y, m + 1, 1) - ms)) * 1e4) / 100,
        year:
          Math.round(((n - ys) / (+new Date(y + 1, 0, 1) - ys)) * 1e4) / 100,
      });
    };
    calc();
    const i = setInterval(calc, 6e4);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="progress-overlay">
      <div className="progress-item">
        <span className="progress-label">Day</span>
        <span className="progress-value">{p.day.toFixed(1)}%</span>
      </div>
      <div className="progress-item">
        <span className="progress-label">Month</span>
        <span className="progress-value">{p.month.toFixed(1)}%</span>
      </div>
      <div className="progress-item">
        <span className="progress-label">Year</span>
        <span className="progress-value">{p.year.toFixed(1)}%</span>
      </div>
    </div>
  );
};

export default ProgressOverlay;
