
import React from 'react';

interface GridOption {
  id: string;
  name: string;
}

interface PriceGridProps {
  grids: GridOption[];
  activeGrid: string;
  setActiveGrid: (id: string) => void;
}

const PriceGrid: React.FC<PriceGridProps> = ({ grids, activeGrid, setActiveGrid }) => {
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
      </div>
    </div>
  );
};

export default PriceGrid;
