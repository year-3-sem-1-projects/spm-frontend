import React from 'react'
import BarChart from '../../../components/charts/BarChart'

export default function CircleChart() {
  const data = {
    labels: [
      'October 16',
      'October 17 ',
      'October 18',
      'October 19',
      'October 20',
      'October 21',
      'October 22',
    ],
    datasets: [
      {
        type: 'line',
        label: 'Member Count',
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
        data: [19, 5, 15, 20, 3, 3, 5],
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
