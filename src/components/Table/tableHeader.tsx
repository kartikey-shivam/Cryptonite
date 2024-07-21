import React, { FC } from "react";
interface TH {
    children:React.ReactNode
    className?:string
}
 const TableHeader:FC<TH>=({children,className})=>{
    return (<div className={` w-[20rem] md:w-full border-b-[1px] border-black dark:border-white w-full flex justify-between ${className}`}>
        {children}
    </div>);
}
export default TableHeader;
