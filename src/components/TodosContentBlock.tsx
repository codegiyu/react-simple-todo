import TabBtn from "./TabBtn"
import TodoItem, { Todo } from "./TodoItem"
import { TabControls } from "./MobileTodoTabControls"

type ITodosContentBlock = {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
} & TabControls

const TodosContentBlock: React.FC<ITodosContentBlock> = ({ activeTab, setActiveTab, todos, setTodos }) => {
    // useEffect(() => {
    //     console.log({todos});

    //     return () => {
    //         console.log('Component unmounted');
    //     }
    // }, [todos]);
  
  const clearCompletedTodos = () => {
    setTodos((prevArr) => {
        const todosCopy = prevArr.filter(item => !item.isCompleted);

        return todosCopy;
    });
  };

  return (
    <section className="todos content-block">
        <ul className="todo-list" role="list">
            {todos.map((item, idx) => (
                <TodoItem 
                    key={idx} 
                    id={item.id} 
                    text={item.text} 
                    isCompleted={item.isCompleted}
                    setTodos={setTodos}
                />
            ))}
        </ul>
        <div className="todos-bottom">
            <p className="items-left">
                <span className="todos-count">{todos.length}</span> items left
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