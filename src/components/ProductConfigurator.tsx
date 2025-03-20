
import React, { useState, useEffect } from 'react';
import PriceGrid from './PriceGrid';
import PriceTable from './PriceTable';
import Search from './Search';

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
  const addGrid = (name: string) => {
    if (!name.trim()) return;
    
    const newId = `grid${Date.now()}`;
    setGrids([...grids, { id: newId, name }]);
  };

  // Add new row
  const addRow = (name: string) => {
    if (!name.trim()) return;

    const newId = `row${Date.now()}`;
    setRows([...rows, { id: newId, name }]);
  };

  // Add new column
  const addColumn = (name: string) => {
    if (!name.trim()) return;

    const newId = `col${Date.now()}`;
    setColumns([...columns, { id: newId, name }]);
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
