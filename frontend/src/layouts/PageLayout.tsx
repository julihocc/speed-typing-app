import { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
  title: string;
};

export default function PageTemplate({ children, title }: PageLayoutProps) {
  return (
    <div className="w-full lg:w-xl">
      <div className="flex justify-center align-middle bg-secondary p-4 mb-4 font-mono font-semibold text-primary lg:text-5xl">
        {title}
      </div>

      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}
