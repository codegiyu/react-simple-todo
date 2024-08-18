import { FormEvent, useRef } from "react"
import { Todo } from "./TodoItem";

interface IAddTodoFormRef {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const AddTodoFormRef = ({ setTodos }: IAddTodoFormRef) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    if (inputRef.current) {
      const input = inputRef.current.value.trim();
  
      // Sanitization (innerText of html elements usually escapes dangerous characters)
      const element = document.createElement('div');
      element.innerText = input;
  
      const sanitizedTodo = element.innerHTML;
  
      if (sanitizedTodo) {
        const newTodo: Todo = {
          id: createId(),
          text: sanitizedTodo,
          isCompleted: false
        };
  
        setTodos((prev) => {
          const todosCopy = [...prev];
  
          todosCopy.unshift(newTodo);
          return todosCopy;
        });
        
        // updateStorage();
        // displayTabSpecificTodos();
      }
  
      form.reset();
    }
  };

  function createId() {
    // Create a string of 6 random numbers;
    const randomNum = String(Math.random()).slice(-4);

    // If that string exists in the global id store, create another... 
    // ...until you get one that is unique in the store
    // while(todoIds[randomNum]) {
    //     randomNum = String(Math.random()).slice(-4);
    // }

    // // Set that id in the global id store as a property
    // todoIds[randomNum] = true;

    return randomNum;
  }

  return (
    <form onSubmit={handleSubmit} className="add-todo content-block">
      <label className="input-group">
        <span className="radio-circle"></span>
        <input 
          type="text"
          className="todo-input"
          name="todo"
          ref={inputRef}
          placeholder="Create a new todo"
        />
      </label>
    </form>
  )
}

export default AddTodoFormRef