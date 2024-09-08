import React from 'react';

interface DeletePopupProps {
    threadId: string;
    onClose: () => void;
    onDelete: (threadId: string) => void;
}

const DeletePopup: React.FC<DeletePopupProps> = ({ threadId, onClose, onDelete }) => {
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`, {
                method: 'DELETE',
                headers: {
                    Authorization:
                      `Bearer ${token}`,
                  },
            });
            const data = await response.json();
            if (data.status === 200) {
                onDelete(threadId);
                onClose();
            } else {
                console.error('Failed to delete email messages', data.message);
            }
        } catch (error) {
            console.error('Failed to delete email messages', error);
        }
    };

    return (
        <div id="popup-modal" className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-50">
            <div className="relative p-4 w-full max-w-md bg-gray-800 rounded-lg shadow-xl">
                <h2 className="mb-2 text-xl font-semibold text-center text-white">Are you sure?</h2>
                <p className="mb-6 text-sm text-center text-gray-400">Your selected email will be deleted.</p>
                <div className="flex justify-between">
                    <button className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded hover:bg-gray-600" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePopup;
