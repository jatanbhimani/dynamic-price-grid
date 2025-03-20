
import React, { useState, useEffect } from 'react';
import PriceGrid from './PriceGrid';
import PriceTable from './PriceTable';
import Search from './Search';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

// Define types
interface GridOption {
  id: string;
  name: string;
}

interface RowOption {
  id: string;
  name: string;
}

interface ColumnOption {
  id: string;
  name: string;
}

interface PriceData {
  [gridId: string]: {
    [rowId: string]: {
      [columnId: string]: number;
    };
  };
}

const ProductConfigurator: React.FC = () => {
  // State for grids (e.g. RAM options)
  const [grids, setGrids] = useState<GridOption[]>([
    { id: 'grid1', name: '4GB RAM' },
    { id: 'grid2', name: '6GB RAM' }
  ]);

  // State for rows (e.g. colors)
  const [rows, setRows] = useState<RowOption[]>([
    { id: 'row1', name: 'Red' },
    { id: 'row2', name: 'Blue' },
    { id: 'row3', name: 'Green' }
  ]);

  // State for columns (e.g. ROM sizes)
  const [columns, setColumns] = useState<ColumnOption[]>([
    { id: 'col1', name: '64GB' },
    { id: 'col2', name: '128GB' },
    { id: 'col3', name: '256GB' }
  ]);

  // State for price data
  const [priceData, setPriceData] = useState<PriceData>({});

  // State for current selected grid
  const [activeGrid, setActiveGrid] = useState<string>('grid1');

  // State for new items
  const [newGridName, setNewGridName] = useState<string>('');
  const [newRowName, setNewRowName] = useState<string>('');
  const [newColumnName, setNewColumnName] = useState<string>('');

  // Initialize price data
  useEffect(() => {
    initializePriceData();
  }, [grids, rows, columns]);

  const initializePriceData = () => {
    const newPriceData = { ...priceData };

    grids.forEach(grid => {
      if (!newPriceData[grid.id]) {
        newPriceData[grid.id] = {};
      }

      rows.forEach(row => {
        if (!newPriceData[grid.id][row.id]) {
          newPriceData[grid.id][row.id] = {};
        }

        columns.forEach(column => {
          if (newPriceData[grid.id][row.id][column.id] === undefined) {
            newPriceData[grid.id][row.id][column.id] = 0;
          }
        });
      });
    });

    setPriceData(newPriceData);
  };

  // Add new grid
  const addGrid = () => {
    if (!newGridName.trim()) return;
    
    const newId = `grid${Date.now()}`;
    setGrids([...grids, { id: newId, name: newGridName }]);
    setNewGridName('');
  };

  // Add new row
  const addRow = () => {
    if (!newRowName.trim()) return;

    const newId = `row${Date.now()}`;
    setRows([...rows, { id: newId, name: newRowName }]);
    setNewRowName('');
  };

  // Add new column
  const addColumn = () => {
    if (!newColumnName.trim()) return;

    const newId = `col${Date.now()}`;
    setColumns([...columns, { id: newId, name: newColumnName }]);
    setNewColumnName('');
  };

  // Update price for a cell
  const updatePrice = (gridId: string, rowId: string, columnId: string, price: number) => {
    const newPriceData = { ...priceData };
    
    if (!newPriceData[gridId]) {
      newPriceData[gridId] = {};
    }
    
    if (!newPriceData[gridId][rowId]) {
      newPriceData[gridId][rowId] = {};
    }
    
    newPriceData[gridId][rowId][columnId] = price;
    setPriceData(newPriceData);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Product Price Configuration</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <Input
              value={newGridName}
              onChange={(e) => setNewGridName(e.target.value)}
              placeholder="New RAM option (e.g. 8GB RAM)"
              style={{ marginRight: '10px' }}
            />
            <Button onClick={addGrid}>
              <Plus size={16} style={{ marginRight: '5px' }} />
              Add RAM
            </Button>
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <Input
              value={newRowName}
              onChange={(e) => setNewRowName(e.target.value)}
              placeholder="New color option (e.g. Yellow)"
              style={{ marginRight: '10px' }}
            />
            <Button onClick={addRow}>
              <Plus size={16} style={{ marginRight: '5px' }} />
              Add Color
            </Button>
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <Input
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="New storage option (e.g. 512GB)"
              style={{ marginRight: '10px' }}
            />
            <Button onClick={addColumn}>
              <Plus size={16} style={{ marginRight: '5px' }} />
              Add Storage
            </Button>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <PriceGrid 
          grids={grids} 
          activeGrid={activeGrid} 
          setActiveGrid={setActiveGrid} 
        />
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        {activeGrid && (
          <PriceTable 
            grid={grids.find(g => g.id === activeGrid)}
            rows={rows}
            columns={columns}
            priceData={priceData[activeGrid] || {}}
            updatePrice={(rowId, columnId, price) => updatePrice(activeGrid, rowId, columnId, price)}
          />
        )}
      </div>
      
      <div>
        <Search 
          grids={grids}
          rows={rows}
          columns={columns}
          priceData={priceData}
        />
      </div>
    </div>
  );
};

export default ProductConfigurator;
