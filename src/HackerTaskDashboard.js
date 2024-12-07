import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

const HackerTaskDashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Clean Dishes", completed: false },
    { id: 2, title: "Vacuum", completed: false },
    { id: 3, title: "Code Dashboard", completed: false },
    { id: 4, title: "Change Light Bulbs", completed: false },
    { id: 5, title: "Clean Work Table", completed: false },
    { id: 6, title: "Assemble Table", completed: false }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const addNewTask = () => {
    if (newTaskTitle.trim() === '') return;

    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      title: newTaskTitle,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  // Calculate completion progress
  const completedTasks = tasks.filter(task => task.completed);
  const completionPercentage = (completedTasks.length / tasks.length) * 100;

  // Separate completed and pending tasks
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="bg-black min-h-screen p-6 text-green-400 font-mono">
      <div className="max-w-4xl mx-auto bg-black border-2 border-green-400 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center uppercase tracking-widest">
          Task Execution System
        </h1>

        {/* Hacker Progress Bar */}
        <div className="mb-6 w-full bg-black border-2 border-green-400 rounded-full overflow-hidden">
          <div 
            className="h-4 bg-green-400 transition-all duration-500" 
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        {/* Progress Text */}
        <div className="text-center mb-6">
          <p className="text-xl">
            TASKS COMPLETED: {completedTasks.length} / {tasks.length}
          </p>
        </div>

        {/* Task Input */}
        <div className="mb-6 flex">
          <input 
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
            placeholder="Enter new task > "
            className="flex-grow p-3 bg-black border-2 border-green-400 text-green-400 focus:outline-none"
          />
          <button 
            onClick={addNewTask}
            className="bg-green-400 text-black px-4 hover:bg-green-300 transition-colors"
          >
            ADD TASK
          </button>
        </div>

        {/* Tasks Container */}
        <div className="grid grid-cols-2 gap-6">
          {/* Pending Tasks */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 uppercase tracking-wider">
              Pending Tasks
            </h2>
            <div className="space-y-4">
              {pendingTasks.map(task => (
                <div 
                  key={task.id} 
                  className="bg-black border-2 border-gray-600 text-gray-400 flex items-center justify-between p-4 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <XCircle className="text-gray-600" />
                    <span className="font-medium">{task.title}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => toggleTaskCompletion(task.id)}
                      className="bg-green-400 text-black px-2 py-1 text-sm hover:bg-green-300"
                    >
                      COMPLETE
                    </button>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-600 text-black px-2 py-1 text-sm hover:bg-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Tasks */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 uppercase tracking-wider">
              Completed Tasks
            </h2>
            <div className="space-y-4">
              {completedTasks.map(task => (
                <div 
                  key={task.id} 
                  className="bg-black border-2 border-green-600 text-green-400 flex items-center justify-between p-4 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <CheckCircle2 className="text-green-600" />
                    <span className="font-medium line-through">{task.title}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => toggleTaskCompletion(task.id)}
                      className="bg-red-600 text-black px-2 py-1 text-sm hover:bg-red-500"
                    >
                      UNDO
                    </button>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-600 text-black px-2 py-1 text-sm hover:bg-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackerTaskDashboard;
