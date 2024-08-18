import { useEffect, useState } from "react"
import AddTodoForm from "./AddTodoForm"
import MobileTodoTabControls from "./MobileTodoTabControls"
import NoTodosBlock from "./NoTodosBlock"
import TodosContentBlock from "./TodosContentBlock"
import { Todo } from "./TodoItem";
// import { todoItemsArr } from "../constants/todoItems"
// import AddTodoFormRef from "./AddTodoFormRef"

const TodoMain = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
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
      setTodos(allTodos);
    } else if (activeTab === "active") {
      setTodos(allTodos.filter(item => !item.isCompleted));
    } else if (activeTab === "completed") {
      setTodos(allTodos.filter(item => item.isCompleted));
    } else {
      setTodos([]);
    }
  }, [allTodos, activeTab]);  

  useEffect(() => {
    const loadStoredTodos = () => {
      const storedTodos = localStorage.getItem("todos-list");
      // const storedIds = localStorage.getItem("todo-ids");
  
      if (storedTodos /* && storedIds */) {
          const parsedStr = JSON.parse(storedTodos) as Todo[]; // unknown;
          // const parsedIds = JSON.parse(storedIds) as unknown;
  
          const parsedStrIsTodoArray = Array.isArray(parsedStr); //&& parsedStr.every(item => isTodo(item));
          // const parsedIdsIsValidRecord = isValidIdRecord(parsedIds);
  
          if (parsedStrIsTodoArray /* && parsedIdsIsValidRecord */) {
              setAllTodos(parsedStr);
              // displayedTodosArray = parsedStr;
              // todoIds = parsedIds;
          }
      }
    };
    loadStoredTodos();
  }, []);

  return (
    <section className="app">
        <AddTodoForm setTodos={setAllTodos} />
        {/* <AddTodoFormRef setTodos={setTodos} /> */}
        {todos.length === 0 && <NoTodosBlock />}
        <TodosContentBlock 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          todos={todos}
          setTodos={setAllTodos}  
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