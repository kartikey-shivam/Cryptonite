"use client"
import { FC, useEffect, useState } from "react";
import coin from "../coin.json"
import { MdOutlineAddBox } from "react-icons/md";
import { GoInfo } from "react-icons/go";
import axios from "../helpers/axios";
import MarketCapChart from "../components/Charts/marketCapChart";
import { useParams } from "react-router-dom";
import { WatchListCoin } from "../components/Watchlist/watchList";
import toast from "react-hot-toast";
interface productProps  {
    setRecentlyViewed:(props:WatchListCoin)=>void;
}
interface FR{
    label:string,
    value:string
}
const FundamentalRow:FC<FR>=({label,value})=>{
    return (
        <div className="w-full lg:w-1/2 flex justify-between py-2 border-b-[1px] border-gray-100">
            <div className="text-xs lg:text-normal flex items-center space-x-2 text-gray-400"><span>{label}</span> <GoInfo /></div>
            <div className="text-xs lg:text-normal dark:text-white">{value}</div>
        </div>
    );
}
const Product:FC<productProps> =({setRecentlyViewed})=> {
    const {id} = useParams();
    const [loading,setLoading] = useState<boolean>();
    const [coin,setCoin]=useState<any>();
    const getCoinDetail = async (id:string) =>{
        setLoading(true);
        try {
            const res = await axios.get(`/coins/${id}`)
            console.log("32",res.data)
            setCoin(res.data)
            setRecentlyViewed(res.data)
            setLoading(false);

        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                toast.error(`${error.message} : Your request exceeds the allowed time range.`);
              } else {
                console.log('An unknown error occurred');
                toast.error('An unknown error occurred');
              }
            setLoading(false)
        }
    }
    function htmlToText(html: string) {
        // Create a new DOMParser instance
        const parser = new DOMParser();
        
        // Parse the HTML string into a document
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract the text content from the document
        return doc.body.textContent || "";
      }
      
    
    useEffect(()=>{
        console.log(id,"42")
        if(id)getCoinDetail(id);
    },[id])
    return (<div>
       {!loading &&  <div className="p-4 space-y-8">
            <div>
                <img className="w-8 h-8 lg:w-12 lg:h-12" src={coin?.image.thumb} />
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-black text-md lg:text-normal dark:text-white">{coin?.name}</div>
                        <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4 lg:items-center">
                            <div className="text-xl lg:text-3xl dark:text-white">$ {coin?.market_data.current_price.usd}</div>
                            <span className="w-fit text-green-500 bg-[#86efac52] p-[1px] rounded text-sm">&uarr; 1.0811%</span>
                            <span className="text-green-500 text-sm">0.1800 Today</span>
                        </div>
                    </div>
                    <div>
                        <MdOutlineAddBox className="text-green-400 w-7 h-7" />
                    </div>
                </div>
                <div className="shadow-box mt-5">
                       {id && <MarketCapChart id={id}  />}
                </div>
            </div>
            <hr />
            <div>
                <div className="text-lg lg:text-2xl dark:text-white ">Fundamentals</div>
                <div>
                    <FundamentalRow label="Market Cap" value={`$ ${coin?.market_data.current_price.usd.toLocaleString()}`} />
                    <FundamentalRow label="Fully Diluted Valuation" value={`$ ${coin?.market_data.fully_diluted_valuation.usd.toLocaleString()}`} />
                    {/* <FundamentalRow label="24 Hour Trading Vol" value={`$ ${coin.market_data.2.toLocaleString()}`} /> */}
                    <FundamentalRow label="Circulating Supply" value={` ${coin?.market_data.circulating_supply.toLocaleString()}`} />
                    <FundamentalRow label="Total Supply " value={` ${coin?.market_data.total_supply.toLocaleString()}`} />
                    {/* <FundamentalRow label="Max Supply " value={` ${coin.market_data.max_supply.toLocaleString()}`} /> */}

                </div>
            </div>
            <hr />
            <div>
                <div className="text-lg lg:text-2xl font-semibold dark:text-white">About {coin?.name}</div>
                <div className="text-xs lg:text-normal mt-4 dark:text-white">
                    {htmlToText(coin?.description.en)}
                </div>
            </div>
        </div>}</div>
    );
    
};

export default Product;