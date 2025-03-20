
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface GridOption {
  id: string;
  name: string;
}

interface PriceGridProps {
  grids: GridOption[];
  activeGrid: string;
  setActiveGrid: (id: string) => void;
  onAddGrid: (name: string) => void;
}

const PriceGrid: React.FC<PriceGridProps> = ({ grids, activeGrid, setActiveGrid, onAddGrid }) => {
  const [newGridName, setNewGridName] = useState<string>('');

  const handleAddGrid = () => {
    if (!newGridName.trim()) return;
    onAddGrid(newGridName);
    setNewGridName('');
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>RAM Options</h2>
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        perspective: '1000px',
        marginBottom: '20px'
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
            <div style={{ fontWeight: 'bold' }}>{grid.name}</div>
          </div>
        ))}
        
        {/* Add RAM option input and button */}
        <div style={{
          padding: '10px',
          border: '1px dashed #e0e0e0',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          minWidth: '300px',
          backgroundColor: '#ffffff'
        }}>
          <Input
            value={newGridName}
            onChange={(e) => setNewGridName(e.target.value)}
            placeholder="New RAM option (e.g. 8GB RAM)"
            style={{ marginRight: '10px' }}
          />
          <Button onClick={handleAddGrid}>
            <Plus size={16} style={{ marginRight: '5px' }} />
            Add RAM
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PriceGrid;
