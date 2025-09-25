import React from 'react';
import Icon from './Icon';

interface SidebarItemProps {
  icon: any;
  label: string;
}

const SidebarItem = ({ icon, label }: SidebarItemProps) => {
  return (
    <button className="flex flex-col items-center gap-2 text-xs text-gray-600">
      <Icon name={icon} size={24} />
      <span>{label}</span>
    </button>
  );
};

export default SidebarItem;
