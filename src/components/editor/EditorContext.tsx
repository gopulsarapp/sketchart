"use client";

import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

export type EditorTool = 'select' | 'pencil' | 'highlighter' | 'eraser' | 'text' | 'image';

export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  id: string;
  points: Point[];
  color: string;
  width: number;
  opacity: number;
}

export interface TextElement {
  id: string;
  type: 'text';
  x: number;
  y: number;
  text: string;
  fontSize: number;
}

export interface ImageElement {
  id: string;
  type: 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  rotation?: number; // radians
}

export type EditorElement = TextElement | ImageElement;
export interface ShapeElement {
  id: string;
  type: 'shape';
  shape: 'rect' | 'circle' | 'triangle';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  rotation?: number;
}

export type AnyElement = EditorElement | ShapeElement;

interface EditorContextValue {
  tool: EditorTool;
  setTool: (tool: EditorTool) => void;
  strokes: Stroke[];
  addStroke: (stroke: Stroke) => void;
  replaceLastStroke: (stroke: Stroke) => void;
  elements: AnyElement[];
  addTextElement: (text?: string) => void;
  addImageElement: (src: string) => void;
  addShape: (shape: ShapeElement['shape']) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  moveSelectedBy: (dx: number, dy: number) => void;
  deleteSelected: () => void;
  updateElementById: (id: string, updater: (el: AnyElement) => AnyElement) => void;
  canvasSize: { width: number; height: number };
  setCanvasSize: (size: { width: number; height: number }) => void;
  undo: () => void;
  redo: () => void;
  setCanvasNode: (node: HTMLCanvasElement | null) => void;
  exportPNG: () => string | null;
  penColor: string;
  setPenColor: (c: string) => void;
  penWidth: number;
  setPenWidth: (w: number) => void;
  setFillForSelected: (color: string) => void;
}

const EditorContext = createContext<EditorContextValue | null>(null);

export const useEditor = () => {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error('useEditor must be used within EditorProvider');
  return ctx;
};

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [tool, setTool] = useState<EditorTool>('select');
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [elements, setElements] = useState<AnyElement[]>([]);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 800, height: 600 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [penColor, setPenColor] = useState<string>('#111827');
  const [penWidth, setPenWidth] = useState<number>(4);

  // history
  const [past, setPast] = useState<{ elements: AnyElement[]; strokes: Stroke[] }[]>([]);
  const [future, setFuture] = useState<{ elements: AnyElement[]; strokes: Stroke[] }[]>([]);

  const snapshot = useCallback(() => ({ elements: JSON.parse(JSON.stringify(elements)) as AnyElement[], strokes: JSON.parse(JSON.stringify(strokes)) as Stroke[] }), [elements, strokes]);
  const pushHistory = useCallback(() => {
    setPast((p) => [...p, snapshot()]);
    setFuture([]);
  }, [snapshot]);

  const addStroke = useCallback((stroke: Stroke) => {
    pushHistory();
    setStrokes((prev) => [...prev, stroke]);
  }, [pushHistory]);

  const replaceLastStroke = useCallback((stroke: Stroke) => {
    setStrokes((prev) => (prev.length ? [...prev.slice(0, -1), stroke] : [stroke]));
  }, []);

  const addTextElement = useCallback((text?: string) => {
    pushHistory();
    setElements((prev) => [
      ...prev,
      {
        id: `text_${Date.now()}`,
        type: 'text',
        x: canvasSize.width / 2 - 100,
        y: canvasSize.height / 2 - 16,
        text: text ?? 'Edit me',
        fontSize: 24,
      },
    ]);
  }, [canvasSize.height, canvasSize.width, pushHistory]);

  const addImageElement = useCallback((src: string) => {
    pushHistory();
    setElements((prev) => [
      ...prev,
      {
        id: `img_${Date.now()}`,
        type: 'image',
        x: canvasSize.width / 2 - 150,
        y: canvasSize.height / 2 - 100,
        width: 300,
        height: 200,
        src,
      },
    ]);
  }, [canvasSize.height, canvasSize.width, pushHistory]);

  const moveSelectedBy = useCallback((dx: number, dy: number) => {
    if (!selectedId) return;
    setElements((prev) => prev.map((el) => (el.id === selectedId ? { ...el, x: el.x + dx, y: el.y + dy } as EditorElement : el)));
  }, [selectedId]);

  const deleteSelected = useCallback(() => {
    if (!selectedId) return;
    pushHistory();
    setElements((prev) => prev.filter((el) => el.id !== selectedId));
    setSelectedId(null);
  }, [pushHistory, selectedId]);

  const updateElementById = useCallback((id: string, updater: (el: AnyElement) => AnyElement) => {
    setElements((prev) => prev.map((el) => (el.id === id ? updater(el) : el)));
  }, []);

  const addShape = useCallback((shape: ShapeElement['shape']) => {
    pushHistory();
    setElements((prev) => [
      ...prev,
      {
        id: `shape_${Date.now()}`,
        type: 'shape',
        shape,
        x: canvasSize.width / 2 - 100,
        y: canvasSize.height / 2 - 75,
        width: 200,
        height: 150,
        fill: '#e5e7eb',
        rotation: 0,
      },
    ]);
  }, [canvasSize.height, canvasSize.width, pushHistory]);

  const setFillForSelected = useCallback((color: string) => {
    if (!selectedId) return;
    setElements((prev) => prev.map((el) => (el.id === selectedId && (el as any).type === 'shape' ? { ...(el as any), fill: color } : el)));
  }, [selectedId]);

  const undo = useCallback(() => {
    setPast((p) => {
      if (!p.length) return p;
      const last = p[p.length - 1];
      setFuture((f) => [...f, snapshot()]);
      setElements(last.elements);
      setStrokes(last.strokes);
      return p.slice(0, -1);
    });
  }, [snapshot]);

  const redo = useCallback(() => {
    setFuture((f) => {
      if (!f.length) return f;
      const next = f[f.length - 1];
      setPast((p) => [...p, snapshot()]);
      setElements(next.elements);
      setStrokes(next.strokes);
      return f.slice(0, -1);
    });
  }, [snapshot]);

  // keyboard shortcuts
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteSelected();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.shiftKey ? redo() : undo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        redo();
      } else if (e.key === 'Escape') {
        setSelectedId(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [deleteSelected, redo, undo]);

  const value = useMemo<EditorContextValue>(() => ({
    tool,
    setTool,
    strokes,
    addStroke,
    replaceLastStroke,
    elements,
    addTextElement,
    addImageElement,
    selectedId,
    setSelectedId,
    moveSelectedBy,
    deleteSelected,
    updateElementById,
    canvasSize,
    setCanvasSize,
    undo,
    redo,
    setCanvasNode: (node: HTMLCanvasElement | null) => {
      (canvasRef as any).current = node;
    },
    exportPNG: () => {
      const c = (canvasRef as any).current as HTMLCanvasElement | null;
      if (!c) return null;
      return c.toDataURL('image/png');
    },
    penColor,
    setPenColor,
    penWidth,
    setPenWidth,
    setFillForSelected,
  }), [tool, strokes, elements, addStroke, replaceLastStroke, addTextElement, addImageElement, addShape, canvasSize, selectedId]);

  // local canvas ref to support export without prop drilling
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};


