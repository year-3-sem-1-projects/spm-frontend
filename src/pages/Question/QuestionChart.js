import React from 'react'
import BarChart from '../../components/charts/BarChart'
// import LineChart from '../../components/charts/LineChart'
// import PieChart from '../../components/charts/PieChart'

export default function PostChart() {
  const data = {
    labels: [
      'October 22',
    ],
    datasets: [
      {
        type: 'line',
        label: 'Answer Count',
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0',
          '#f3ba2f',
          '#2a71d0',
          '#f3ba2f',
        ],
        borderColor: 'black',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [11],
      },
    ],
  }

  return (
    <>
      <div>
        <BarChart data={data} />
      </div>
    </>
  )
}