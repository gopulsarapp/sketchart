import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useEditor } from '@/components/editor/EditorContext';

const UploadsPanel = () => {
  const { addImageElement } = useEditor();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onPick = () => inputRef.current?.click();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = String(reader.result);
      addImageElement(src);
    };
    reader.readAsDataURL(file);
    e.currentTarget.value = '';
  };

  return (
    <div className="w-80 bg-white border-l p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <input 
            type="text" 
            placeholder="Search images by keywords, links..." 
            className="flex-1 px-3 py-2 border rounded-md text-sm"
          />
        </div>
        
        <div className="flex gap-2 mb-4">
          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Images</button>
          <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm">Videos</button>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 text-center border-2 border-dashed border-gray-300">
          <div className="mb-2">📁</div>
          <p className="text-sm text-gray-600 mb-2">Drag media here to upload or</p>
          <p className="text-sm text-gray-600 mb-3">connect an account.</p>
          <Button onClick={onPick} className="bg-blue-500 hover:bg-blue-600 text-white">
            Upload File
          </Button>
        </div>
        
        <input ref={inputRef} type="file" accept="image/*,video/*" className="hidden" onChange={onChange} />
      </div>
    </div>
  );
};

export default UploadsPanel;


