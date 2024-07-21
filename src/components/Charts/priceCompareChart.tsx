import dayjs from 'dayjs';
import React, { FC, FunctionComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from '../../helpers/axios';
import toast from 'react-hot-toast';

interface PriceCompareChart {
    id?:string
}
interface CryptoData {
    time: string;
    price: string;
  }
  
  interface MergedData {
    time: string;
    solana?: string;
    binancecoin?: string;
    coin3Price?: string;
  }
const PriceCompareChart:FC<PriceCompareChart> =()=> {
    const [startTime,setStartTime] = useState<number>();
    const [endTime,setEndTime] = useState<number>();
    const [chartData,setChartData] =useState<any>();
    const [loading,setLoading] = useState<boolean>(false);
    const [bitcoinData,setBitcoinData]=useState<any>();
    const [ethData,setEthData]=useState<any>();
    const [tethData,setTethData]=useState<any>();

    function humanReadableToEpoch(humanReadableTime:any) {
        const date = new Date(humanReadableTime);
        console.log(date)
        const epochTime = Math.floor(date.getTime() / 1000);
        return epochTime;
    }
      
      
    
    const gettingTimeStamps = () =>{
        const humanReadableTime = new Date();
        const epochTime = humanReadableToEpoch(humanReadableTime);
        setEndTime(epochTime)
        setStartTime(1711929600)
    }
    const convertData = (data: any[]): any[] => {
        return data.map(item => ({
          timestamp: item[0],  // Keeping the timestamp as is
          price: item[1]  // Converting the market cap by multiplying it by 10,000,000
        }));
      }
      const formatData = (data: any[]) => {
        return data.map(item => ({
          time: dayjs(item.timestamp).format('DD MM'),  // Format as month and year
          price: (item.price / 100000000).toFixed(2)
        }));
      }
    const getChartData = async ()=>{
        console.log(startTime,endTime)
        try {
            const res1 = await axios.get(`/coins/solana/market_chart/range?vs_currency=usd&from=${startTime}&to=${endTime}`)
            const res2= await axios.get(`/coins/binancecoin/market_chart/range?vs_currency=usd&from=${startTime}&to=${endTime}`)
            // const res3 = await axios.get(`/coins/ethereum/market_chart/range?vs_currency=usd&from=${startTime}&to=${endTime}`)
            setBitcoinData(formatData(convertData(res1?.data.market_caps)))
            // setTethData(formatData(convertData(res3?.data.market_caps)))
            setEthData(formatData(convertData(res2?.data.market_caps)))

        } catch (error) {
          if (error instanceof Error) {
            console.log(error);
            toast.error(`${error.message} : Your request exceeds the allowed time range.`);
          } else {
            console.log('An unknown error occurred');
            toast.error('An unknown error occurred');
          }
        }
    }
    const mergeData = (
        coinData1: CryptoData[], 
        coinData2: CryptoData[], 
        coinData3?: CryptoData[]
      ): MergedData[] => {
        const combinedDataMap = new Map<string, MergedData>();
      
        // Add Bitcoin data
        coinData1.forEach(({ time, price }) => {
          if (!combinedDataMap.has(time)) {
            combinedDataMap.set(time, { time, solana: price });
          } else {
            combinedDataMap.get(time)!.solana = price;
          }
        });
      
        // Add Ethereum data
        coinData2.forEach(({ time, price }) => {
          if (combinedDataMap.has(time)) {
            combinedDataMap.get(time)!.binancecoin = price;
          } else {
            combinedDataMap.set(time, { time, binancecoin: price });
          }
        });
      
        // Add Tether data
        coinData3?.forEach(({ time, price }) => {
          if (combinedDataMap.has(time)) {
            combinedDataMap.get(time)!.coin3Price = price;
          } else {
            combinedDataMap.set(time, { time, coin3Price: price });
          }
        });
      
        return Array.from(combinedDataMap.values());
      };
      
      
      useEffect(()=>{
        if(!startTime)gettingTimeStamps();
        console.log(startTime)
        if(startTime && endTime) getChartData();
        if(chartData)console.log(chartData);
      },[startTime])
     
   
   
      useEffect(()=>{
        console.log(chartData)
        console.log(bitcoinData)
        console.log(ethData)
        console.log(tethData)

        if(bitcoinData && ethData) {
            const mergedData = mergeData(bitcoinData, ethData,tethData);
                if(!chartData)setChartData(mergedData);
        }
      },[chartData,bitcoinData,tethData,ethData])
    return (
        <div className='-ml-2 py-8 overflow-auto'>
       {chartData && <div> <LineChart width={780} height={400} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="time" tickCount={5} label={{ value: 'DD MM', position: 'insideBottomRight', offset: -5 }} />
            <YAxis type="number" />
            <Tooltip />
            <Legend align='right' verticalAlign='top' />
            <Line type="monotone" dataKey="solana" stroke="#8884d8" dot={false} strokeWidth={3} />
            <Line type="monotone" dataKey="binancecoin" stroke="#Ff0000" dot={false} strokeWidth={3} />
            {/* <Line type="monotone" dataKey="coin3Price" stroke="#008000" dot={false} strokeWidth={3} /> */}


        </LineChart>
        <div className='w-full text-center dark:text-white dark:text-white'>Price (in Billion)</div></div>}
        </div>
    );
  
}
export default PriceCompareChart;