import React from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DesignPanel = () => {
  return (
    <div className="w-80 bg-white border-l p-4">
      <Input placeholder="Search..." className="mb-4" />
      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="layouts">Layouts</TabsTrigger>
          <TabsTrigger value="styles">Styles</TabsTrigger>
        </TabsList>
        <TabsContent value="templates" className="mt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Marketing</span>
              <span className="text-sm font-medium">Finance</span>
              <span className="text-sm font-medium">UI/UX Design</span>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">All Results</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-100 h-32 rounded-md p-3 flex flex-col justify-between">
                  <div className="text-xs font-bold">THESIS DEFENSE</div>
                  <div className="text-right text-xs">📊</div>
                </div>
                <div className="bg-gray-100 h-32 rounded-md p-3 flex flex-col justify-between">
                  <div className="text-xs font-bold">THESIS DEFENSE</div>
                  <div className="text-right text-xs">📊</div>
                </div>
                <div className="bg-blue-200 h-32 rounded-md p-3 flex flex-col justify-between">
                  <div className="text-xs font-bold">THESIS DEFENSE</div>
                  <div className="text-right text-xs">📊</div>
                </div>
                <div className="bg-gray-200 h-32 rounded-md p-3 flex flex-col justify-between">
                  <div className="text-xs font-bold">THESIS DEFENSE</div>
                  <div className="text-right text-xs">📊</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="layouts" className="mt-4">
          <div className="grid grid-cols-2 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 h-24 rounded-md border-2 border-dashed border-gray-300" />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="styles" className="mt-4">
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gradient-to-r from-blue-400 to-purple-500 h-16 rounded-md" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DesignPanel;
