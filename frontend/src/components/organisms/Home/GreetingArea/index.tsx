import type { FC } from "react";

type Props = {};

const HomeGreetingArea: FC<Props> = () => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-3xl font-extrabold">Hello!</h2>
      <p>Welcome to the portfolio site of K.Aoki</p>
    </div>
  );
};
export default HomeGreetingArea;
