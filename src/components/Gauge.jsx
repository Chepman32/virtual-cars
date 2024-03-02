import React from 'react'
import GaugeChart from 'react-gauge-chart'

const chartStyle = {
    height: 250,
  }

export default function Gauge({value, isWarning}) {
  return (
      <div className="gauge" style={{maxWidth: "15vw", maxHeight: "20vh"}}>
          <GaugeChart id="gauge-chart3" 
  nrOfLevels={30} 
  colors={["#FF5F6D", "#FFC371"]} 
  arcWidth={0.3} 
              percent={value} 
              textColor="#000"
              formatTextValue={(value) => value + "RPM"}
/>
    </div>
  )
}
