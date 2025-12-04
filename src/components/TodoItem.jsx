import React, { useState, useRef, useEffect } from 'react';
import { Check, Trash2, Edit2, Star, ChevronDown, ChevronUp, Calendar, AlignLeft } from 'lucide-react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editText.trim()) {
            onUpdate(todo.id, { text: editText.trim() });
            setIsEditing(false);
        } else {
            setEditText(todo.text);
            setIsEditing(false);
        }
    };

    const handleDateChange = (e) => {
        onUpdate(todo.id, { dueDate: e.target.value });
    };

    const handleNotesChange = (e) => {
        onUpdate(todo.id, { notes: e.target.value });
    };

    return (
        <div className={`todo-item-wrapper ${isExpanded ? 'expanded' : ''}`}>
            <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <button
                    className={`checkbox ${todo.completed ? 'checked' : ''}`}
                    onClick={() => onToggle(todo.id)}
                >
                    {todo.completed && <Check size={12} strokeWidth={3} />}
                </button>

                <button
                    className={`star-btn ${todo.starred ? 'starred' : ''}`}
                    onClick={() => onUpdate(todo.id, { starred: !todo.starred })}
                >
                    <Star size={18} fill={todo.starred ? "currentColor" : "none"} />
                </button>

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="edit-form">
                        <input
                            ref={inputRef}
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onBlur={handleSubmit}
                        />
                    </form>
                ) : (
                    <div className="todo-content" onDoubleClick={() => setIsEditing(true)}>
                        <span className="todo-text">{todo.text}</span>
                        <div className="todo-badges">
                            {todo.dueDate && (
                                <span className="badge date-badge">
                                    <Calendar size={10} />
                                    {new Date(todo.dueDate).toLocaleDateString()}
                                </span>
                            )}
                            {todo.notes && (
                                <span className="badge notes-badge">
                                    <AlignLeft size={10} />
                                </span>
                            )}
                        </div>
                    </div>
                )}

                <div className="todo-actions">
                    <button className="action-btn" onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    <button className="action-btn edit-btn" onClick={() => setIsEditing(true)}>
                        <Edit2 size={14} />
                    </button>
                    <button className="action-btn delete-btn" onClick={() => onDelete(todo.id)}>
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="todo-details">
                    <div className="detail-row">
                        <label>
                            <Calendar size={14} />
                            Due Date
                        </label>
                        <input
                            type="date"
                            value={todo.dueDate || ''}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className="detail-row">
                        <label>
                            <AlignLeft size={14} />
                            Notes
                        </label>
                        <textarea
                            placeholder="Add notes..."
                            value={todo.notes || ''}
                            onChange={handleNotesChange}
                            rows={3}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoItem;
