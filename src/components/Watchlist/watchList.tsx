"use client";
import React, { FC, useEffect } from "react";
import { TableContent } from "../Table/tableContent";
import { LuArrowUpSquare } from "react-icons/lu";
import "./watchList.css";
import DropHere from "../DropHere/dropHere";
import TableHeader from "../Table/tableHeader";
import TableHeaderCell from "../Table/tableHeaderCell";
import TableContentCell from "../Table/tableContentCell";

export interface WatchListCoin {
  id: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
}

interface WatchlistProps {
  setActiveList: (params: { coin: WatchListCoin; index: number }) => void;
  onDrop: (coin: WatchListCoin, index: number) => void;
  watchList: Array<WatchListCoin>;
}

const Watchlist: FC<WatchlistProps> = ({ setActiveList, onDrop, watchList }) => {
  useEffect(() => {
    console.log(watchList);
  }, [watchList]);

  return (
    <div className="w-full h-fit border-solid shadow-box border-gray py-2 px-3 overflow-auto">
      <div className="flex justify-between items-center">
        <span className="font-semibold dark:text-white">Watchlist</span>
        <span className="font-semibold text-blue-600 dark:text-blue-300 text-sm">View more coins</span>
      </div>
      <div className="w-full mt-[10px]">
        <TableHeader>
          <TableHeaderCell text="Token" />
          <TableHeaderCell text="Last Price" />
          <TableHeaderCell text="24H Change" />
          <TableHeaderCell text="Market Cap" />
        </TableHeader>
        {watchList?.map((coin, index) => (
          <div key={coin.id}>
            {index < 5 && (
              <React.Fragment>
                <div
                  draggable={true}
                  onDragStart={() => setActiveList({ coin, index: index + 1 })}
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
                  className="w-full flex justify-between items-center p-2 cursor-grab coinList dark:text-white"
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
                {index < 4 && <DropHere onDrop={() => onDrop(coin, index + 1)} />}
              </React.Fragment>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
