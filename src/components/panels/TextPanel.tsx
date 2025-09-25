import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEditor } from '@/components/editor/EditorContext';

const TextPanel = () => {
  const { addTextElement, setTool } = useEditor();
  return (
    <div className="w-80 bg-white border-l p-4">
      <Input placeholder="Search fonts and combinations" className="mb-4" />
      <Button className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white" onClick={() => { setTool('text'); addTextElement(); }}>
        + Add Text Box
      </Button>
      
      <div>
        <h3 className="font-semibold mb-3">Default Text Styles</h3>
        <div className="space-y-3">
          <button 
            className="p-3 bg-white border rounded-md text-left w-full hover:bg-gray-50" 
            onClick={() => { setTool('text'); addTextElement('Heading'); }}
          >
            <div className="text-2xl font-bold">Heading</div>
          </button>
          <button 
            className="p-3 bg-white border rounded-md text-left w-full hover:bg-gray-50" 
            onClick={() => { setTool('text'); addTextElement('Subheading'); }}
          >
            <div className="text-lg font-semibold">Subheading</div>
          </button>
          <button 
            className="p-3 bg-white border rounded-md text-left w-full hover:bg-gray-50" 
            onClick={() => { setTool('text'); addTextElement('Body'); }}
          >
            <div className="text-base">Body</div>
          </button>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-semibold mb-3">Font Combinations</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border rounded-md p-3 text-center">
            <div className="text-lg font-bold mb-1">fresh</div>
            <div className="text-sm text-gray-600">IDENTITY</div>
          </div>
          <div className="bg-white border rounded-md p-3 text-center">
            <div className="text-lg font-bold mb-1">brand</div>
            <div className="text-sm text-gray-600">IDENTITY</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextPanel;
