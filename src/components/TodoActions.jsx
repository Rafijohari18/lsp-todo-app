import React from 'react';
import { Trash2 } from 'lucide-react';

export default function TodoActions({
	selectedCount,
	statusUpdate,
	setStatusUpdate,
	onUpdateStatus,
	onRemoveSelected,
	onClearAll,
	hasTodos
}) {
	return (
		<div className="flex gap-3 items-center">
			{selectedCount > 0 && (
				<>
					<select
						value={statusUpdate}
						onChange={(e) => setStatusUpdate(e.target.value)}
						className="px-3 py-2 border rounded text-sm"
					>
						<option value="belum">Belum</option>
						<option value="selesai">Selesai</option>
					</select>

					<button onClick={onUpdateStatus} className="px-4 py-2 bg-green-600 text-white rounded text-sm">
						Update Status Selected ({selectedCount})
					</button>

					<button onClick={onRemoveSelected} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors">
						<Trash2 size={16} /> Delete Selected ({selectedCount})
					</button>
				</>
			)}

			{hasTodos && (
				<button onClick={onClearAll} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors">
					<Trash2 size={16} /> Delete All
				</button>
			)}
		</div>
	);
}
