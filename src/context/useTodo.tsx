import { ReactNode, createContext, useState } from "react";
import { Todo } from "../components/TodoItem";
import { IdStore } from "../components/TodoMain";

interface ITodoContext {
  allTodos: Todo[],
  displayedTodos: Todo[],
  todoIds: IdStore,
  setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setDisplayedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setTodoIds: React.Dispatch<React.SetStateAction<IdStore>>;
}

export const TodoContext = createContext<ITodoContext>({} as ITodoContext);

export const TodoProviderContainer = ({ children }: { children: ReactNode }) => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [displayedTodos, setDisplayedTodos] = useState<Todo[]>([]);
  const [todoIds, setTodoIds] = useState<IdStore>({});

  return (
    <TodoContext.Provider value={{
      allTodos,
      setAllTodos,
      displayedTodos,
      setDisplayedTodos,
      todoIds,
      setTodoIds
    }}>
      {children}
    </TodoContext.Provider>
  )
};
