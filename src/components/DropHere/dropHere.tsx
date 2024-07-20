"use client"
import { FC, useState } from "react";
import "./dropHere.css"
import React from "react";
interface DH{
    onDrop:()=>void
}
 const DropHere:FC<DH>=({onDrop})=>{
    const [showDrop,setShowDrop]=useState<boolean>(false)
    return (
        <div 
            onDragEnter={()=>setShowDrop(true)} 
            onDragLeave={()=>setShowDrop(false)} 
            onDrop={()=>{
                onDrop();
                setShowDrop(false);
            }}
            onDragOver={e=>e.preventDefault()}
            className={` ${showDrop?"drop-area":"hide-drop"}`}>Drop Here</div>
    );
}
export default DropHere;