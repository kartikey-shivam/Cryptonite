"use client";
import React, { FC, useEffect, useState } from "react";
import coinsData from "../coins.json";
import { LuArrowUpSquare } from "react-icons/lu";
import { WatchListCoin } from "../components/Watchlist/watchList";
import Pill from "../components/Pill/pill";
import Pagination from "../components/Pagination/Pagination";
import TableHeader from "../components/Table/tableHeader";
import TableHeaderCell from "../components/Table/tableHeaderCell";
import TableContentCell from "../components/Table/tableContentCell";
import { useNavigate } from "react-router-dom";

interface Explore {
  setActiveList: ({ coin, index }: { coin: WatchListCoin; index: number }) => void;
  watchlist: Array<WatchListCoin>;
  setCoin: (props: WatchListCoin) => void;
}

const Explore: FC<Explore> = ({ setCoin, watchlist, setActiveList }) => {
    const [totalCoin, setTotalCoin] = useState<number>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [activeTag, setActiveTag] = useState<number>(1);
    const navigate = useNavigate()
  useEffect(() => {
    if (totalCoin == null) setTotalCoin(coinsData.length);
    console.log(totalCoin);
  }, [totalCoin]);


  return (
    <div className="w-[50rem] lg:w-full p-4 space-y-8  border-solid border-black shadow-box dark:border-white rounded mt-4 text-black">
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <Pill active={activeTag == 1} setActiveTag={() => setActiveTag(1)} text="All Coins" />
          <Pill active={activeTag == 2} setActiveTag={() => setActiveTag(2)} text="Watchlist" />
          <Pill active={activeTag == 3} setActiveTag={() => setActiveTag(3)} text="Gainers" />
          <Pill active={activeTag == 4} setActiveTag={() => setActiveTag(4)} text="Losers" />
          <Pill active={activeTag == 5} setActiveTag={() => setActiveTag(5)} text="Recently sold" />
        </div>
        {activeTag == 1 && (
          <div className="relative">
            <Pagination className="text-black dark:text-white" pageSize={20} totalCount={totalCoin} currentPage={currentPage} onPageChange={setCurrentPage} />
          </div>
        )}
      </div>

      {activeTag == 1 && (
        <div>
          <TableHeader className="w-[50rem] lg:w-full">
            <TableHeaderCell className="w-[40%]" text="Name" />
            <TableHeaderCell text="Marketcap" />
            <TableHeaderCell text="Balance" />
            <TableHeaderCell text="Price" />
            <TableHeaderCell text="7d" />
            <TableHeaderCell text="30D" />
            <TableHeaderCell text="1Y" />
            <TableHeaderCell text="Today" />
          </TableHeader>
          {coinsData.map((coin, index) => {
            return (
              <div key={index}>
                {index + 1 >= (currentPage - 1) * 20 && index + 1 < currentPage * 20 && (
                  <div
                    draggable={true}
                    onClick={() => {setCoin(coin);
                        navigate(`/product/${coin?.id}`);
                    }}
                    onDragStart={() => setActiveList({ coin: coin, index: index + 1 })}
                    onDragEnd={() =>
                      setActiveList({
                        coin: {
                          id: "",
                          name: "",
                          current_price: 0,
                          price_change_percentage_24h: 0,
                          market_cap: 0,
                          image: "",
                        },
                        index: 0,
                      })
                    }
                    className="w-full flex justify-between items-center p-2 text-black dark:text-white border-b-[1px]"
                  >
                    <TableContentCell className="w-[40%] overflow-hidden" text={coin.name} url={coin.image} />
                    <TableContentCell text={`${(coin.market_cap / 1000000000).toFixed(2)}B`} />
                    <TableContentCell text={`$5,777`} />
                    <TableContentCell text={`${coin.current_price.toFixed(3)}`} />
                    <TableContentCell className="font-semibold text-green-600 dark:text-green-400" text={`+5.1%`} />
                    <TableContentCell className="font-semibold text-red-600 dark:text-red-400" text={`-27.4%`} />
                    <TableContentCell text={`+1M%`} />
                    <TableContentCell
                      className={`font-semibold ${coin.price_change_percentage_24h < 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
                      text={`${coin.price_change_percentage_24h}`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeTag == 2 && (
        <div className="w-full mt-[10px]">
          <TableHeader className="w-[50rem] lg:w-full">
            <TableHeaderCell text="Token" />
            <TableHeaderCell text="Last Price" />
            <TableHeaderCell text="24H Change" />
            <TableHeaderCell text="Market Cap" />
          </TableHeader>
          {/* <DropHere onDrop={()=>onDrop(coin,0)}/> */}
          {watchlist?.map((coin: any, index: number) => {
            return (
              <div key={index}>
                <div
                  onClick={()=> navigate(`product/${coin?.id}`)}
                  draggable={true}
                  onDragStart={() => setActiveList({ coin: coin, index: index + 1 })}
                  onDragEnd={() =>
                    setActiveList({
                      coin: {
                        id: "",
                        name: "",
                        current_price: 0,
                        price_change_percentage_24h: 0,
                        market_cap: 0,
                        image: "",
                      },
                      index: 0,
                    })
                  }
                  className="w-full dark:text-white flex justify-between items-center p-2 cursor-grab coinList border-b-[1px]"
                >
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
                </div>
                {/* {index<4 && <DropHere onDrop={()=>onDrop(coin,index+1)} />} */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Explore;
