import { useDispatch, useSelector } from 'react-redux';
import { todoType, todosState, weatherSkyType } from '../../../type';
import { addTodo, deleteTodo, toggleTodo } from '@/redux/todo';
import { v4 as uuidv4 } from 'uuid';
import { getForecast } from '@/pages/api/weather';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Header from '../header';
import Footer from '../footer';

export default function TodoItem() {
  const todoList = useSelector((state: todosState) => state.todos);
  const dispatch = useDispatch()
  const newId = uuidv4();

  /** 일정 추가 */
  function handleAddTodo(event: React.FormEvent) {
    event.preventDefault()
    const todoText = (document.querySelector('input') as HTMLInputElement);
    todoText.value && dispatch(addTodo({ id: newId, text: todoText.value, completed: false, completeDate: '', weather: "" }));
    todoText.value = '';
  }

  /** 일정 완료 후 날씨 데이터 저장 */
  async function handleCompleteTodo(dataId: string) {
    const date = new Date().toLocaleDateString()
    const [year, month, day] = date.split('.').map((str) => str.trim().padStart(2, '0'));
    const formattedDate = `${year}${month}${day}`;
    const forecastRes = await getForecast(formattedDate);
    // 기상청 날씨 예보 여부
    if (forecastRes.data.response.body) {
      const weatherData = await forecastRes.data.response.body.items.item;
      // fcstValue : 맑음("1"), 기타("2"), 구름많음("3"), 흐림("4") 
      const skyData = (weatherData.filter((item: weatherSkyType) => item.category === 'SKY'))[0].fcstValue;
      dataId && dispatch(toggleTodo({ id: dataId, completeDate: formattedDate, weather: skyData }))
    } else {
      dataId && dispatch(toggleTodo({ id: dataId, completeDate: formattedDate, weather: '2' }))
    }
  }


  /** 일정 삭제 */
  function handleDeleteTodo(dataId: string) {
    dataId && dispatch(deleteTodo(dataId))
  }

  /** 일정 저장 */
  async function handleSaveTodo() {
    const dbId = localStorage.getItem('dbId');
    if (dbId) {
      const userDocRef = doc(db, 'users', dbId);
      await updateDoc(userDocRef, { todos: todoList });
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/2 lg:w-1/3">
          <div className='flex justify-between'>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">일정 관리</h1>
            <button type='button' className="h-10 px-2 py-1 text-sm font-semibold text-gray-700 border rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" onClick={() => handleSaveTodo()}>저장</button>
          </div>
          <small className='mb-2 text-right'>일정 추가 및 삭제 후 꼭! 저장 버튼을 눌러주세요.</small>
          <div className="relative">
            <form onSubmit={handleAddTodo}>
              <input type="text" placeholder="일정을 추가해주세요!"
                className="w-full px-2 py-3 border rounded outline-none border-grey-600" />
            </form>
          </div>
          <ul>
            {todoList.filter(todo => !todo.completed).map((todo: todoType) => (
              <li key={todo.id} className="border-b py-4 flex items-center justify-between">
                <div className="flex-grow mr-4">
                  <p className="w-full py-1 border-b border-gray-400 focus:border-indigo-500 focus:outline-none">{todo.text}</p>
                </div>
                <button
                  type="button"
                  className="flex-shrink-0 mr-2 px-2 py-1 text-sm font-semibold text-gray-700 border rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  onClick={() => handleCompleteTodo(todo.id)}
                >
                  완료
                </button>
                <button
                  type="button"
                  className="flex-shrink-0 px-2 py-1 text-sm font-semibold text-gray-700 border rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div >
      <Footer />
    </>
  )
};
