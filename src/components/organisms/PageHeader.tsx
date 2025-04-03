import { ReactNode } from "react";

export default function PageHeader({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <h1 className="text-4xl font-extrabold text-gray-900">{title}</h1>
      {children && <div>{children}</div>}
    </div>
  );
}