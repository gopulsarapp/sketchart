"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useEditor } from './EditorContext';

const Canvas = () => {
  const { tool, strokes, addStroke, replaceLastStroke, elements, canvasSize, setCanvasSize, selectedId, setSelectedId, moveSelectedBy, updateElementById, setCanvasNode, penWidth, penColor } = useEditor();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Resize observer to keep internal state in sync
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const resize = () => setCanvasSize({ width: 800, height: 600 });
    resize();
  }, [setCanvasSize]);

  // draw all content
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // elements (images, text, shapes)
    for (const el of elements) {
      if (el.type === 'text') {
        ctx.fillStyle = '#111827';
        ctx.font = `${el.fontSize}px ui-sans-serif, system-ui`;
        ctx.fillText(el.text, el.x, el.y);
      } else if (el.type === 'image') {
        const img = new Image();
        img.src = el.src;
        img.onload = () => {
          const c = canvasRef.current;
          const ctx2 = c?.getContext('2d');
          if (!c || !ctx2) return;
          if (el.rotation) {
            ctx2.save();
            ctx2.translate(el.x + el.width / 2, el.y + el.height / 2);
            ctx2.rotate(el.rotation);
            ctx2.drawImage(img, -el.width / 2, -el.height / 2, el.width, el.height);
            ctx2.restore();
          } else {
            ctx2.drawImage(img, el.x, el.y, el.width, el.height);
          }
        };
      } else if ((el as any).type === 'shape') {
        const sh = el as any as { id: string; type: 'shape'; shape: 'rect'|'circle'|'triangle'; x: number; y: number; width: number; height: number; fill: string };
        ctx.fillStyle = sh.fill;
        if (sh.shape === 'rect') {
          ctx.fillRect(sh.x, sh.y, sh.width, sh.height);
        } else if (sh.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(sh.x + sh.width/2, sh.y + sh.height/2, Math.min(sh.width, sh.height)/2, 0, Math.PI*2);
          ctx.fill();
        } else if (sh.shape === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(sh.x + sh.width/2, sh.y);
          ctx.lineTo(sh.x + sh.width, sh.y + sh.height);
          ctx.lineTo(sh.x, sh.y + sh.height);
          ctx.closePath();
          ctx.fill();
        }
      }
      // selection bounds
      if (selectedId === el.id) {
        ctx.save();
        ctx.strokeStyle = '#60a5fa';
        ctx.setLineDash([4, 4]);
        const { bx, by, bw, bh } = (() => {
          if (el.type === 'image') return { bx: el.x, by: el.y, bw: el.width, bh: el.height };
          if ((el as any).type === 'shape') return { bx: (el as any).x, by: (el as any).y, bw: (el as any).width, bh: (el as any).height };
          const approxW = (el as any).text?.length * ((el as any).fontSize * 0.6) || 100;
          const approxH = (el as any).fontSize * 1.2 || 20;
          return { bx: el.x, by: el.y - approxH, bw: approxW, bh: approxH };
        })();
        ctx.strokeRect(bx, by, bw, bh);
        // handle bottom-right
        ctx.setLineDash([]);
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(bx + bw - 6, by + bh - 6, 12, 12);
        ctx.restore();
      }
    }

    // strokes on top so marks overlay images/shapes
    for (const s of strokes) {
      if (s.points.length < 2) continue;
      ctx.globalAlpha = s.opacity;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(s.points[0].x, s.points[0].y);
      for (let i = 1; i < s.points.length; i++) ctx.lineTo(s.points[i].x, s.points[i].y);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }, [strokes, elements, canvasSize]);

  const getRelative = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getRelative(e);
    if (tool === 'pencil' || tool === 'highlighter' || tool === 'eraser') {
      setIsDrawing(true);
      const width = tool === 'highlighter' ? 12 : tool === 'eraser' ? 16 : penWidth ?? 4;
      const color = tool === 'eraser' ? '#ffffff' : tool === 'highlighter' ? '#f59e0b' : penColor ?? '#111827';
      const opacity = tool === 'highlighter' ? 0.4 : 1;
      addStroke({ id: `s_${Date.now()}`, points: [{ x, y }], color, width, opacity });
    } else if (tool === 'select') {
      // hit test elements, simple bounds for text using fontSize and length
      const hit = [...elements].reverse().find((el) => {
        if (el.type === 'image') {
          // also check for resize handle
          const inBounds = x >= el.x && y >= el.y && x <= el.x + el.width && y <= el.y + el.height;
          const inHandle = x >= el.x + el.width - 6 && x <= el.x + el.width + 6 && y >= el.y + el.height - 6 && y <= el.y + el.height + 6;
          (dragRef.current as any) = { x, y, mode: inHandle ? 'resize' : 'drag' };
          return inBounds || inHandle;
        }
        const approxW = (el as any).text.length * ((el as any).fontSize * 0.6);
        const approxH = (el as any).fontSize * 1.2;
        (dragRef.current as any) = { x, y, mode: 'drag' };
        return x >= el.x && y >= el.y - approxH && x <= el.x + approxW && y <= el.y;
      });
      setSelectedId(hit ? hit.id : null);
    }
  };

  const dragRef = useRef<{ x: number; y: number } | null>(null);

  const onPointerMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getRelative(e);
    if (isDrawing) {
      const last = strokes[strokes.length - 1];
      if (!last) return;
      replaceLastStroke({ ...last, points: [...last.points, { x, y }] });
      return;
    }
    // drag/resize when selected - throttle updates for better performance
    if (tool === 'select' && selectedId && dragRef.current) {
      const prev = dragRef.current;
      const dx = x - prev.x;
      const dy = y - prev.y;
      
      // Only update if movement is significant enough (reduces unnecessary redraws)
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        if (prev.mode === 'drag') {
          moveSelectedBy(dx, dy);
        } else if (prev.mode === 'resize') {
          updateElementById(selectedId, (el) => {
            if ((el as any).type === 'shape') {
              const width = Math.max(10, (el as any).width + dx);
              const height = Math.max(10, (el as any).height + dy);
              return { ...(el as any), width, height } as any;
            }
            if ((el as any).type !== 'image') return el as any;
            const width = Math.max(10, (el as any).width + dx);
            const height = Math.max(10, (el as any).height + dy);
            return { ...(el as any), width, height } as any;
          });
        }
        dragRef.current = { ...prev, x, y } as any;
      }
    }
  };

  const onPointerUp = (e?: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool === 'select' && selectedId && dragRef.current && e) {
      const { x, y } = getRelative(e);
      moveSelectedBy(x - dragRef.current.x, y - dragRef.current.y);
      dragRef.current = null;
    }
    setIsDrawing(false);
  };

  return (
    <main className="flex-1 p-8 bg-gray-100 flex items-center justify-center">
      <div ref={containerRef} className="shadow-md" style={{ width: canvasSize.width, height: canvasSize.height }}>
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          className={`bg-white block ${selectedId ? 'cursor-move' : ''}`}
        />
      </div>
    </main>
  );
};

export default Canvas;
