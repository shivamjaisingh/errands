import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

const HackerTaskDashboard = () => {
  const [tasks, setTasks] = useState([]);

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

  const [newTaskTitle, setNewTaskTitle] = useState('');

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

  const clearAllTasks = () => {
    const confirmClear = window.confirm("Are you sure you want to clear all tasks?");
    if (confirmClear) {
      localStorage.removeItem('tasks');
      setTasks([]);
    }
  };

  // Calculate completion progress
  const completedTasks = tasks.filter(task => task.completed);
  const completionPercentage = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  // Separate completed and pending tasks
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="bg-black min-h-screen p-4 sm:p-6 text-green-400 font-mono">
      <div className="max-w-4xl mx-auto bg-black border-2 border-green-400 rounded-lg p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center uppercase tracking-widest">
          Task Execution System
        </h1>

        {/* Hacker Progress Bar */}
        <div className="mb-4 sm:mb-6 w-full bg-black border-2 border-green-400 rounded-full overflow-hidden">
          <div 
            className="h-4 bg-green-400 transition-all duration-500" 
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        {/* Progress Text */}
        <div className="text-center mb-4 sm:mb-6">
          <p className="text-lg sm:text-xl">
            TASKS COMPLETED: {completedTasks.length} / {tasks.length}
          </p>
        </div>

        {/* Controls */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2">
          <input 
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
            placeholder="Enter new task > "
            className="flex-grow p-3 bg-black border-2 border-green-400 text-green-400 focus:outline-none w-full"
          />
          <div className="flex gap-2">
            <button 
              onClick={addNewTask}
              className="bg-green-400 text-black px-4 py-2 hover:bg-green-300 transition-colors w-full sm:w-auto"
            >
              ADD TASK
            </button>
            <button
              onClick={clearAllTasks}
              className="bg-red-600 text-black px-4 py-2 hover:bg-red-500 transition-colors w-full sm:w-auto"
            >
              CLEAR ALL
            </button>
          </div>
        </div>

        {/* Tasks Container */}
        {/* Use responsive classes: one column by default, two columns on small screens and up */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Pending Tasks */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 uppercase tracking-wider text-center sm:text-left">
              Pending Tasks
            </h2>
            <div className="space-y-4">
              {pendingTasks.map(task => (
                <div 
                  key={task.id} 
                  className="bg-black border-2 border-gray-600 text-gray-400 flex items-center justify-between p-4 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <XCircle className="text-gray-600 w-5 h-5" />
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
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 uppercase tracking-wider text-center sm:text-left">
              Completed Tasks
            </h2>
            <div className="space-y-4">
              {completedTasks.map(task => (
                <div 
                  key={task.id} 
                  className="bg-black border-2 border-green-600 text-green-400 flex items-center justify-between p-4 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <CheckCircle2 className="text-green-600 w-5 h-5" />
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
