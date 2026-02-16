"use client";

import { useEffect, useMemo, useState } from "react";

export function Countdown({ closesAt }: { closesAt: string | Date }) {
  const target = useMemo(() => new Date(closesAt).getTime(), [closesAt]);
  const [seconds, setSeconds] = useState(() => Math.max(0, Math.ceil((target - Date.now()) / 1000)));

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(Math.max(0, Math.ceil((target - Date.now()) / 1000)));
    }, 250);
    return () => clearInterval(timer);
  }, [target]);

  return <span className="font-mono text-3xl">{seconds}s</span>;
}
