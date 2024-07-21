import { FC } from "react";
import Watchlist, {  WatchListCoin } from '../Watchlist/watchList';
import { RecentlyViewed } from "../RecentlyViewed/recentlyViewed";
import React from "react";

interface SidePanel {
    setActiveList: ({ coin, index }: { coin: WatchListCoin; index: number }) => void;
    onDrop:(coin:WatchListCoin,index:number)=>void
    watchlist:Array<WatchListCoin>
    recentlyViewed?:Array<WatchListCoin>

}
 const SidePanel:FC<SidePanel>=({setActiveList,onDrop,watchlist,recentlyViewed})=>{
    console.log(watchlist)
    return (<div className="hidden w-full lg:w-1/3 md:flex lg:flex-col p-4 space-x-8 lg:space-x-0 lg:space-y-8">
        <Watchlist watchList={watchlist} onDrop={onDrop} setActiveList={setActiveList} />
        <RecentlyViewed  recentlyViewed={recentlyViewed} />
    </div>);
}
export default SidePanel;