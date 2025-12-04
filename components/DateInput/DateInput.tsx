import { useState, useRef, useEffect } from "react";

import { format } from "date-fns";
import CustomCalendar from "../Calendar/Calendar";

interface DateInputProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

export default function DateInput({ value, onChange }: DateInputProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <input
        type="text"
        readOnly
        value={value ? format(value, "dd MMMM yyyy") : ""}
        onClick={() => setOpen(!open)}
        placeholder="Booking date*"
        className="rounded-xl px-[18px] py-[18px] w-full h-[60px] bg-(--inputs) cursor-pointer"
      />

      {open && (
        <div className="absolute z-10 mt-1">
          <CustomCalendar
            value={value || new Date()}
            onChange={(date) => {
              onChange(date);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
