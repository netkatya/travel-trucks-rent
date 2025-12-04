import { useState } from "react";
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  startOfDay,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface CustomCalendarProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

export default function CustomCalendar({
  value,
  onChange,
}: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(value || new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const today = startOfDay(new Date());

  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day;
      const isDisabled = day < today;

      days.push(
        <div
          key={day.toString()}
          className={`cursor-pointer flex items-center justify-center font-normal text-sm leading-[120%] text-center
            ${
              isSameDay(day, value || new Date(0))
                ? "bg-(--text) rounded-4xl w-9 h-8"
                : !isSameMonth(day, monthStart)
                ? "text-gray-300 opacity-50"
                : "hover:border border-(--text) w-9 h-8 rounded-4xl"
            }
            ${
              isDisabled && !isSameDay(day, value || new Date(0))
                ? "opacity-50 cursor-not-allowed"
                : ""
            }
          `}
          onClick={() => !isDisabled && onChange(cloneDay)}
        >
          {format(day, "d")}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day.toString()} className="grid grid-cols-7 gap-1 mb-1">
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="p-3 relative w-[276px]">
      <Image
        src="/img/Calendar.png"
        alt="calendar"
        width={276}
        height={284}
        className="absolute top-0 left-0 w-full h-full"
      />

      <div className="relative z-10 p-3">
        <div className="flex justify-between items-center mb-3">
          <button
            type="button"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeft />
          </button>
          <span className="font-semibold text-base leading-[120%] text-center">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <button
            type="button"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-8 font-semibold text-xs leading-[120%] text-center text-(--text)">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {rows}
      </div>
    </div>
  );
}
