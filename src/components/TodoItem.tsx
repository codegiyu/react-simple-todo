import React, { useState } from 'react'
import { Modal } from './Modal';

export interface Todo {
    id: string;
    text: string;
    isCompleted: boolean;
}

interface TodoItemProps extends Todo {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, isCompleted, setTodos }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const isChecked = target.checked;

    setTodos((prevArr) => {
      // const todosCopy = prevArr.map(item => {
      //     if (item.id === id) {
      //         item.isCompleted = isChecked;
      //     }

      //     return item;
      // })
      
      const todosCopy = [...prevArr];

      const todoIndex = todosCopy.findIndex(item => item.id === id);

      todosCopy[todoIndex].isCompleted = isChecked;
      localStorage.setItem("todos-list", JSON.stringify(todosCopy));

      return todosCopy;
    });
  };

  const deleteTodoItem = () => {
    setTodos(prevArr => {
        const todosCopy = prevArr.filter(item => item.id !== id);
        localStorage.setItem("todos-list", JSON.stringify(todosCopy));

        return todosCopy;

        // const todosCopy = [...prevArr];

        // const todoIndex = todosCopy.findIndex(item => item.id === id);

        // todosCopy.splice(todoIndex, 1);

        // return todosCopy;
    })
  };

  const handleDelete = () => {
    if (isCompleted) {
      deleteTodoItem();
    } else {
      setModalOpen(true);
    }
  };

  const closeModal = () => setModalOpen(false);

  return (
    <li id={id} className="todo-list-item" role="listitem">
        <input 
            type="checkbox" 
            data-id={id} 
            name="" 
            className="radio-circle checkbox focus-visible"
            checked={isCompleted}
            onChange={handleChange}
        />
        <p className="todo-text">{text}</p>
        <div className="cancel-btn-wrap">
            <button data-id={id} className="cancel-todo-btn clear-btn focus-visible" onClick={handleDelete}>
                <svg viewBox="0 0 18 18" width="1em" height="1em" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.6777 0.707107L16.9706 0L8.83883 8.13173L0.707107 0L0 0.707107L8.13173 8.83883L0 16.9706L0.707106 17.6777L8.83883 9.54594L16.9706 17.6777L17.6777 16.9706L9.54594 8.83883L17.6777 0.707107Z" fill="currentColor"/>
                    </g>
                </svg>
            </button>
        </div>
        
        <Modal show={modalOpen} onClose={closeModal}>
          <div className="modal-content-child">
            <h3>This task is not yet completed</h3>
            <p>Are you sure you want to delete it?</p>
            <div className="del-btns-row">
              <button onClick={deleteTodoItem}>Yes</button>
              <button onClick={closeModal}>No</button>
            </div>
          </div>
        </Modal>
    </li>
  )
}

export default TodoItem;


// export type Todo = {
//    id: string;
//    text: string;
//    isCompleted: boolean;
// }

// type TodoItemProps = Todo & {
//    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
// }

// interface Todo {
//     age: number;
// }

// const myTodo: Todo = {
//     id: 'yui',
//     text: 'Hello world',
//     isCompleted: false,
// }