"use client"
import { FC, useEffect, useState } from "react";
import TableHeader from "../components/Table/tableHeader";
import TableHeaderCell from "../components/Table/tableHeaderCell";
import TableContentCell from "../components/Table/tableContentCell";
import PriceCompareChart from "../components/Charts/priceCompareChart";
import axios from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
interface Main {
}
interface CT {

}

const Main:FC<Main>=({})=>{
    const [loading,setLoading]=useState<boolean>();
    const navigate = useNavigate()
    const [trendData,setTrendData]= useState<any>();
    const getTrendData = async ()=>{
        try {
            setLoading(true)
            const res= await axios.get('/search/trending');
            console.log(res.data.coins)
            setTrendData(res.data.coins)
            setLoading(false)
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                toast.error(`${error.message} : Your request exceeds the allowed time range.`);
                setLoading(false)
              } else {
                console.log('An unknown error occurred');
                toast.error('An unknown error occurred');
                setLoading(false)
              }
        }
    }
    useEffect(()=>{
        getTrendData()
    },[])
    return(<div className="lg:p-4 space-y-8 rounded mt-4 border-gray">
       <div className="rounded-xl px-1 py-4 shadow-box">
            <PriceCompareChart />
       </div>
       <div>
       <div className=" w-full h-[55%] border-soli border-gray py-2 px-3 overflow-auto shadow-box">
        <div className="flex justify-between items-center">
            <span className="font-semibold dark:text-white">Trending</span>
            <span className="font-semibold text-blue-600 dark:text-blue-300 text-sm">View more coins</span>
        </div>
        <div className="w-full overflow-auto mt-[10px] ">
                <TableHeader >
                   <TableHeaderCell className="text-[8px] md:text-sm w-[40%]" text="Token" />
                   <TableHeaderCell className="text-[8px] md:text-sm"  text="Symbol" />
                   <TableHeaderCell  className="text-[8px] md:text-sm" text="Last Price" />
                   <TableHeaderCell className="text-[8px] md:text-sm"  text="24H Change" />
                   <TableHeaderCell className="text-[8px] md:text-sm"  text="Market Cap" />
                </TableHeader> 
                {loading && <div className='w-full flex justify-center'> <ClipLoader color='0080A2' /></div>}
                {trendData?.map((coin:any,index:number)=>{
                    console.log(coin.item.data.price_change_percentage_24h.usd)
                    return (
                        <div>
                       {index<5 && <div
                                      onClick={() => {
                                          navigate(`/product/${coin?.item.id}`);
                                      }}
                                     
                                      className=" cursor-pointer w-[20rem] md:w-full flex justify-between items-center p-2 text-black dark:text-white border-b-[1px]"
                                    >
                                <TableContentCell className="text-xs md:text-sm lg:text-normal font-semibold w-[40%] overflow-hidden" url={coin.item.small} text={coin.item.name} />
                                <TableContentCell className="text-xs md:text-sm lg:text-normal" text={coin.item.symbol} />
                                <TableContentCell className="text-xs md:text-sm text-sm" text={`$${coin.item.data.price.toFixed(3)}`} />
                                <TableContentCell className={`text-xs md:text-sm lg:text-normal ${coin.item.data.price_change_percentage_24h.usd <0?"text-red-600 dark:text-red-400":"text-green-600 dark:text-green-400"}`} text={`${coin.item.data.price_change_percentage_24h.usd.toFixed(3)}%`}/>
                                <TableContentCell className="text-xs md:text-sm truncate" text={`${coin.item.data.market_cap}`}/>
                            </div>}
                        </div>
                            
                    );
                })}
                
               
        </div>
    </div>
       </div>
    </div>);
}
export default Main;