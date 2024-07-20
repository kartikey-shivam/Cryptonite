import dayjs from 'dayjs';
import React, { FunctionComponent, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const MarketCapChart =()=> {
    function humanReadableToEpoch(humanReadableTime) {
        // Create a new Date object with the human-readable time
        const date = new Date(humanReadableTime);
        console.log(date)
        
        // Get the epoch time by calling getTime() and dividing by 1000 to convert milliseconds to seconds
        const epochTime = Math.floor(date.getTime() / 1000);
        
        return epochTime;
      }
      
      // Example usage:
      const humanReadableTime = "2024-07-20T18:32:56";
      const epochTime = humanReadableToEpoch(humanReadableTime);
      console.log(epochTime); 
    const convertTime = (unix_timestamp:any):string=>{
    
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds
        var date = new Date(unix_timestamp * 1000);

        // Hours part from the timestamp
        var hours = date.getHours();

        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();

        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) ;
        return formattedTime;
        console.log(formattedTime);
  }
        const arr =  [
            {
                "minutes": convertTime(1711930196348),
                "market_cap": 1403316802852.713
            },
            {
                "minutes": convertTime(1711933967449),
                "market_cap": 1398539135568.3184
            },
            {
                "minutes": convertTime(1711937529850),
                "market_cap": 1393428962498.3423
            },
            {
                "minutes": convertTime(1711940919485),
                "market_cap": 1394231775718.8496
            },
            {
                "minutes": convertTime(1711944408457),
                "market_cap": 1389557575732.3662
            },
            {
                "minutes": convertTime(1711947642579),
                "market_cap": 1386672340439.7046
            },
            {
                "minutes": convertTime(1711951350459),
                "market_cap": 1361883711471.025
            },
            {
                "minutes": convertTime(1711955278210),
                "market_cap": 1369478286246.1091
            },
            {
                "minutes": convertTime(1711958895598),
                "market_cap": 1370233784641.3245
            },
            {
                "minutes": convertTime(1711962214189),
                "market_cap": 1365733168403.045
            },
            {
                "minutes": convertTime(1711965851821),
                "market_cap": 1365880150140.278
            },
            {
                "minutes": convertTime(1711969251509),
                "market_cap": 1369122981283.7175
            },
            {
                "minutes": convertTime(1711973300060),
                "market_cap": 1367639437105.8206
            },
            {
                "minutes": convertTime(1711976415204),
                "market_cap": 1373021669001.7515
            },
            {
                "minutes": convertTime(1711980733147),
                "market_cap": 1371351327886.4583
            },
            {
                "minutes": convertTime(1711984400766),
                "market_cap": 1349641939504.0605
            },
            {
                "minutes": convertTime(1711987734901),
                "market_cap": 1344152230674.004
            },
            {
                "minutes": convertTime(1711991117695),
                "market_cap": 1350578221612.1194
            },
            {
                "minutes": convertTime(1711994930182),
                "market_cap": 1346892663791.6028
            },
            {
                "minutes": convertTime(1711998469853),
                "market_cap": 1355913742994.181
            },
            {
                "minutes": convertTime(1712002376222),
                "market_cap": 1369512744203.1272
            },
            {
                "minutes": convertTime(1712005516695),
                "market_cap": 1370616368182.4897
            },
            {
                "minutes": convertTime(1712009272278),
                "market_cap": 1369183982822.4893
            },
            {
                "minutes": convertTime(1712012683305),
                "market_cap": 1373625074217.454
            },
            {
                "minutes": convertTime(1712016623415),
                "market_cap": 1373784286061.3486
            },
            {
                "minutes": convertTime(1712020075335),
                "market_cap": 1364698601711.3726
            },
            {
                "minutes": convertTime(1712023963634),
                "market_cap": 1363578579526.7996
            },
            {
                "minutes": convertTime(1712027352809),
                "market_cap": 1318315274533.7695
            },
            {
                "minutes": convertTime(1712030758050),
                "market_cap": 1313485181436.686
            },
            {
                "minutes": convertTime(1712034513764),
                "market_cap": 1310552776751.9678
            },
            {
                "minutes": convertTime(1712038080709),
                "market_cap": 1310357335836.977
            },
            {
                "minutes": convertTime(1712041405158),
                "market_cap": 1316704388658.4888
            },
            {
                "minutes": convertTime(1712045045975),
                "market_cap": 1309501670774.37
            },
            {
                "minutes": convertTime(1712048861964),
                "market_cap": 1303094270714.5261
            },
            {
                "minutes": convertTime(1712052284555),
                "market_cap": 1304314181526.2183
            },
            {
                "minutes": convertTime(1712055739985),
                "market_cap": 1289013099635.3286
            },
            {
                "minutes": convertTime(1712059286969),
                "market_cap": 1287683851491.3596
            },
            {
                "minutes": convertTime(1712063161279),
                "market_cap": 1284762418092.6804
            },
            {
                "minutes": convertTime(1712066458181),
                "market_cap": 1280942203534.762
            },
            {
                "minutes": convertTime(1712070295601),
                "market_cap": 1292052773752.966
            },
            {
                "minutes": convertTime(1712074429906),
                "market_cap": 1280312404421.362
            },
            {
                "minutes": convertTime(1712077732247),
                "market_cap": 1290825156264.639
            },
            {
                "minutes": convertTime(1712081551226),
                "market_cap": 1288564075511.052
            },
            {
                "minutes": convertTime(1712084753851),
                "market_cap": 1296024636783.558
            },
            {
                "minutes": convertTime(1712088249135),
                "market_cap": 1300209819382.3792
            },
            {
                "minutes": convertTime(1712091797288),
                "market_cap": 1291905701256.348
            },
            {
                "minutes": convertTime(1712095270586),
                "market_cap": 1292870557401.434
            },
            {
                "minutes": convertTime(1712099459638),
                "market_cap": 1293875931802.7407
            },
            {
                "minutes": convertTime(1712102773039),
                "market_cap": 1288360536576.547
            },
            {
                "minutes": convertTime(1712106174663),
                "market_cap": 1283236953956.4312
            },
            {
                "minutes": convertTime(1712109721574),
                "market_cap": 1290579362106.8936
            },
            {
                "minutes": convertTime(1712113934502),
                "market_cap": 1294834724177.378
            },
            {
                "minutes": convertTime(1712117043007),
                "market_cap": 1302671868065.1582
            },
            {
                "minutes": convertTime(1712121129757),
                "market_cap": 1304509211945.6958
            },
            {
                "minutes": convertTime(1712124523344),
                "market_cap": 1300633983417.0525
            },
            {
                "minutes": convertTime(1712128337010),
                "market_cap": 1304021089185.8623
            },
            {
                "minutes": convertTime(1712131662043),
                "market_cap": 1301524660601.6382
            },
            {
                "minutes": convertTime(1712135593016),
                "market_cap": 1308925852608.819
            },
            {
                "minutes": convertTime(1712138849240),
                "market_cap": 1308047202598.8896
            },
            {
                "minutes": convertTime(1712142516362),
                "market_cap": 1301898885831.6335
            },
        
        
        ];
      useEffect(()=>{
          
      },[])
     
      const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
        const { x, y, payload } = props;
        console.log(x,y,payload)
        return (
          <g transform={`translate(${x},${y})`}>
            <text
              x={0}
              y={0}
              dy={16}
              textAnchor="end"
              fill="#666"
            >
              {payload.value}
            </text>
          </g>
        );
      };
     // For formatting timestamps

const data = [
    { "timestamp": 1711930196348, "market_cap": 1403316802852.713 },
    { "timestamp": 1711933967449, "market_cap": 1398539135568.3184 },
    { "timestamp": 1711937529850, "market_cap": 1393428962498.3423 },
    { "timestamp": 1711940919485, "market_cap": 1394231775718.8496 },
    { "timestamp": 1711944408457, "market_cap": 1389557575732.3662 },
    { "timestamp": 1711947642579, "market_cap": 1386672340439.7046 },
    { "timestamp": 1711951350459, "market_cap": 1361883711471.025 },
    { "timestamp": 1711955278210, "market_cap": 1369478286246.1091 },
    { "timestamp": 1711958895598, "market_cap": 1370233784641.3245 },
    { "timestamp": 1711962214189, "market_cap": 1365733168403.045 },
    { "timestamp": 1711965851821, "market_cap": 1365880150140.278 },
    { "timestamp": 1711969251509, "market_cap": 1369122981283.7175 },
    { "timestamp": 1711973300060, "market_cap": 1367639437105.8206 },
    { "timestamp": 1711976415204, "market_cap": 1373021669001.7515 },
    { "timestamp": 1711980733147, "market_cap": 1371351327886.4583 },
    { "timestamp": 1711984400766, "market_cap": 1349641939504.0605 },
    { "timestamp": 1711987734901, "market_cap": 1344152230674.004 },
    { "timestamp": 1711991117695, "market_cap": 1350578221612.1194 },
    { "timestamp": 1711994930182, "market_cap": 1346892663791.6028 },
    { "timestamp": 1711998469853, "market_cap": 1355913742994.181 },
    { "timestamp": 1712002376222, "market_cap": 1369512744203.1272 },
    { "timestamp": 1712005516695, "market_cap": 1370616368182.4897 },
    { "timestamp": 1712009272278, "market_cap": 1369183982822.4893 },
    { "timestamp": 1712012683305, "market_cap": 1373625074217.454 },
    { "timestamp": 1712016623415, "market_cap": 1373784286061.3486 },
    { "timestamp": 1712020075335, "market_cap": 1364698601711.3726 },
    { "timestamp": 1712023963634, "market_cap": 1363578579526.7996 },
    { "timestamp": 1712027352809, "market_cap": 1318315274533.7695 },
    { "timestamp": 1712030758050, "market_cap": 1313485181436.686 },
    { "timestamp": 1712034513764, "market_cap": 1310552776751.9678 },
    { "timestamp": 1712038080709, "market_cap": 1310357335836.977 },
    { "timestamp": 1712041405158, "market_cap": 1316704388658.4888 },
    { "timestamp": 1712045045975, "market_cap": 1309501670774.37 },
   
];
      const formatData = (data: any[]) => {
        return data.map(item => ({
            time: dayjs(item.timestamp).format('HH:mm'),  // Format as hours and minutes
            market_cap: item.market_cap/100000000
        }));
    };
    const formattedData = formatData(data);
    return (
        <div>
        <LineChart width={780} height={400} data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="time" label={{ value: 'Time (Hours)', position: 'insideBottomRight', offset: -5 }} />
            <YAxis type="number" domain={[13000,14500]}/>
            {/* <Tooltip /> */}
            <Legend align='right' verticalAlign='top' />
            <Line type="monotone" dataKey="market_cap" stroke="#8884d8" dot={false} strokeWidth={3} />
        </LineChart>
        </div>
    );
  
}
export default MarketCapChart;