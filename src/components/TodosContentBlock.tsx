import TabBtn from "./TabBtn"
import TodoItem from "./TodoItem"
import { TabControls } from "./MobileTodoTabControls"
// import { IdStore } from "./TodoMain";
import { useContext } from "react";
import { TodoContext } from "../context/useTodo";

// type ITodosContentBlock = {
//     todos: Todo[];
// } & TabControls

const TodosContentBlock: React.FC<TabControls> = ({ activeTab, setActiveTab }) => {
  const { setAllTodos, displayedTodos } = useContext(TodoContext);
    // useEffect(() => {
    //     console.log({todos});

    //     return () => {
    //         console.log('Component unmounted');
    //     }
    // }, [todos]);
  
  const clearCompletedTodos = () => {
    setAllTodos((prevArr) => {
        const todosCopy = prevArr.filter(item => !item.isCompleted);

        return todosCopy;
    });
  };

  return (
    <section className="todos content-block">
        <ul className="todo-list" role="list">
            {displayedTodos.map((item, idx) => (
                <TodoItem 
                    key={idx} 
                    id={item.id} 
                    text={item.text} 
                    isCompleted={item.isCompleted}
                />
            ))}
        </ul>
        <div className="todos-bottom">
            <p className="items-left">
                <span className="todos-count">{displayedTodos.length}</span> items left
            </p>
            <div className="large-todo-tab-controls">
                <TabBtn tabName="All" isActive={activeTab === 'all'} setActiveTab={setActiveTab} />
                <TabBtn tabName="Active" isActive={activeTab === 'active'} setActiveTab={setActiveTab} />
                <TabBtn tabName="Completed" isActive={activeTab === 'completed'} setActiveTab={setActiveTab} />
            </div>
            <div className="">
                <button className="clear-btn focus-visible clear-todos-btn" onClick={clearCompletedTodos}>
                    Clear Completed
                </button>
            </div>
        </div>
    </section>
  )
}

export default TodosContentBlock