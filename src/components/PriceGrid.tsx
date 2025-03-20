
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Unit {
  id: string;
  name: string;
}

interface GridOption {
  id: string;
  name: string;
  unit: string;
}

interface PriceGridProps {
  grids: GridOption[];
  activeGrid: string;
  setActiveGrid: (id: string) => void;
  onAddGrid: (name: string, unit: string) => void;
  units: Unit[];
  onAddUnit: (name: string) => void;
}

const PriceGrid: React.FC<PriceGridProps> = ({ 
  grids, 
  activeGrid, 
  setActiveGrid, 
  onAddGrid, 
  units, 
  onAddUnit 
}) => {
  const [newGridName, setNewGridName] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<string>(units.find(u => u.name === 'GB')?.name || units[0]?.name || '');
  const [newUnitName, setNewUnitName] = useState<string>('');
  const [showAddUnit, setShowAddUnit] = useState<boolean>(false);

  const handleAddGrid = () => {
    if (!newGridName.trim()) return;
    onAddGrid(newGridName, selectedUnit);
    setNewGridName('');
  };

  const handleAddUnit = () => {
    if (!newUnitName.trim()) return;
    onAddUnit(newUnitName);
    setSelectedUnit(newUnitName);
    setNewUnitName('');
    setShowAddUnit(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">RAM Options</h2>
      <div className="flex flex-wrap gap-5 mb-5 perspective-[1000px]">
        {grids.map((grid) => (
          <div
            key={grid.id}
            onClick={() => setActiveGrid(grid.id)}
            className={`
              p-5 border rounded-lg cursor-pointer transition-all duration-300
              ${grid.id === activeGrid ? 'bg-blue-50 shadow-lg translate-z-[20px]' : 'bg-white shadow-sm'}
            `}
            style={{
              minWidth: '150px',
              textAlign: 'center',
              transform: grid.id === activeGrid ? 'translateZ(20px)' : 'translateZ(0)',
            }}
          >
            <div className="font-bold">{grid.name} {grid.unit}</div>
          </div>
        ))}
        
        {/* Add RAM option input and button */}
        <div className="p-4 border border-dashed rounded-lg bg-white w-[350px]">
          <div className="flex items-end gap-3 mb-3">
            <div className="flex-1">
              <label className="block mb-1 text-sm">RAM Value</label>
              <Input
                value={newGridName}
                onChange={(e) => setNewGridName(e.target.value)}
                placeholder="Enter value (e.g. 8)"
              />
            </div>
            <div className="w-[100px]">
              <label className="block mb-1 text-sm">Unit</label>
              <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {units.map(unit => (
                    <SelectItem key={unit.id} value={unit.name}>
                      {unit.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="add-new" className="text-blue-500">+ Add new unit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddGrid}>
              <Plus size={16} className="mr-1" />
              Add
            </Button>
          </div>
          
          {selectedUnit === 'add-new' || showAddUnit ? (
            <div className="flex items-center gap-3 mt-3">
              <Input
                value={newUnitName}
                onChange={(e) => setNewUnitName(e.target.value)}
                placeholder="New unit name"
                className="flex-1"
              />
              <Button onClick={handleAddUnit} variant="outline">
                Add Unit
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-500"
              onClick={() => setShowAddUnit(true)}
            >
              <Plus size={14} className="mr-1" />
              Add new unit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceGrid;
