import React from 'react';
import SidebarItem from '../sidebar/SidebarItem';

interface SidebarProps {
  setActivePanel: (panel: string) => void;
}

const Sidebar = ({ setActivePanel }: SidebarProps) => {
  return (
    <aside className="w-20 flex flex-col items-center gap-4 p-4 bg-white border-r">
      <div className="w-8 h-8 bg-red-500 rounded-full mb-4" />
      <div onClick={() => setActivePanel('Design')}>
        <SidebarItem icon="LayoutGrid" label="Design" />
      </div>
      <div onClick={() => setActivePanel('Elements')}>
        <SidebarItem icon="Shapes" label="Elements" />
      </div>
      <div onClick={() => setActivePanel('Text')}>
        <SidebarItem icon="Type" label="Text" />
      </div>
      <div onClick={() => setActivePanel('Marking')}>
        <SidebarItem icon="PenTool" label="Marking" />
      </div>
      <div onClick={() => setActivePanel('Uploads')}>
        <SidebarItem icon="Upload" label="Uploads" />
      </div>
      <div onClick={() => setActivePanel('Tools')}>
        <SidebarItem icon="Wrench" label="Tools" />
      </div>
    </aside>
  );
};

export default Sidebar;
