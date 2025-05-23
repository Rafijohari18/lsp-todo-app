import React from 'react';

export default function TodoStats({ todos }) {
	const total = todos.length;
	const selesai = todos.filter(t => t.status === 'selesai').length;
	const belum = total - selesai;

	return (
		<div className="text-sm text-gray-600 space-x-4">
			<span>Total: {total} tasks</span>
			<span>Selesai: {selesai}</span>
			<span>Belum: {belum}</span>
		</div>
	);
}
