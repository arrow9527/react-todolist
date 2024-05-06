import { useState, useEffect } from 'react'
import './App.css'

import { SAMPLE_DATA } from './data/Todo';

function App() {
  function TodoItem({ todo, toggleCompleted, handleDeleteItem }) {
    return (
      <div className="todoItem" key={todo.id}>
        <input type="checkbox" checked={todo.isCompleted} onChange={() => toggleCompleted(todo.id)} />
        <p>{todo.text}</p>
        <button onClick={() => handleDeleteItem(todo)}>刪除</button>
      </div>
    );
  }
  function TodoForm({ addTodo }) {
    const [value, setValue] = useState('');
  
    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue('');
    };
  
    return (
      <form className="userInputContainer" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="新增待辦事項..."
        />
      </form>
    );
  }

  const [todos, setTodos] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [percentComplete, setPercentComplete] = useState(0);
  
  useEffect(() => {
    setTodos(SAMPLE_DATA);
  }, []);

  useEffect(() => {
    // 使用 reduce 計算完成任务的數
    const count = todos.reduce((count, todo) => {
      // 如果任務已完成，增加計數器
      if (todo.isCompleted) {
        return count + 1;
      }
      return count;
    }, 0); // 初始化計數器為 0
    
    setCompletedCount(count);
  }, [todos]);

  useEffect(() => {
    const percentage = isFinite((completedCount / todos.length) * 100) && (completedCount / todos.length) * 100 || 0;
    setPercentComplete(percentage);
    let count = percentComplete;
    // console.log(count > percentage, count , percentage);
    if (count > percentage) {
      const intervalId = setInterval(() => {
        count--;
        // console.log(count);
        if (count <= percentage) {
          clearInterval(intervalId);
        }
        setBackgroundColor(`linear-gradient(to right, #fbec49 0%, #fbec49 ${count}%, transparent ${count}%, transparent 100%)`);

      }, 1);
    } else if (count < percentage) {
      const intervalId = setInterval(() => {
        count++;
        // console.log(count);
        if (count >= percentage) {
          clearInterval(intervalId);
        }
        setBackgroundColor(`linear-gradient(to right, #fbec49 0%, #fbec49 ${count}%, transparent ${count}%, transparent 100%)`);
      }, 1);
    }
  }, [completedCount, todos.length]);
  
  const handleDeleteItem = itemToRemove => {
    // 複製陣列
    const newTodos = [...todos];
        
    // 找到要刪除的物件在陣列中的索引
    const indexToRemove = newTodos.findIndex(item => item === itemToRemove);

    // 如果找到了該物件，則從新陣列中刪除它
    if (indexToRemove !== -1) {
        newTodos.splice(indexToRemove, 1);
        // 更新狀態
        setTodos(newTodos);
    }
  }

  const addTodo = text => {
    const maxId = isFinite(Math.max(...todos.map(p => p.id))) && Math.max(...todos.map(p => p.id)) || 0;
    const newTodos = [...todos, { id: maxId + 1, text, isCompleted: false }];
    setTodos(newTodos);
  };

  const toggleCompleted = id => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(item => item.id === id);
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      {/* 主外框 */}
      <div className="mainContainer">
        {/* 標題 */}
        <h1 className="title">Todo list</h1>
        {/* 代辦完成計數器 */}
        <span className='calculationContainer' style={{ background: backgroundColor }}>
          {/* {completedCount} of {todos.length} tasks done */}
          已完成 {completedCount} 項任務（共{todos.length}項）
        </span>
        <hr />

        {/* 代辦事項列表 */}
        <div className="todoItemsList">
          {/* 渲染 todo 事項 */}
          {todos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleCompleted={toggleCompleted}
                handleDeleteItem={handleDeleteItem}
              />
            );
          })}
        </div>
        {/* 待辦事項輸入欄位 */}
        <TodoForm addTodo={addTodo} />
      </div>
    </>
  )
}

export default App
