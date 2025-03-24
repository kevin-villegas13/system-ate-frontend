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

// <Button
//   onClick={onButtonClick}
//   className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
// >
//   {Icon && <Icon className="w-6 h-6" />}
//   {buttonText}
// </Button>
