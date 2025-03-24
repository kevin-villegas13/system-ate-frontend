import { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-8 p-8">{children}</div>;
}
