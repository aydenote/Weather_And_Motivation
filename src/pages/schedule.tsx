import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import TodoItem from '@/components/todo/todo-item';
import { todosState } from '../../type';

export default function Schedule() {
  const router = useRouter();
  const todoList = useSelector((state: todosState) => state.todos);

  function handleNotFound() {
    router.push('404')
  }

  return todoList ? <TodoItem /> : handleNotFound()

}
