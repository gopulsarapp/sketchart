import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
}

const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, position }) => {
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute bg-white rounded-lg shadow-lg border p-4 w-80" 
           style={{ left: position.x, top: position.y }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Comment</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>
        
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
              👤
            </div>
            <span className="text-sm font-medium">@mention</span>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Have something to say? Select anything in the design and click the comment icon to add a comment."
            className="w-full p-2 border rounded-md text-sm h-20 resize-none"
          />
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={() => {
              // Add comment logic here
              setComment('');
              onClose();
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm"
          >
            Add Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
