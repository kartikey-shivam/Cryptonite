import React, { FC } from "react";

interface PillProps {
  text: string;
  active?: boolean;
  setActiveTag?: () => void;
}

const Pill: FC<PillProps> = ({ text, active, setActiveTag }) => {
  const handleClick = () => {
    if (setActiveTag) {
      setActiveTag();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`w-fit font-semibold dark:text-white cursor-pointer ${active ? "border-[1px] border-solid border-purple-400 text-purple-400 dark:text-purple-400" : ""} rounded-full py-[1px] px-2 text-xs`}
    >
      {text}
    </div>
  );
};

export default Pill;
