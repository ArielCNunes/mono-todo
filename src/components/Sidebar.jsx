import React, { useState } from 'react';
import { Plus, List, Trash2 } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ lists, activeListId, onSelectList, onAddList, onDeleteList }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newListName, setNewListName] = useState('');

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (newListName.trim()) {
            onAddList(newListName.trim());
            setNewListName('');
            setIsAdding(false);
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Lists</h2>
                <button onClick={() => setIsAdding(true)} className="add-list-btn" aria-label="Add List">
                    <Plus size={20} />
                </button>
            </div>

            <div className="lists-container">
                {lists.map(list => (
                    <div
                        key={list.id}
                        className={`list-item ${list.id === activeListId ? 'active' : ''}`}
                        onClick={() => onSelectList(list.id)}
                    >
                        <div className="list-item-content">
                            <List size={16} className="list-icon" />
                            <span className="list-name">{list.name}</span>
                        </div>
                        {lists.length > 1 && (
                            <button
                                className="delete-list-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteList(list.id);
                                }}
                            >
                                <Trash2 size={14} />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {isAdding && (
                <form onSubmit={handleAddSubmit} className="add-list-form">
                    <input
                        autoFocus
                        type="text"
                        placeholder="List name..."
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        onBlur={() => {
                            if (!newListName.trim()) setIsAdding(false);
                        }}
                    />
                </form>
            )}
        </div>
    );
};

export default Sidebar;
