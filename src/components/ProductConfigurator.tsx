
import React, { useState, useEffect } from 'react';
import PriceGrid from './PriceGrid';
import PriceTable from './PriceTable';
import Search from './Search';

// Define types
interface GridOption {
  id: string;
  name: string;
  unit: string;
}

interface RowOption {
  id: string;
  name: string;
  unit: string;
}

interface ColumnOption {
  id: string;
  name: string;
  unit: string;
}

interface PriceData {
  [gridId: string]: {
    [rowId: string]: {
      [columnId: string]: number;
    };
  };
}

interface Unit {
  id: string;
  name: string;
}

const ProductConfigurator: React.FC = () => {
  // Units state
  const [ramUnits, setRamUnits] = useState<Unit[]>([
    { id: 'unit1', name: 'GB' },
    { id: 'unit2', name: 'MB' }
  ]);
  
  const [colorUnits, setColorUnits] = useState<Unit[]>([
    { id: 'unit1', name: 'Shade' },
    { id: 'unit2', name: 'Variant' }
  ]);
  
  const [storageUnits, setStorageUnits] = useState<Unit[]>([
    { id: 'unit1', name: 'GB' },
    { id: 'unit2', name: 'TB' }
  ]);

  // State for grids (e.g. RAM options)
  const [grids, setGrids] = useState<GridOption[]>([
    { id: 'grid1', name: '4', unit: 'GB' },
    { id: 'grid2', name: '6', unit: 'GB' }
  ]);

  // State for rows (e.g. colors)
  const [rows, setRows] = useState<RowOption[]>([
    { id: 'row1', name: 'Red', unit: 'Shade' },
    { id: 'row2', name: 'Blue', unit: 'Shade' },
    { id: 'row3', name: 'Green', unit: 'Shade' }
  ]);

  // State for columns (e.g. ROM sizes)
  const [columns, setColumns] = useState<ColumnOption[]>([
    { id: 'col1', name: '64', unit: 'GB' },
    { id: 'col2', name: '128', unit: 'GB' },
    { id: 'col3', name: '256', unit: 'GB' }
  ]);

  // State for price data
  const [priceData, setPriceData] = useState<PriceData>({});

  // State for current selected grid
  const [activeGrid, setActiveGrid] = useState<string>('grid1');

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
  const addGrid = (name: string, unit: string) => {
    if (!name.trim()) return;
    
    const newId = `grid${Date.now()}`;
    setGrids([...grids, { id: newId, name, unit }]);
  };

  // Add new row
  const addRow = (name: string, unit: string) => {
    if (!name.trim()) return;

    const newId = `row${Date.now()}`;
    setRows([...rows, { id: newId, name, unit }]);
  };

  // Add new column
  const addColumn = (name: string, unit: string) => {
    if (!name.trim()) return;

    const newId = `col${Date.now()}`;
    setColumns([...columns, { id: newId, name, unit }]);
  };

  // Add new unit
  const addRamUnit = (name: string) => {
    if (!name.trim()) return;
    
    const newId = `unit${Date.now()}`;
    setRamUnits([...ramUnits, { id: newId, name }]);
  };

  const addColorUnit = (name: string) => {
    if (!name.trim()) return;
    
    const newId = `unit${Date.now()}`;
    setColorUnits([...colorUnits, { id: newId, name }]);
  };

  const addStorageUnit = (name: string) => {
    if (!name.trim()) return;
    
    const newId = `unit${Date.now()}`;
    setStorageUnits([...storageUnits, { id: newId, name }]);
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
      
      <div style={{ marginBottom: '30px' }}>
        <PriceGrid 
          grids={grids} 
          activeGrid={activeGrid} 
          setActiveGrid={setActiveGrid} 
          onAddGrid={addGrid}
          units={ramUnits}
          onAddUnit={addRamUnit}
        />
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        {activeGrid && (
          <div>
            <PriceTable 
              grid={grids.find(g => g.id === activeGrid)}
              rows={rows}
              columns={columns}
              priceData={priceData[activeGrid] || {}}
              updatePrice={(rowId, columnId, price) => updatePrice(activeGrid, rowId, columnId, price)}
              onAddRow={addRow}
              onAddColumn={addColumn}
              colorUnits={colorUnits}
              storageUnits={storageUnits}
              onAddColorUnit={addColorUnit}
              onAddStorageUnit={addStorageUnit}
            />
          </div>
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
