import { Children, ReactNode } from "react";

export default function FiltersBar({ children }: { children: ReactNode[] }) {
  const items = Children.toArray(children);

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-4 p-6 rounded-xl bg-white shadow-sm">
      {items.map((child, index) => (
        <div
          key={index}
          className={`w-full ${index === 0 ? "sm:flex-1" : "sm:w-auto"}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
