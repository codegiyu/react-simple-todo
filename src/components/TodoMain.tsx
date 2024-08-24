import { useContext, useEffect, useState } from "react"
import AddTodoForm from "./AddTodoForm"
import MobileTodoTabControls from "./MobileTodoTabControls"
import NoTodosBlock from "./NoTodosBlock"
import TodosContentBlock from "./TodosContentBlock"
import { Todo } from "./TodoItem";
import { TodoContext } from "../context/useTodo"
// import { todoItemsArr } from "../constants/todoItems"
// import AddTodoFormRef from "./AddTodoFormRef"
export type IdStore = { [key: string]: boolean }; //Record<string, boolean>;

const TodoMain = () => {
  const {
    allTodos,
    displayedTodos,
    setAllTodos,
    setDisplayedTodos,
    setTodoIds
  } = useContext(TodoContext);

  const [activeTab, setActiveTab] = useState('all');
  // const [todosVisible, setTodosVisible] = useState(true);

  // useEffect(() => {
  //   console.log('setTimeout started');

  //   setTimeout(() => {
  //     setTodosVisible(false);
  //     console.log('setTimeout has ended');
  //   }, 10000);
  // }, []);

  useEffect(() => {
    if (activeTab === "all") {
      setDisplayedTodos(allTodos);
    } else if (activeTab === "active") {
      setDisplayedTodos(allTodos.filter(item => !item.isCompleted));
    } else if (activeTab === "completed") {
      setDisplayedTodos(allTodos.filter(item => item.isCompleted));
    } else {
      setDisplayedTodos([]);
    }
  }, [allTodos, activeTab, setDisplayedTodos]);

  useEffect(() => {
    const loadStoredTodos = () => {
      const storedTodos = localStorage.getItem("todos-list");
      const storedIds = localStorage.getItem("todo-ids");
  
      if (storedTodos && storedIds ) {
          const parsedStr = JSON.parse(storedTodos) as Todo[]; // unknown;
          const parsedIds = JSON.parse(storedIds) as IdStore; //as unknown;
  
          const parsedStrIsTodoArray = Array.isArray(parsedStr); //&& parsedStr.every(item => isTodo(item));
          const parsedIdsIsValidRecord = true; //isValidIdRecord(parsedIds);
  
          if (parsedStrIsTodoArray && parsedIdsIsValidRecord) {
            setAllTodos(parsedStr);
            setTodoIds(parsedIds);
          }
      }
    };
    loadStoredTodos();
  }, [setAllTodos, setTodoIds]);

  return (
    <section className="app">
        <AddTodoForm />
        {/* <AddTodoFormRef setTodos={setTodos} /> */}
        {displayedTodos.length === 0 && <NoTodosBlock />}
        <TodosContentBlock 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* {todosVisible ? (
          <TodosContentBlock activeTab={activeTab} setActiveTab={setActiveTab} />
        ) : null} */}
        {/* {todosVisible && <TodosContentBlock activeTab={activeTab} setActiveTab={setActiveTab} />} */}

        <MobileTodoTabControls activeTab={activeTab} setActiveTab={setActiveTab} />
    </section>
  )
}

export default TodoMain