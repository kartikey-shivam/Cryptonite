import React, { FC } from "react";
interface TH {
    children:React.ReactNode
}
 const TableHeader:FC<TH>=({children})=>{
    return (<div className="border-b-[1px] border-black dark:border-white w-full flex justify-between">
        {children}
    </div>);
}
export default TableHeader;
