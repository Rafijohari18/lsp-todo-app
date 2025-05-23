import React from 'react';
import { X } from 'lucide-react';

export default function TodoItem({ todo, isSelected, onToggleSelect, onRemove, onToggleStatus }) {
	return (
		<li className={`flex items-center justify-between p-3 border-b border-gray-200 ${isSelected ? 'bg-yellow-100' : ''}`}>
			<div className="flex items-center gap-3 flex-1">
				<input
					type="checkbox"
					checked={isSelected}
					onChange={onToggleSelect}
					className="w-5 h-5"
				/>
				<span
					onClick={onToggleStatus}
					className={`text-lg cursor-pointer ${todo.status === 'selesai' ? 'line-through text-gray-500' : 'text-gray-800'}`}
				>
					{todo.title} - {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
				</span>
			</div>
			<button onClick={onRemove} className="text-blue-600 hover:text-red-600 p-1">
				<X size={20} />
			</button>
		</li>
	);
}
