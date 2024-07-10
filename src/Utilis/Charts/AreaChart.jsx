import { Chart } from "react-google-charts";


export function AreaChart({data,options}) {
    
    // console.log("hello i am insode chart");
    // console.log("data",data);
    // console.log("options",options);
    return (
      <Chart
        chartType="AreaChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    );
  }