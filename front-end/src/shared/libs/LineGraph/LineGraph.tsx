import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type DataSet = number[][];

const GraphContainer = styled.div`
  height: 60px;
  width: 120px;
  transform: translateX(-5%) translateY(10%);

  &:before {
    content: 'Week';
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    letter-spacing: 5px;
    font-size: 20px;
    color: rgba(71, 186, 53, 0.1);
  }
`;

interface LineGraphProps {
  data: DataSet;
}

const options = {
  plugins: {
    legend: {
      display: false // Скрыть легенду
    },
    tooltip: {
      enabled: false // Скрыть подсказки
    },
    title: {
      display: false // Скрыть заголовок
    }
  },
  scales: {
    x: {
      display: true, // Скрыть ось X
      ticks: {
        display: false // Скрыть показатели на оси X
      },
      grid: {
        display: false // Скрыть сетку по оси X
      }
    },
    y: {
      display: true, // Скрыть ось Y
      ticks: {
        display: false // Скрыть показатели на оси X
      },
      grid: {
        display: false // Скрыть сетку по оси Y
      }
    }
  },
  elements: {
    point: {
      radius: 1 // Скрыть точки на линии
    }
  }
};

export const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  const labels = data.map(point => new Date(point[0]).toLocaleDateString());
  const dataValues = data.map(point => point[1]);

  const chartData = {
    labels,
    datasets: [
      {
        data: dataValues,
        borderColor: '#47ba35',
        borderWidth: 2,
        tension: 0.4
      }
    ]
  };

  return <GraphContainer>
    <Line data={chartData} options={options}/>
  </GraphContainer>;
};

