import React from 'react';
import { Button } from '@/components/ui/button';
import { useEditor } from '@/components/editor/EditorContext';

const ToolsPanel = () => {
  const { tool, setTool, penColor, setPenColor, penWidth, setPenWidth } = useEditor();

  return (
    <div className="w-80 bg-white border-l p-4">
      <div className="space-y-4">
        <h3 className="font-semibold">Tools</h3>
        
        <div className="flex gap-2">
          <Button 
            variant={tool === 'pencil' ? 'default' : 'outline'} 
            onClick={() => setTool('pencil')}
            className="flex-1"
          >
            Pencil
          </Button>
          <Button 
            variant={tool === 'highlighter' ? 'default' : 'outline'} 
            onClick={() => setTool('highlighter')}
            className="flex-1"
          >
            Highlighter
          </Button>
          <Button 
            variant={tool === 'eraser' ? 'default' : 'outline'} 
            onClick={() => setTool('eraser')}
            className="flex-1"
          >
            Eraser
          </Button>
          <Button 
            variant={tool === 'select' ? 'default' : 'outline'} 
            onClick={() => setTool('select')}
            className="flex-1"
          >
            Select
          </Button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-2 block">Pen Color</label>
            <div className="flex items-center gap-2">
              <input 
                type="color" 
                value={penColor} 
                onChange={(e) => setPenColor(e.target.value)}
                className="w-8 h-8 rounded border"
              />
              <div 
                className="w-8 h-8 rounded border"
                style={{ backgroundColor: penColor }}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Pen Width</label>
            <div className="flex items-center gap-2">
              <input 
                type="range" 
                min="1" 
                max="20" 
                value={penWidth} 
                onChange={(e) => setPenWidth(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm w-8">{penWidth}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {['Resize','Background','Grid','Rulers','Comments','Share'].map((label) => (
              <Button key={label} variant="outline" className="h-10 text-sm">
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPanel;


