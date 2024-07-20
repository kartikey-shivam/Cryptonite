"use client"
import { FC, FunctionComponent, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import dayjs from 'dayjs';  
import coinsData from "../coins.json";
import { LuArrowUpSquare } from "react-icons/lu";
import MarketCapChart from "../components/Charts/marketCapChart";
import TableHeader from "../components/Table/tableHeader";
import TableHeaderCell from "../components/Table/tableHeaderCell";
import TableContentCell from "../components/Table/tableContentCell";
import TableContent from "../components/Table/tableContent";
interface Main {

}
interface CT {

}

const Main:FC<Main>=()=>{
 
    return(<div className="p-4 space-y-8 rounded mt-4">
       <div className="border-[1px] border-solid rounded-xl px-1 py-4">
            <MarketCapChart />
       </div>
       <div>
       <div className=" w-full h-[55%] border-solid border-[1px] border-gray py-2 px-3 overflow-auto">
        <div className="flex justify-between items-center">
            <span className="font-semibold ">Trending</span>
            <span className="font-semibold text-blue-300 text-sm">View more coins</span>
        </div>
        <div className="w-full mt-[10px]">
                <TableHeader >
                   <TableHeaderCell className="w-[40%]" text="Token" />
                   <TableHeaderCell text="Symbol" />
                   <TableHeaderCell text="Last Price" />
                   <TableHeaderCell text="24H Change" />
                   <TableHeaderCell text="Market Cap" />
                </TableHeader> 
                {coinsData.map((coin:any,index:number)=>{
                    return (
                        <div>
                       {index<5 && <TableContent key={index} >
                                <TableContentCell className="font-semibold w-[40%] overflow-hidden" url={coin.image} text={coin.name} />
                                <TableContentCell className="" text={coin.symbol} />
                                <TableContentCell className="font-light text-sm" text={`$${coin.current_price}`} />
                                <TableContentCell className={`${coin.price_change_percentage_24h<0?"text-red-400":"text-green-400"}`} text={`${coin.price_change_percentage_24h}`}/>
                                <TableContentCell className="font-light text-sm truncate" text={`$${coin.market_cap}`}/>
                            </TableContent>}
                        </div>
                            
                    );
                })}
                
               
        </div>
    </div>
       </div>
    </div>);
}
export default Main;