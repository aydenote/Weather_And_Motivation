# 날씨와 의욕

[![React Version](https://img.shields.io/badge/Next-v13.3.0-blue)](https://ko.reactjs.org/)
[![Package Manager Version](https://img.shields.io/badge/npm-v6.14.17-yellow)](https://www.npmjs.com/)

어떤 날씨에는 일이 잘 진행되고 어떤 날씨에는 조금 더딘 느낌을 받아 어떤 날씨에 의욕적인지 자신의 타입을 알아보자는 아이디어에서 시작한 프로젝트입니다.

## 📅 기간

> 2023.04.08 - 2023.04.20

## 🔗 배포

> https://weather-and-motivation.vercel.app/

<br />

## 📚 프로젝트 설명

<br>

### 1️⃣ 로그인

```jsx
// components/home/main.tsx

  /** 로그인 */
  async function handleLogin() {
    const provider = new GoogleAuthProvider();
    const signIn = await signInWithPopup(auth, provider);
    const userInfo = signIn.user as loginType;
    userInfo.accessToken && localStorage.setItem('token', userInfo.accessToken);
    setToken(localStorage.getItem('token'));
    localStorage.getItem('dbId') ? fetchTodos() : addDatabase();
  }

```

> 📌 로그인 후 로컬스토리지에 `token`을 저장합니다.  
> 📌 만약, 로컬스토리지에 `DB ID`가 있다면 Firestore에 있는 데이터를 Reduxt state로 가져오고 `DB ID`가 없다면 새로운 `DB ID`를 서버에 생성하고 로컬스토리지에 ID를 저장하도록 구현했습니다.

## <br />

### 2️⃣ 일정 관리

```jsx
// components/todo/todo-item

/** 일정 완료 후 날씨 데이터 저장 */
async function handleCompleteTodo(dataId: string) {
  const date = new Date().toLocaleDateString();
  const [year, month, day] = date.split('.').map(str => str.trim().padStart(2, '0'));
  const formattedDate = `${year}${month}${day}`;
  const forecastRes = await getForecast(formattedDate);
  // 기상청 날씨 예보 여부
  if (forecastRes.data.response.body) {
    const weatherData = await forecastRes.data.response.body.items.item;
    // fcstValue : 맑음("1"), 기타("2"), 구름많음("3"), 흐림("4")
    const skyData = weatherData.filter((item: weatherSkyType) => item.category === 'SKY')[0].fcstValue;
    dataId && dispatch(toggleTodo({ id: dataId, completeDate: formattedDate, weather: skyData }));
  } else {
    dataId && dispatch(toggleTodo({ id: dataId, completeDate: formattedDate, weather: '2' }));
  }
}
```

> 📌 일정을 완료하게 되면 기상청 API를 통해 날씨를 state에 추가합니다.  
> 📌 기상청 날씨 정보가 없다면 `기타` 값을 state에 저장해 완료된 일정이 분석 페이지에 나오지 않는 오류를 해결했습니다.

## <br />

### 3️⃣ 분석

```jsx
// components/analysis/completed-work
return (
{
  todoList
    .filter((todo: todoType) => todo.weather === '3')
    .map((todo: todoType) => (
      <li className="mb-4 flex items-center dark:text-white" key={todo.id}>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="check"
          className="text-green-600 w-4 h-4 mr-2"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
        </svg>
        {todo.text}
      </li>
    ));
})
```

> 📌 RTK state에 저장된 일정 배열을 filter로 날씨별 완료 일정을 구현했습니다.  
> 📌 Chart.js를 활용해 차ㅌ트로 시각적 정보를 제공합니다.

## <br />

### 4️⃣ 새로고침

```jsx
/** firestore에 있는 todo를 redux state에 저장 */
async function fetchTodos(dispatch: any, dbId: string) {
  const userRef = doc(db, 'users', dbId);
  const userSnapshot = await getDoc(userRef);
  const userData = await userSnapshot.data();
  userData && dispatch(setTodos(userData.todos));
  setIsLoading(true);
}

useEffect(() => {
  const dbId = localStorage.getItem('dbId');
  if (dbId) {
    fetchTodos(dispatch, dbId);
  }
}, [dispatch]);
```

> 📌 새로고침 시 state가 초기화되는 문제를 useEffect를 사용하여 Firestore에 있는 데이터를 state에 저장해 해결했습니다.  
> 📌 persist 사용에 비해 데이터 중복 저장 해소, 데이터 저장 용량 등 어플리케이션 자체가 가벼워진다는 장점이 있어 useEffect를 사용하게 되었습니다.

---

<br>

## 💻 실행 방법

해당 프로젝트를 로컬서버에서 실행하기 위해서는 Git 과 Npm (node.js를 포함) 이 설치되어 있어야 합니다.
<br>

1.레파지토리 클론

```
npm clone https://github.com/aydenote/Weather_And_Motivation.git
```

<br>
2. packages 설치

```bash
npm install
```

<br>
3. 실행

```bash
# client 실행 : localhost:3000
npm run dev
```
