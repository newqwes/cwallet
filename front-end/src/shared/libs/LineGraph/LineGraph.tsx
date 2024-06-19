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
  height: 70px;
  width: 100px;
  scale: 1.2;
  transform: translateX(-5%) translateY(10%);
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
      display: false, // Скрыть ось X
      grid: {
        display: false // Скрыть сетку по оси X
      }
    },
    y: {
      display: false, // Скрыть ось Y
      grid: {
        display: false // Скрыть сетку по оси Y
      }
    }
  },
  elements: {
    point: {
      radius: 0 // Скрыть точки на линии
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
        borderColor: '#18cf26',
        borderWidth: 2,
        tension: 0.4
      }
    ]
  };

  return <GraphContainer>
    <Line data={chartData} options={options}/>
  </GraphContainer>;
};

