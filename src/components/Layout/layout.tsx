import { FC, ReactElement } from "react";
import  SidePanel from "../SidePanel/sidePanel";
import { WatchListCoin } from "../Watchlist/watchList";
import React from "react";
import Header from "../Header/header";
import ThemeSwitch from "../Theme/themeSwitch";
// import { Providers } from "../../helpers/providers";

interface LayoutProps {
    children?: React.ReactNode,
    watchlist:Array<WatchListCoin>
    currentTheme:string
    setActiveList: ({ coin, index }: { coin: WatchListCoin; index: number }) => void;
    onDrop:(coin:WatchListCoin,index:number)=>void
    handleTheme:(props:string)=>void;
}
 const Layout:FC<LayoutProps> = ({children,setActiveList,onDrop,watchlist,currentTheme,handleTheme})=>{
    return (
        // <Providers>
        <div className="w-full min-h-[100vh] bg-white flex flex-col p-4 dark:bg-black">
            <Header handleTheme={handleTheme} currentTheme={currentTheme} />
            <div className="flex flex-1 md:flex-col lg:flex-row">
                <div className="w-full lg:w-2/3">{children}</div>
                <SidePanel watchlist={watchlist} onDrop={onDrop} setActiveList={setActiveList} />
            </div>
           
        </div>
        // </Providers>

    );
}
export default Layout;