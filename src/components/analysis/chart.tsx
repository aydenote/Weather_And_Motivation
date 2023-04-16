import ChartJS from 'chart.js/auto';
import { Bar, Pie } from 'react-chartjs-2';
import { ChartOptions, LinearScale, CategoryScale } from 'chart.js';
import { useSelector } from 'react-redux';
import { todosState } from '../../../type';

ChartJS.register(LinearScale, CategoryScale);

export default function Chart() {
  const todoList = useSelector((state: todosState) => state.todos);
  const sunnyDay = todoList.filter(todo => todo.weather === "1");
  const etcDay = todoList.filter(todo => todo.weather === "2");
  const cloudyDay = todoList.filter(todo => todo.weather === "3");
  const darkDay = todoList.filter(todo => todo.weather === "4");

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
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
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
        }
      }
    }
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
      <Bar className='mb-5' data={data} options={barOptions} />
      <Pie data={data} options={pieOptions} />
    </div>)
};
