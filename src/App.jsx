import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  // Initial state with one default list
  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem('mono-todo-lists');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: '1',
        name: 'My Tasks',
        todos: [
          {
            id: '101',
            text: 'Welcome to Mono Todo',
            completed: false,
            starred: true,
            dueDate: null,
            notes: 'This is a starred task with a note.'
          },
          {
            id: '102',
            text: 'Try adding a new task',
            completed: false,
            starred: false,
            dueDate: null,
            notes: ''
          },
        ]
      }
    ];
  });

  const [activeListId, setActiveListId] = useState(() => {
    const saved = localStorage.getItem('mono-todo-active');
    return saved || '1';
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('mono-todo-lists', JSON.stringify(lists));
  }, [lists]);

  useEffect(() => {
    localStorage.setItem('mono-todo-active', activeListId);
  }, [activeListId]);

  const activeList = lists.find(l => l.id === activeListId);

  // List Actions
  const addList = (name) => {
    const newList = {
      id: Date.now().toString(),
      name,
      todos: []
    };
    setLists([...lists, newList]);
    setActiveListId(newList.id);
  };

  const deleteList = (id) => {
    const newLists = lists.filter(l => l.id !== id);
    setLists(newLists);
    if (activeListId === id && newLists.length > 0) {
      setActiveListId(newLists[0].id);
    }
  };

  // Todo Actions
  const addTodo = (listId, text) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          todos: [
            ...list.todos,
            {
              id: Date.now().toString(),
              text,
              completed: false,
              starred: false,
              dueDate: null,
              notes: ''
            }
          ]
        };
      }
      return list;
    }));
  };

  const toggleTodo = (todoId) => {
    setLists(lists.map(list => {
      if (list.id === activeListId) {
        return {
          ...list,
          todos: list.todos.map(todo =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
          )
        };
      }
      return list;
    }));
  };

  const deleteTodo = (todoId) => {
    setLists(lists.map(list => {
      if (list.id === activeListId) {
        return {
          ...list,
          todos: list.todos.filter(todo => todo.id !== todoId)
        };
      }
      return list;
    }));
  };

  const updateTodo = (todoId, updates) => {
    setLists(lists.map(list => {
      if (list.id === activeListId) {
        return {
          ...list,
          todos: list.todos.map(todo =>
            todo.id === todoId ? { ...todo, ...updates } : todo
          )
        };
      }
      return list;
    }));
  };

  return (
    <div className="app-container">
      <button
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={24} />
      </button>

      <div className={`sidebar-wrapper ${sidebarOpen ? 'open' : ''}`}>
        <Sidebar
          lists={lists}
          activeListId={activeListId}
          onSelectList={(id) => {
            setActiveListId(id);
            if (window.innerWidth <= 768) setSidebarOpen(false);
          }}
          onAddList={addList}
          onDeleteList={deleteList}
        />
      </div>

      <main className="main-content" onClick={() => {
        if (window.innerWidth <= 768 && sidebarOpen) setSidebarOpen(false);
      }}>
        <TodoList
          activeList={activeList}
          onAddTodo={addTodo}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={updateTodo}
        />
      </main>
    </div>
  );
}

export default App;
