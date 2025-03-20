
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
  const [selectedUnit, setSelectedUnit] = useState<string>(units[0]?.name || '');
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
      <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>RAM Options</h2>
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        perspective: '1000px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        {grids.map((grid) => (
          <div
            key={grid.id}
            onClick={() => setActiveGrid(grid.id)}
            style={{
              padding: '20px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: grid.id === activeGrid 
                ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' 
                : '0 1px 3px rgba(0, 0, 0, 0.12)',
              backgroundColor: grid.id === activeGrid ? '#f0f9ff' : '#ffffff',
              transform: grid.id === activeGrid ? 'translateZ(20px)' : 'translateZ(0)',
              transition: 'all 0.3s ease',
              minWidth: '150px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontWeight: 'bold' }}>{grid.name} {grid.unit}</div>
          </div>
        ))}
        
        {/* Add RAM option input and button */}
        <div style={{
          padding: '15px',
          border: '1px dashed #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          width: '350px'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', marginBottom: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>RAM Value</label>
              <Input
                value={newGridName}
                onChange={(e) => setNewGridName(e.target.value)}
                placeholder="Enter value (e.g. 8)"
              />
            </div>
            <div style={{ width: '100px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Unit</label>
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
              <Plus size={16} style={{ marginRight: '5px' }} />
              Add
            </Button>
          </div>
          
          {selectedUnit === 'add-new' || showAddUnit ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
              <Input
                value={newUnitName}
                onChange={(e) => setNewUnitName(e.target.value)}
                placeholder="New unit name"
                style={{ flex: 1 }}
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
              <Plus size={14} style={{ marginRight: '5px' }} />
              Add new unit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceGrid;
