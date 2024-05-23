import { BarList } from "./BarList";

const data = [
  { name: "/home", value: 843 },
  { name: "/imprint", value: 46 },
  { name: "/cancellation", value: 3 },
  { name: "/blocks", value: 108 },
  { name: "/documentation", value: 384 },
];

export const BarListExample = () => {
  return <BarList data={data} className="w-full h-96" />;
};
