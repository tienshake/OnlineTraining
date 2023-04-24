import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    LineElement,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler
)
export default function BarChart() {
    const [data, setData] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Aug", "Sep"],
        datasets: [
            {
                label: "First Dataset",
                data: [0, 10, 40, 43, 40, 25, 35, 25, 40, 30],
                backgroundColor: '#FFE1D4   ',
                borderColor: '#FF9364',
                tension: 0.4,
                fill: true,
                pointStyle: 'rect',
                pointBorderColor: 'blue',
                pointBackgroundColor: '#fff',
                yAxisID: 'y-axis-1' // thêm id của trục y cho dataset
            }
        ],
        options: {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1', // id của trục y
                        ticks: {
                            stepSize: 10 // khoảng cách giữa các giá trị trên trục y
                        }
                    }
                ]
            }
        }
    });

    return (
        <div>
            <Line data={data}></Line>
        </div>
    )
}
