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
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [theme,setTheme] = useState<string>("light");
  const [activeList,setActiveList]=useState<{coin:WatchListCoin,index:number}>();
  const [watchList,setWatchlist]=useState<Array<WatchListCoin>>([]);
  const [recentlyViewed,setRecentlyViewed]=useState<Array<WatchListCoin>>([]);

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
      
        if (error instanceof Error) {
          console.log(error);
          toast.error(`${error.message}`);
        } else {
          console.log('An unknown error occurred');
          toast.error('An unknown error occurred');
        }
        setLoading(false)
    }
   

  }
  const handleViewList=(coin:WatchListCoin)=>{
    try {
      setLoading(true);
      if(coin){
        console.log(coin)
        const newViewList = recentlyViewed.filter(element => element.id !== coin.id)
        newViewList.splice(0,0,coin);
        setRecentlyViewed(newViewList)
      }
      setLoading(false)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        toast.error(`${error.message}`);
      } else {
        console.log('An unknown error occurred');
        toast.error('An unknown error occurred');
      }
      setLoading(false)
    }
  }
  return (
    <div className="w-full h-full">
     {!loading && <Layout currentTheme={theme} handleTheme={setTheme} recentlyViewed={recentlyViewed} watchlist={watchList} onDrop={onDrop} setActiveList={setActiveList}>
      <Routes>
        <Route path="/" element={<Explore setCoin={setCoin} watchlist={watchList} setActiveList={setActiveList} />} />
        <Route path="/dashboard" element={<Main  />} />
        <Route path={`/product/:id`} element={ <Product setRecentlyViewed ={handleViewList} />} />
      </Routes>
      </Layout>
      }
      <Toaster position="bottom-left" reverseOrder={false} />
    </div>
  );
}
