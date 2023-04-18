import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTodos } from '@/redux/todo';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import CompletedWork from '@/components/analysis/completed-work'

export default function Analysis() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useDispatch();

  /** firestore에 있는 todo를 redux state에 저장 */
  async function fetchTodos(dispatch: any, dbId: string) {
    const userRef = doc(db, "users", dbId);
    const userSnapshot = await getDoc(userRef);
    const userData = await userSnapshot.data();
    userData && dispatch(setTodos(userData.todos));
    setIsLoading(true)
  }

  useEffect(() => {
    const dbId = localStorage.getItem('dbId');
    if (dbId) {
      fetchTodos(dispatch, dbId);
    }
  }, [dispatch]);

  return isLoading && <CompletedWork />
};