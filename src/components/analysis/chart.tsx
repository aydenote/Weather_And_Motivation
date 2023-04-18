import ChartJS from 'chart.js/auto';
import { Bar, Pie } from 'react-chartjs-2';
import { ChartOptions, LinearScale, CategoryScale } from 'chart.js';
import { useSelector } from 'react-redux';
import { todosState } from '../../../type';

ChartJS.register(LinearScale, CategoryScale);

export default function Chart() {
  const todoList = useSelector((state: todosState) => state.todos);
  const sunnyDay = todoList.filter(todo => todo.weather === "1"); // 맑음
  const etcDay = todoList.filter(todo => todo.weather === "2");  // 기타
  const cloudyDay = todoList.filter(todo => todo.weather === "3"); // 구름
  const darkDay = todoList.filter(todo => todo.weather === "4"); // 흐림

  const data = {
    labels: ['맑음', '구름', '흐림', '기타'],
    datasets: [
      {
        label: '완료된 일정',
        data: [sunnyDay.length, cloudyDay.length, darkDay.length, etcDay.length],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1
      }
    ]
  };

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        suggestedMin: 0,
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: 'rgba(153, 102, 255, 0.3)',
        }
      },
      x: {
        grid: {
          color: 'rgba(153, 102, 255, 0.3)',
        }
      }
    },
  };

  const pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        suggestedMin: 0,

      }
    },
  };

  return (
    <div className='m-auto'>
      <h1 className='text-3xl font-bold text-center mb-12 dark:text-white'>완료 일정 차트</h1>
      <h2 className='text-2xl text-right'>막대 차트</h2>
      <Bar className='mb-20' data={data} options={barOptions} />
      <h2 className='text-2xl text-right'>파이 차트</h2>
      <Pie data={data} options={pieOptions} />
    </div>)
};
