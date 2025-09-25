import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEditor } from '@/components/editor/EditorContext';

const ElementsPanel = () => {
  const { addShape, setFillForSelected } = useEditor();
  return (
    <div className="w-80 bg-white border-l p-4">
      <Input placeholder="Search elements" className="mb-4" />
      
      <div className="flex gap-2 mb-4">
        <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Cards</button>
        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm">Square</button>
        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm">Frames</button>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Shapes</h3>
          <Button variant="link" className="text-blue-500 text-sm">See All</Button>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <button onClick={() => addShape('circle')} className="bg-black h-12 rounded-full" />
          <button onClick={() => addShape('rect')} className="bg-black h-12 rounded-md" />
          <button onClick={() => addShape('rect')} className="bg-black h-12 rounded-lg" />
          <button className="bg-black h-12 rounded-full relative">
            <div className="absolute inset-2 bg-white rounded-full"></div>
          </button>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">3D Shapes</h3>
          <Button variant="link" className="text-blue-500 text-sm">See All</Button>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-gray-300 h-12 rounded-md flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-500 rounded transform rotate-45"></div>
          </div>
          <div className="bg-gray-300 h-12 rounded-md flex items-center justify-center">
            <div className="w-8 h-6 bg-gray-500 rounded-full"></div>
          </div>
          <div className="bg-gray-300 h-12 rounded-md flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-500 transform rotate-45"></div>
          </div>
          <div className="bg-gray-300 h-12 rounded-md flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-500 rounded"></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Patterns</h3>
          <Button variant="link" className="text-blue-500 text-sm">See All</Button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-gray-300 h-12 rounded-md bg-gradient-to-r from-gray-400 to-gray-600"></div>
          <div className="bg-black h-12 rounded-md"></div>
          <div className="bg-gray-300 h-12 rounded-md bg-gradient-to-br from-gray-300 to-gray-500"></div>
          <div className="bg-gray-300 h-12 rounded-md bg-gradient-to-r from-white to-gray-400"></div>
        </div>
      </div>
    </div>
  );
};

export default ElementsPanel;
