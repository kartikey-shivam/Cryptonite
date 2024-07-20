import React from "react";
import { FC } from "react";
interface TCC {
    className?:string,
    text?:string
    url?:string
    Icon?:any
    IconClass? :string
}
 const TableContentCell:FC<TCC>=({className,text,url,Icon,IconClass})=>{
    return (<div className={`w-1/4 text-md flex space-x-1 items-center ${className} `}>
            {Icon && <Icon className={`${IconClass}`} />}
            {url && <div className="w-5 h-5"><img src={url} className="w-full h-full" /></div>}
            <span className="truncate overflow-hidden">{text}</span>
    </div>);
}
export default TableContentCell;
