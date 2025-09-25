import React from 'react';
import { Button } from '@/components/ui/button';
import { useEditor } from '@/components/editor/EditorContext';

const MarkingPanel = () => {
  const { setTool, penColor, setPenColor, penWidth, setPenWidth } = useEditor();
  return (
    <div className="w-80 bg-white border-l p-4">
      <div className="space-y-3">
        <h3 className="font-semibold">Tools</h3>
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" className="h-10 text-xs" onClick={() => setTool('pencil')}>Pencil</Button>
          <Button variant="outline" className="h-10 text-xs" onClick={() => setTool('highlighter')}>Highlighter</Button>
          <Button variant="outline" className="h-10 text-xs" onClick={() => setTool('eraser')}>Eraser</Button>
          <Button variant="outline" className="h-10 text-xs" onClick={() => setTool('select')}>Select</Button>
        </div>
        <div className="pt-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Pen Color</span>
            <input type="color" value={penColor} onChange={(e) => setPenColor(e.target.value)} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Pen Width</span>
            <input type="range" min={1} max={24} value={penWidth} onChange={(e) => setPenWidth(parseInt(e.target.value))} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkingPanel;


