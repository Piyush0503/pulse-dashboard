"use client";

import { useState, useEffect } from "react";
import { fmtTime, fmtDate } from "@/lib/utils";

export function useClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(fmtTime());
      setDate(fmtDate());
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return { time, date };
}
