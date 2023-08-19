import React,{useState} from 'react'
import {LineChart} from "react-native-chart-kit";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// const data = {
//     labels: ["1/22", "2/22", "3/22", "4/22", "5/22", "6/22"],
//     datasets: [
//       {
//         data: [100, 450, 2800, 8000, 9900, 10000],
//         color: (opacity = 1) => `rgba(255, 0, 0, 1)`, // optional
//       }
//     ]
//   };

export default function GraphComp({width,height,dataa}) {

  console.log('dataa ',dataa)
  const [data,setData] = useState( dataa.labels[0] > dataa.labels[dataa.labels.length-1] ? 
    {
      ...dataa,
      labels : dataa.labels.reverse(),
      datasets : [ 
        {
        data :dataa.datasets[0].data.reverse(),
        color:dataa.datasets[0].color              
      }
    ]
    }
    : dataa)



  return (
    <LineChart
        data={data}
        width={width}
        height={height}
        bezier
        chartConfig={{
            backgroundGradientFromOpacity:0,
            backgroundGradientToOpacity:0,
            fillShadowGradientFrom: "white",
            fillShadowGradientFromOpacity: 0.4,
            fillShadowGradientTo: "black",
            fillShadowGradientToOpacity: 0.5,
            decimalPlaces:0,
            barPercentage:2,
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots:{
                strokeWidth:"3",
                stroke:'white',
                strokeOpacity:0.4,
                r:"3"
            },
            propsForLabels:{
                fontSize:wp(2.5),
                fontFamily:'OpenSans-Semibold'
            }
        }}
        withInnerLines={false}
        withOuterLines={false}
        yAxisInterval="6"
    />
  )
}