import React from "react";
import { FC } from "react";
interface THC {
    text:string,
    className?:string
}
const TableHeaderCell:FC<THC>=({text,className})=>{
    return (<div className={`w-1/4 text-xs font-normal text-black dark:text-white ${className}`}>
        {text}
    </div>);
}
export default TableHeaderCell;