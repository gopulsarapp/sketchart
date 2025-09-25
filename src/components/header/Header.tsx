import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Icon from '../sidebar/Icon';
import { useEditor } from '@/components/editor/EditorContext';
import CommentModal from '@/components/ui/CommentModal';

const Header = () => {
  const { undo, redo, exportPNG } = useEditor();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentPosition, setCommentPosition] = useState({ x: 0, y: 0 });

  const handleCommentsClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCommentPosition({ x: rect.left, y: rect.bottom + 5 });
    setShowCommentModal(true);
  };

  return (
    <>
      <header className="flex items-center justify-between p-3 bg-white border-b">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">C</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm">File</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>New</DropdownMenuItem>
              <DropdownMenuItem>Open</DropdownMenuItem>
              <DropdownMenuItem>Save</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm">Editing</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={undo}>Undo</DropdownMenuItem>
              <DropdownMenuItem onClick={redo}>Redo</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" onClick={undo}>
            <Icon name="Undo2" />
          </Button>
          <Button variant="ghost" size="icon" onClick={redo}>
            <Icon name="Redo2" />
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
          <Button 
            variant="ghost" 
            className="text-sm"
            onClick={handleCommentsClick}
          >
            💬 Comments
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm"
            onClick={() => {
              const data = exportPNG();
              if (!data) return;
              const a = document.createElement('a');
              a.href = data;
              a.download = 'design.png';
              a.click();
            }}
          >
            Share
          </Button>
        </div>
      </header>
      
      <CommentModal 
        isOpen={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        position={commentPosition}
      />
    </>
  );
};

export default Header;
