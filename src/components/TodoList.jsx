import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import TodoStats from './TodoStats';
import TodoActions from './TodoActions';
import Swal from 'sweetalert2';

export default function TodoList() {
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
		Swal.fire({
			title: 'Yakin ingin menghapus todo ini?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya, hapus!',
			cancelButtonText: 'Batal',
		}).then((result) => {
			if (result.isConfirmed) {
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
	
				Swal.fire('Dihapus!', 'Todo berhasil dihapus.', 'success');
			}
		});
	};

	const removeSelectedTodos = () => {
		Swal.fire({
			title: `Yakin ingin menghapus ${selectedIds.size} todo terpilih?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya, hapus!',
			cancelButtonText: 'Batal',
		}).then((result) => {
			if (result.isConfirmed) {
				setTodos(todos.filter((todo) => !selectedIds.has(todo.id)));
				setSelectedIds(new Set());

				if (editingId && selectedIds.has(editingId)) {
					setEditingId(null);
					setInputValue('');
					setInputStatus('belum');
				}

				Swal.fire('Dihapus!', 'Todo terpilih telah dihapus.', 'success');
			}
		});
	};

	const clearTodos = () => {
		Swal.fire({
			title: 'Yakin ingin menghapus semua todo?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Ya, hapus semua!',
			cancelButtonText: 'Batal',
		}).then((result) => {
			if (result.isConfirmed) {
				setTodos([]);
				setSelectedIds(new Set());
				setEditingId(null);
				setInputValue('');
				setInputStatus('belum');
	
				Swal.fire('Dihapus!', 'Semua todo telah dihapus.', 'success');
			}
		});
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
		<div className="min-h-screen flex items-center justify-center p-5" style={{ backgroundImage: 'linear-gradient(100deg, #575656, #062e3f)' }}>
			<div className="w-full max-w-4xl">
				<div className="bg-white rounded-2xl shadow-lg p-8">
					<h6 className="text-lg font-medium mb-6 text-gray-700">Todo List App</h6>

					<TodoForm
						inputValue={inputValue}
						inputStatus={inputStatus}
						setInputValue={setInputValue}
						setInputStatus={setInputStatus}
						onSubmit={addOrUpdateTodo}
						editing={!!editingId}
					/>

					<ul className="space-y-2">
						{todos.map((todo) => (
							<TodoItem
								key={todo.id}
								todo={todo}
								isSelected={selectedIds.has(todo.id)}
								onToggleSelect={() => toggleSelect(todo.id)}
								onRemove={() => removeTodo(todo.id)}
								onToggleStatus={() => toggleStatus(todo.id)}
							/>
						))}
					</ul>
					<div className="mt-6 pt-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<TodoStats todos={todos} />
						<TodoActions
							selectedCount={selectedIds.size}
							statusUpdate={statusUpdate}
							setStatusUpdate={setStatusUpdate}
							onUpdateStatus={updateStatusSelected}
							onRemoveSelected={removeSelectedTodos}
							onClearAll={clearTodos}
							hasTodos={todos.length > 0}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
