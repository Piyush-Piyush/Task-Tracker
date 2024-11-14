import React, { useEffect, useState } from 'react';
import { EnterTaskCard } from './components/EnterTaskCard/EnterTaskCard';
import { TaskCard } from './components/TaskCard/TaskCard';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:3001/get')
      .then(result => {
        const data = result.data;
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error('Expected an array but got:', data);
          setTasks([]);
        }
      })
      .catch(err => {
        console.error('Error fetching tasks:', err);
        setTasks([]);
      });
  };

  const addTask = (task) => {
    if (task) {
      setTasks(prevTasks => [...prevTasks, task]); 
    }
  };

  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:3001/delete/${taskId}`)
      .then(() => {
        fetchTasks(); 
      })
      .catch(err => console.error('Error deleting task:', err));
  };

  const updateTask = (taskId, newStatus) => {
    axios.patch(`http://localhost:3001/update/${taskId}`, { status: newStatus })
      .then(() => {
        fetchTasks(); 
      })
      .catch(err => console.error('Error updating task:', err));
  };

  return (
    <>
      <div className="min-h-screen bg-[url('https://cdn.pixabay.com/photo/2022/03/07/15/24/backpack-7053965_1280.png')] bg-cover bg-center h-64 w-full">

      <section className="flex flex-col gap-y-4 items-center max-w-lg mx-auto text-center">
        <h1 className="text-4xl font-bold text-primary">Todo</h1>
        <p className="text-xl text-muted-foreground">Get Things Done with Ease.</p>
      </section>

      <section className='mt-5 w-[100vw] flex justify-center'>
        <EnterTaskCard onAddTask={addTask} />
      </section>

      <section className='mt-5 flex flex-col items-center gap-4'>
        {tasks.map((task) => (
          <TaskCard
            key={task._id} 
            taskId={task._id}
            task={task.name}
            status={task.status}
            onDelete={() => deleteTask(task._id)}
            onUpdateStatus={updateTask} 
          />
        ))}
      </section>
      </div>
    </>
  );
}

export default App;
