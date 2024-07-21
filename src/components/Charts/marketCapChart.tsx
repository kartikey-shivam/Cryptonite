import dayjs from 'dayjs';
import React, { FC, FunctionComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from '../../helpers/axios';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

interface MarketCapChart {
    id?:string
}
const MarketCapChart:FC<MarketCapChart> =({id})=> {
    const [startTime,setStartTime] = useState<number>();
    const [endTime,setEndTime] = useState<number>();
    const [chartData,setChartData] =useState<any>();
    const [loading,setLoading] = useState<boolean>(false);
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
          price: item[1] * 10000000  // Converting the market cap by multiplying it by 10,000,000
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
          setLoading(true)
            const res = await axios.get(`/coins/${id}/market_chart/range?vs_currency=usd&from=${startTime}&to=${endTime}`)
            console.log(res.data.prices)
            setChartData(formatData(convertData(res?.data.prices)))
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
        if(!startTime)gettingTimeStamps();
        console.log(startTime)
        if(startTime && endTime) getChartData();
        if(chartData)console.log(chartData);
      },[startTime])
     
   
   
      useEffect(()=>{
        console.log(chartData)
      },[chartData])
    return (
        <div className='lg:-ml-2 py-8 overflow-auto'>
           {loading && <div className='w-full flex justify-center'> <ClipLoader color='0080A2' /></div>}
       {chartData && <div> <LineChart width={780} height={400} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="time" tickCount={10} label={{ value: 'DD MM', position: 'insideBottomRight', offset: -5 }} />
            <YAxis type="number" />
            {/* <Tooltip /> */}
            <Legend align='right' verticalAlign='top' />
            <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} strokeWidth={3} />
        </LineChart>
        <div className='w-full text-center dark:text-white'>Price (in B)</div></div>}
        </div>
    );
  
}
export default MarketCapChart;