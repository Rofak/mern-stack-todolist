import './App.css';
import './assets/progress.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TodoList } from './component/TodoList.tsx';
function App() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [todos, setTodos] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [todoCompleted, setTodoCompleted] = useState<any>([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/todo`)
      .then((result) => {
        setTodos(result.data);
        setTodoCompleted(
          result.data.filter((value: any) => value.completed == true),
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCompleted = (id: any, completed: any) => {
    const tmpTodos = [...todos];
    const todo = tmpTodos.find((value) => value._id == id);
    todo.completed = completed;
    setTodos(tmpTodos);
    setTodoCompleted(todos.filter((value: any) => value.completed == true));
  };

  const handleDelete = (id: number) => {
    axios.delete(`${BASE_URL}/todo/${id}`).then(() => {
      const tmpTodo = todos.filter((value) => value._id != id);
      setTodos(tmpTodo);
      setTodoCompleted(tmpTodo.filter((value: any) => value.completed == true));
    });
  };

  const todoList = todos.map((value: any, index: number) => (
    <TodoList
      onDelete={handleDelete}
      onCompleted={handleCompleted}
      title={value.title}
      completed={value.completed}
      key={index}
      id={value._id}
    />
  ));

  const onAddTodo = () => {
    if (title) {
      axios
        .post(`${BASE_URL}/todo`, {
          title,
          completed: false,
        })
        .then((res) => {
          setTodos([...todos, res.data]);
          setTitle('');
        });
    } else {
      alert('Please Enter Title');
    }
  };

  const onRemoveCheck = () => {
    const tmpTodos = [...todos];
    tmpTodos.forEach((value) => {
      value.completed = false;
      axios.put(`${BASE_URL}/todo/${value._id}`, value);
    });
    setTodos(tmpTodos);
    setTodoCompleted(todos.filter((value: any) => value.completed == true));
  };

  return (
    <>
      <div style={{ width: '500px' }} className="mx-auto">
        <div className="flex">
          <input
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          <button className="btn btn-neutral" onClick={onAddTodo}>
            Add
          </button>
        </div>
        {todoList}
        <div className="flex justify-between items-center mt-3">
          <div className="w-full mr-1 relative">
            <progress
              style={{ height: '20px' }}
              className="progress progress-warning w-full  transition-transform"
              value={todoCompleted.length}
              max={todos.length}
            ></progress>
            <div className="absolute" id="progress_text">
              <strong>{`${todoCompleted.length} of ${todos.length} tasks done `}</strong>
            </div>
          </div>
          <button
            className="btn btn-neutral text-white"
            onClick={onRemoveCheck}
          >
            Remove check
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
