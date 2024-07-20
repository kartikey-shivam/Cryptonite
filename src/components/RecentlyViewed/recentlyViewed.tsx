import { FC } from "react";
import { TableContent } from "../Table/tableContent";
import coinsData from "../../coins.json";
import { LuArrowUpSquare } from "react-icons/lu";
import React from "react";
import TableHeader from "../Table/tableHeader";
import TableHeaderCell from "../Table/tableHeaderCell";
import TableContentCell from "../Table/tableContentCell";
interface RV {

}
export const RecentlyViewed:FC<RV>=()=>{
    return (
        <div className=" w-full h-fit shadow-box py-2 px-3 overflow-auto">
        <div className="flex justify-between items-center">
            <span className="font-semibold dark:text-white">Recently Viewed</span>
            <span className="font-semibold text-blue-300 text-sm">View more coins</span>
        </div>
        <div className="w-full mt-[10px]">
                <TableHeader >
                   <TableHeaderCell text="Token" />
                   <TableHeaderCell text="Last Price" />
                   <TableHeaderCell text="24H Change" />
                   <TableHeaderCell text="Market Cap" />
                </TableHeader> 
                {coinsData.map((coin:any,index:number)=>{
                    return (
                        <div className="w-full flex justify-between items-center p-2 cursor-grab coinList dark:text-white">
                        {index<5 && <TableContent key={index} >
                                <TableContentCell className="font-semibold" url={coin.image} text={coin.name} />
                                <TableContentCell className="font-normal text-sm" text={`$${coin.current_price}`} />
                                <TableContentCell
                                    className={`font-semibold ${
                                    coin.price_change_percentage_24h < 0 ? "text-red-600 dark:text-red-500 " : "text-green-600 dark:text-green-500"
                                    } text-sm truncate`}
                                    IconClass={`${coin.price_change_percentage_24h < 0 ? "rotate-180" : ""}`}
                                    Icon={LuArrowUpSquare}
                                    text={`${coin.price_change_percentage_24h.toFixed(3)}%`}
                                />
                                <TableContentCell className="font-normal text-sm truncate" text={`$${coin.market_cap}`} />
                        </TableContent>}
                        </div>
                    );
                })}
                
               
        </div>
    </div>
    );
}
export default RecentlyViewed;