"use client"

import Link from "next/link";
import { useStatsStore } from '@/store/statStore';
import { useEffect, useRef } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Legend, Tooltip } from "chart.js";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Legend, Tooltip);

export default function NodesExploredPage() {
  const { stats } = useStatsStore();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !stats || stats.length === 0) return;

    const maxIndex = stats.reduce((maxIdx, curr, idx, arr) =>
      curr.nodesExplored > arr[maxIdx].nodesExplored ? idx : maxIdx, 0
    );

    const backgroundColors = stats.map((_, idx) =>
      idx === maxIndex ? '#FF4C4C' : '#87FEFE' 
    );

    const data = {
      labels: stats.map((s, i) => s.alg || `Alg ${i + 1}`),
      datasets: [{
        label: 'Nodes Explored',
        data: stats.map(s => s.nodesExplored),
        backgroundColor: backgroundColors,
        borderColor: '#056092',
        borderWidth: 2
      }]
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: 'bar',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'white', // Màu chữ của legend
              font: {
                size: 18,
                weight: 'bold'
              }
            }
          },
          title: {
            display: false
          },
          tooltip: {
            bodyColor: 'white',
            titleColor: 'white'
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'white', // Màu chữ trục X
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            grid: {
              color: 'white', // Màu của trục X (đường kẻ dọc)
              width: '1px'
            }
          },
          y: {
            ticks: {
              color: 'white', // Màu chữ trục Y
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            grid: {
              color: 'white', // Màu của trục Y (đường kẻ ngang)
              width: '1px'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [stats]);

  return (
    <>
      <div className="bg-[url('/game.jpg')] w-full h-screen bg-cover bg-center bg-no-repeat">
        <div className="flex p-[20px]">
          <Link
            href="/game"
            className="text-[#87FEFE] bg-[#001835] hover:bg-[#58929e] px-[50px] py-[10px] text-[30px] font-extrabold border-[3px] border-[#056092] outline-none cursor-pointer w-[200px]"
            style={{ textShadow: '0 0 10px #87FEFE' }}
          >
            BACK
          </Link>
        </div>
        <div className="flex">
          <div className="bg-[#ffffff34] w-full h-[500px] mx-[100px] border-[3px] border-[#056092] mb-[30px] flex items-center justify-center">
            <canvas ref={chartRef} width={900} height={400}></canvas>
          </div>
        </div>
      </div>
    </>
  );
}