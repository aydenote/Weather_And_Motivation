export type loginType = {
  accessToken?: string;
  email: string;
  displayName: string;
};

export type todoType = {
  id: string;
  text: string;
  completed: boolean;
  completeDate: string;
};

export type todosState = {
  todos: todoType[];
};

export type toggleType = {
  id: string;
  completeDate: string;
};
