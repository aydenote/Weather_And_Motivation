export type loginType = {
  accessToken?: string;
  email: string;
  displayName: string;
};

// fcstValue : 맑음("1"), 구름많음("3"), 흐림("4")
export type todoType = {
  id: string;
  text: string;
  completed: boolean;
  completeDate: string;
  weather: string;
};

export type todosState = {
  todos: todoType[];
};

export type toggleType = {
  id: string;
  completeDate: string;
  weather: string;
};

export type weatherSkyType = {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
};
