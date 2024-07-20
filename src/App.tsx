"use client"
import { useEffect, useState } from "react";
import Layout from "./components/Layout/layout"
import { WatchListCoin } from "./components/Watchlist/watchList";
import React from "react";
import Product from "./pages/product"
import Explore from "./pages/explore"
import watchListData from "./watchList.json"
import { Route, Routes } from "react-router-dom";
import Main from "./pages/home";

export default function App() {
  const [theme,setTheme] = useState<string>("light");
  const [activeList,setActiveList]=useState<{coin:WatchListCoin,index:number}>();
  const [watchList,setWatchlist]=useState<Array<WatchListCoin>>([]);
  const [loading,setLoading]=useState<boolean>(false);
  const [coin,setCoin]=useState<WatchListCoin>();


  useEffect(()=>{
    console.log(theme)
    if(theme=='dark'){
      document.documentElement.classList.add("dark");
    }else{
      console.log("23")
      document.documentElement.classList.remove("dark");
    }
  },[theme])
  
  useEffect(()=>{
    setWatchlist(watchListData);
  },[])
  const onDrop = (coin:WatchListCoin,index:number)=>{
    try {
      setLoading(true);
      if(activeList){
        const newWatchList = watchList.filter(element => element.id !== activeList?.coin.id)
        newWatchList.splice(index,0,activeList?.coin);
        setWatchlist(newWatchList)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
   

  }
  console.log(coin)
  return (
    <div className="w-full h-full">
     {!loading && <Layout currentTheme={theme} handleTheme={setTheme} watchlist={watchList} onDrop={onDrop} setActiveList={setActiveList}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path={`/product/:id`} element={ <Product  />} />
        <Route path="/explore" element={<Explore setCoin={setCoin} watchlist={watchList} setActiveList={setActiveList} />} />
      </Routes>
      </Layout>
      }
    </div>
  );
}
