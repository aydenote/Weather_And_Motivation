import { useEffect, useState } from 'react';
import { MainAnimation } from '@/components/animation';
import { collection, addDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { loginType } from '../../../type';

export default function Hero() {
  const [token, setToken] = useState<string | null>(null);

  /** firestore에 계정 컬렉션 추가 함수*/
  async function addDatabase() {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        todoList: [
          {
            state: "",
            text: "",
            completeDate: ""
          }
        ]
      }
      );
      console.log("Document written with ID: ", docRef.id);
      localStorage.setItem("dbId", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }


  /** 구글 로그인 함수 */
  async function handleLogin() {
    const provider = new GoogleAuthProvider();
    const signIn = await signInWithPopup(auth, provider);
    const userInfo = signIn.user as loginType;
    userInfo.accessToken && localStorage.setItem('token', userInfo.accessToken);
    setToken(localStorage.getItem('token'));
    !localStorage.getItem('dbId') && addDatabase();
  }

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [])
  return (
    <>
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          안녕하세요.
          <br className="hidden lg:inline-block" />
          신입 프론트엔드 개발자 최승수입니다.
        </h1>
        <p className="mb-8 leading-relaxed">
          화창하고 밝은 날씨가 좋은 사람이 있고 비 오고 어두운 날씨를 좋아하는 사람이 있습니다.
          일정을 생성하고 관리함으로써 어떤 날씨에 의욕적이고 활동적인지 통계를 통해 확인하실 수 있습니다.
          본인이 어느 유형인지 파악해보세요!
        </p>
        <div className="flex justify-center">
          {!token && <button className="btn-project" onClick={handleLogin}>구글 계정으로 로그인</button>}
        </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <MainAnimation />
      </div>
    </>
  );
}