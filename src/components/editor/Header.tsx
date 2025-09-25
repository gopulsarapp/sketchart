import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-red-500 rounded-full" />
        <span>File</span>
        <span>Editing</span>
      </div>
      <div className="flex items-center gap-4">
        <button>Comments</button>
        <button>Share</button>
      </div>
    </header>
  );
};

export default Header;
