import React, { useState } from 'react';
import { Plus, Eye, EyeOff } from 'lucide-react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ activeList, onAddTodo, onToggleTodo, onDeleteTodo, onUpdateTodo }) => {
    const [newTodoText, setNewTodoText] = useState('');
    const [hideCompleted, setHideCompleted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodoText.trim()) {
            onAddTodo(activeList.id, newTodoText.trim());
            setNewTodoText('');
        }
    };

    if (!activeList) {
        return (
            <div className="todo-list-empty">
                <p>Select or create a list to get started.</p>
            </div>
        );
    }

    const visibleTodos = hideCompleted
        ? activeList.todos.filter(t => !t.completed)
        : activeList.todos;

    return (
        <div className="todo-list-container">
            <header className="list-header">
                <div className="header-top">
                    <h1>{activeList.name}</h1>
                    <button
                        className="toggle-completed-btn"
                        onClick={() => setHideCompleted(!hideCompleted)}
                        title={hideCompleted ? "Show completed" : "Hide completed"}
                    >
                        {hideCompleted ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>
                <p className="task-count">
                    {activeList.todos.filter(t => !t.completed).length} tasks remaining
                </p>
            </header>

            <div className="add-task-container">
                <form onSubmit={handleSubmit} className="add-task-form">
                    <Plus size={20} className="add-icon" />
                    <input
                        type="text"
                        placeholder="Add a task..."
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                    />
                </form>
            </div>

            <div className="tasks-list">
                {activeList.todos.length === 0 ? (
                    <div className="empty-state">
                        <p>No tasks yet.</p>
                    </div>
                ) : visibleTodos.length === 0 && hideCompleted ? (
                    <div className="empty-state">
                        <p>No active tasks.</p>
                    </div>
                ) : (
                    visibleTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={onToggleTodo}
                            onDelete={onDeleteTodo}
                            onUpdate={onUpdateTodo}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoList;
