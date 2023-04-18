import { useDispatch, useSelector } from 'react-redux';
import { setTodos } from '@/redux/todo';
import { todoType, todosState } from '../../type';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Footer from '@/components/footer'
import Header from '@/components/header'
import Chart from '@/components/analysis/chart';
import { useEffect } from 'react';

export default function Analysis() {
  const todoList = useSelector((state: todosState) => state.todos);
  const dispatch = useDispatch();

  /** 완료 일정 모두 삭제  */
  async function handleAllDelete() {
    const dbId = localStorage.getItem('dbId');
    const incompleteTodos = todoList.filter((todo) => !todo.completed)
    if (dbId) {
      const userDocRef = doc(db, 'users', dbId);
      await updateDoc(userDocRef, { todos: incompleteTodos });
    }
    dispatch(setTodos(incompleteTodos))
  }

  /** firestore에 있는 todo를 redux state에 저장 */
  async function fetchTodos(dispatch: any, dbId: string) {
    const userRef = doc(db, "users", dbId);
    const userSnapshot = await getDoc(userRef);
    const userData = await userSnapshot.data();
    userData && dispatch(setTodos(userData.todos));
  }

  useEffect(() => {
    const dbId = localStorage.getItem('dbId');
    if (dbId) {
      fetchTodos(dispatch, dbId);
    }
  }, [dispatch]);

  return (
    todoList.length >= 1 && <>
      <Header />
      <div className="container my-24 px-6 mx-auto">
        <section className="mb-32 text-gray-800">
          <h2 className="text-3xl font-bold text-center mb-12">날씨와 완료 일정</h2>
          <div className='text-right mb-3'>
            <button type="button"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              data-mdb-ripple="true" data-ripple-color="light" onClick={() => handleAllDelete()}>
              전체 삭제
            </button>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-x-12">

            <div className="mb-6 lg:mb-0">
              <div className="block rounded-lg shadow-lg bg-white h-full">
                <div className="p-6 border-b border-gray-300 text-center">
                  <p className="uppercase mb-4 text-sm">
                    <strong>완료된 일정 : {todoList.filter((todo: todoType) => todo.weather === "1").length}</strong>
                  </p>
                  <h3 className="text-2xl mb-6">
                    <strong>맑음</strong>
                    <small className="text-gray-500 text-sm">/쾌청한 날씨</small>
                  </h3>
                </div>
                <div className="p-6">
                  <ol className="list-inside">
                    {todoList.filter((todo: todoType) => todo.weather === "1").map((todo: todoType) => (
                      <li className="mb-4 flex items-center" key={todo.id}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                          className="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512">
                          <path fill="currentColor"
                            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                          </path>
                        </svg>{todo.text}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div className="mb-6 lg:mb-0">
              <div className="block rounded-lg shadow-lg bg-white h-full">
                <div className="p-6 border-b border-gray-300 text-center">
                  <p className="uppercase mb-4 text-sm">
                    <strong>완료된 일정 : {todoList.filter((todo: todoType) => todo.weather === "3").length}</strong>
                  </p>
                  <h3 className="text-2xl mb-6">
                    <strong>구름</strong>
                    <small className="text-gray-500 text-sm">/조금 흐린 날씨</small>
                  </h3>
                </div>
                <div className="p-6">
                  <ol className="list-inside">
                    {todoList.filter((todo: todoType) => todo.weather === "3").map((todo: todoType) => (
                      <li className="mb-4 flex items-center" key={todo.id}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                          className="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512">
                          <path fill="currentColor"
                            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                          </path>
                        </svg>{todo.text}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div className="mb-6 lg:mb-0">
              <div className="block rounded-lg shadow-lg bg-white h-full">
                <div className="p-6 border-b border-gray-300 text-center">
                  <p className="uppercase mb-4 text-sm">
                    <strong>완료된 일정 : {todoList.filter((todo: todoType) => todo.weather === "4").length}</strong>
                  </p>
                  <h3 className="text-2xl mb-6">
                    <strong>흐림</strong>
                    <small className="text-gray-500 text-sm">/어두운 날씨</small>
                  </h3>
                </div>
                <div className="p-6">
                  <ol className="list-inside">
                    {todoList.filter((todo: todoType) => todo.weather === "4").map((todo: todoType) => (
                      <li className="mb-4 flex items-center" key={todo.id}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                          className="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512">
                          <path fill="currentColor"
                            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                          </path>
                        </svg>{todo.text}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div className="mb-6 lg:mb-0">
              <div className="block rounded-lg shadow-lg bg-white h-full">
                <div className="p-6 border-b border-gray-300 text-center">
                  <p className="uppercase mb-4 text-sm">
                    <strong>완료된 일정 : {todoList.filter((todo: todoType) => todo.weather === "2").length}</strong>
                  </p>
                  <h3 className="text-2xl mb-6">
                    <strong>기타</strong>
                  </h3>
                </div>
                <div className="p-6">
                  <ol className="list-inside">
                    {todoList.filter((todo: todoType) => todo.weather === "2").map((todo: todoType) => (
                      <li className="mb-4 flex items-center" key={todo.id}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                          className="text-green-600 w-4 h-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512">
                          <path fill="currentColor"
                            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                          </path>
                        </svg>{todo.text}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
        {todoList.filter(todo => todo.completed === true).length >= 1 && <Chart />}
      </div>
      <Footer />
    </>
  )
};