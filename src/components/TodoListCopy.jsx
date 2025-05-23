import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export default function TodoListCopy() {
	const [todos, setTodos] = useState([
		{ id: 1, title: 'Belajar PHP', status: 'belum' },
		{ id: 2, title: 'Kerjakan Tugas UX', status: 'selesai' },
	]);

	const [inputValue, setInputValue] = useState('');
	const [inputStatus, setInputStatus] = useState('belum'); // tambah state untuk status select
	const [selectedIds, setSelectedIds] = useState(new Set());
	const [statusUpdate, setStatusUpdate] = useState('belum'); // status dipilih untuk update

	const [editingId, setEditingId] = useState(null); // state untuk edit mode

	const addOrUpdateTodo = (e) => {
		e.preventDefault();
		if (!inputValue.trim()) return;

		if (editingId) {
		// update todo yang sedang diedit
		setTodos(
			todos.map((todo) =>
			todo.id === editingId
				? { ...todo, title: inputValue.trim(), status: inputStatus }
				: todo
			)
		);
		setEditingId(null);
		} else {
		// tambah todo baru
		const newTodo = {
			id: Date.now(),
			title: inputValue.trim(),
			status: inputStatus,
		};
		setTodos([...todos, newTodo]);
		}

		setInputValue('');
		setInputStatus('belum');
	};


	// Toggle select/deselect todo for deletion
	const toggleSelect = (id) => {
		const newSelected = new Set(selectedIds);
		if (newSelected.has(id)) {
		newSelected.delete(id);
		} else {
		newSelected.add(id);
		}
		setSelectedIds(newSelected);
	};

	// Remove single todo
	const removeTodo = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id));
		setSelectedIds((prev) => {
		const newSelected = new Set(prev);
		newSelected.delete(id);
		return newSelected;
		});

		// jika sedang edit todo yang dihapus, reset form
		if (editingId === id) {
		setEditingId(null);
		setInputValue('');
		setInputStatus('belum');
		}
	};

	// Remove all selected todos
	const removeSelectedTodos = () => {
		if (
		window.confirm(
			`Yakin ingin menghapus ${selectedIds.size} todo terpilih?`
		)
		) {
		setTodos(todos.filter((todo) => !selectedIds.has(todo.id)));
		setSelectedIds(new Set());

		// reset form jika ada todo yg sedang diedit ikut terhapus
		if (editingId && selectedIds.has(editingId)) {
			setEditingId(null);
			setInputValue('');
			setInputStatus('belum');
		}
		}
	};

	// Remove all todos
	const clearTodos = () => {
		if (window.confirm('Yakin ingin menghapus semua todo?')) {
		setTodos([]);
		setSelectedIds(new Set());
		setEditingId(null);
		setInputValue('');
		setInputStatus('belum');
		}
	};

    // Update status untuk semua selected todos
	const updateStatusSelected = () => {
		if (selectedIds.size === 0) return;
		setTodos(
			todos.map((todo) =>
			selectedIds.has(todo.id) ? { ...todo, status: statusUpdate } : todo
			)
		);
		setSelectedIds(new Set());
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center p-5"
			style={{ backgroundImage: 'linear-gradient(100deg, #575656, #062e3f)' }}
		>
		<div className="w-full max-w-4xl">
			<div className="bg-white rounded-2xl shadow-lg p-8">
			<h6 className="text-lg font-medium mb-6 text-gray-700">
				Todo List App
			</h6>

			{/* Add / Update Todo Form */}
			<form className="flex items-center gap-3 mb-6" onSubmit={addOrUpdateTodo}>
				<div className="flex-1 relative">
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					className="w-full px-4 py-2 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
					placeholder="Enter Title"
				/>
				</div>

				{/* Dropdown select status */}
				<select
				value={inputStatus}
				onChange={(e) => setInputStatus(e.target.value)}
				className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
				title="Select status"
				>
				<option value="belum">Belum</option>
				<option value="selesai">Selesai</option>
				</select>

				<button
				type="submit"
				className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
				>
				<Plus size={20} />
				{editingId ? 'Update' : 'Add'}
				</button>
			</form>

			{/* Todo List */}
			<ul className="space-y-2">
				{todos.map((todo) => (
				<li
					key={todo.id}
					className={`flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
					selectedIds.has(todo.id) ? 'bg-yellow-100' : ''
					}`}
				>
					<div className="flex items-center gap-3 flex-1">
					{/* Checkbox untuk select */}
					<input
						type="checkbox"
						checked={selectedIds.has(todo.id)}
						onChange={() => toggleSelect(todo.id)}
						className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
						title="Select todo"
					/>

					{/* Klik title untuk toggle status */}
					<span
						onClick={() => toggleStatus(todo.id)}
						className={`text-lg select-none cursor-pointer ${
						todo.status === 'selesai'
							? 'line-through text-gray-500'
							: 'text-gray-800'
						}`}
						title={`Status: ${todo.status}`}
					>
						{todo.title} - {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
					</span>
					</div>

					<button
					onClick={() => removeTodo(todo.id)}
					className="text-blue-600 hover:text-red-600 transition-colors p-1"
					title="Remove item"
					>
					<X size={20} />
					</button>
				</li>
				))}
			</ul>

			{/* Stats & Actions */}
			<div className="mt-6 pt-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div className="text-sm text-gray-600 space-x-4">
				<span>Total: {todos.length} tasks</span>
				<span>
					Selesai:{' '}
					{todos.filter((todo) => todo.status === 'selesai').length}
				</span>
				<span>
					Belum: {todos.filter((todo) => todo.status === 'belum').length}
				</span>
				</div>

				<div className="flex gap-3 items-center">
				{selectedIds.size > 0 && (
					<>
					{/* Dropdown status update */}
					<select
						value={statusUpdate}
						onChange={(e) => setStatusUpdate(e.target.value)}
						className="px-3 py-2 border rounded text-sm"
						title="Pilih status untuk update"
					>
						<option value="belum">Belum</option>
						<option value="selesai">Selesai</option>
					</select>

					<button
						onClick={updateStatusSelected}
						className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors"
					>
						Update Status Selected ({selectedIds.size})
					</button>

					<button
						onClick={removeSelectedTodos}
						className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
					>
						<Trash2 size={16} />
						Delete Selected ({selectedIds.size})
					</button>
					</>
				)}

				{todos.length > 0 && (
					<button
					onClick={clearTodos}
					className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
					>
					<Trash2 size={16} />
					Delete All
					</button>
				)}
				</div>
			</div>
			</div>
		</div>
		</div>
	);
}
