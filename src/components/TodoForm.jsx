import React from 'react';
import { Plus } from 'lucide-react';

export default function TodoForm({
	inputValue,
	inputStatus,
	setInputValue,
	setInputStatus,
	onSubmit,
	editing,
}) {
	return (
		<form
			className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6"
			onSubmit={onSubmit}
		>
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				className="w-full sm:flex-1 px-4 py-2 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
				placeholder="Enter Title"
			/>
			<select
				value={inputStatus}
				onChange={(e) => setInputStatus(e.target.value)}
				className="w-full sm:w-auto px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
			>
				<option value="belum">Belum</option>
				<option value="selesai">Selesai</option>
			</select>
			<button
				type="submit"
				className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition"
			>
				<Plus size={20} />
				{editing ? 'Update' : 'Add'}
			</button>
		</form>
	);
}
