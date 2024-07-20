import React, { FC } from "react";

interface TC {
  children?: React.ReactNode;
  key: number;
  setActiveList?: (props: number) => void;
}

export const TableContent: FC<TC> = ({ children, key, setActiveList }) => {
  console.log(key);

  const handleDragStart = () => {
    if (setActiveList) {
      setActiveList(key + 1);
    }
  };

  const handleDragEnd = () => {
    if (setActiveList) {
      setActiveList(0);
    }
  };

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="w-full h-fit flex justify-between items-center p-2 cursor-pointer"
    >
      {children}
    </div>
  );
};

export default TableContent;
