"use client";

import React, { useState } from 'react';
import Header from '../header/Header';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import DesignPanel from '../panels/DesignPanel';
import ElementsPanel from '../panels/ElementsPanel';
import TextPanel from '../panels/TextPanel';
import MarkingPanel from '../panels/MarkingPanel';
import UploadsPanel from '../panels/UploadsPanel';
import ToolsPanel from '../panels/ToolsPanel';
import { EditorProvider } from './EditorContext';

const Editor = () => {
  const [activePanel, setActivePanel] = useState('Design');

  const renderPanel = () => {
    switch (activePanel) {
      case 'Design':
        return <DesignPanel />;
      case 'Elements':
        return <ElementsPanel />;
      case 'Text':
        return <TextPanel />;
      case 'Marking':
        return <MarkingPanel />;
      case 'Uploads':
        return <UploadsPanel />;
      case 'Tools':
        return <ToolsPanel />;
      default:
        return null;
    }
  };

  return (
    <EditorProvider>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar setActivePanel={setActivePanel} />
          {renderPanel()}
          <Canvas />
        </div>
      </div>
    </EditorProvider>
  );
};


export default Editor;
