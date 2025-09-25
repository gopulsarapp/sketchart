export type Point = {
  x: number;
  y: number;
};

export type Stroke = {
  id: string;
  points: Point[];
  color: string;
  width: number;
  opacity: number;
};

export type TextElement = {
  id:string;
  type: 'text';
  x: number;
  y: number;
  text: string;
  fontSize: number;
  rotation?: number;
};

export type ImageElement = {
  id: string;
  type: 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  rotation?: number;
};

export type ShapeType = 'rect' | 'circle' | 'triangle';

export type ShapeElement = {
  id: string;
  type: 'shape';
  shape: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  rotation?: number;
};

export type CanvasElement = TextElement | ImageElement | ShapeElement;
