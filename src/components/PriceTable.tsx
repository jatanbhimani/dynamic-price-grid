
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

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

interface PriceTableProps {
  grid: GridOption | undefined;
  rows: RowOption[];
  columns: ColumnOption[];
  priceData: {
    [rowId: string]: {
      [columnId: string]: number;
    };
  };
  updatePrice: (rowId: string, columnId: string, price: number) => void;
  onAddRow?: (name: string) => void;
  onAddColumn?: (name: string) => void;
}

const PriceTable: React.FC<PriceTableProps> = ({ 
  grid, 
  rows, 
  columns, 
  priceData, 
  updatePrice,
  onAddRow,
  onAddColumn
}) => {
  const [newRowName, setNewRowName] = useState<string>('');
  const [newColumnName, setNewColumnName] = useState<string>('');
  
  if (!grid) return null;

  const handleAddRow = () => {
    if (newRowName.trim() && onAddRow) {
      onAddRow(newRowName);
      setNewRowName('');
    }
  };

  const handleAddColumn = () => {
    if (newColumnName.trim() && onAddColumn) {
      onAddColumn(newColumnName);
      setNewColumnName('');
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
        Price Configuration for {grid.name}
      </h2>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '12px', borderBottom: '2px solid #e0e0e0', textAlign: 'left' }}>
                Color / Storage
              </th>
              {columns.map(column => (
                <th 
                  key={column.id}
                  style={{ padding: '12px', borderBottom: '2px solid #e0e0e0', textAlign: 'center' }}
                >
                  {column.name}
                </th>
              ))}
              {/* Add Column button in the header */}
              <th style={{ padding: '12px', borderBottom: '2px solid #e0e0e0', backgroundColor: '#f0f9ff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Input 
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    placeholder="New storage"
                    style={{ width: '120px' }}
                  />
                  <Button onClick={handleAddColumn} size="sm">
                    <Plus size={16} />
                  </Button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                <td 
                  style={{ 
                    padding: '12px', 
                    fontWeight: 'bold', 
                    borderBottom: '1px solid #e0e0e0',
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  {row.name}
                </td>
                {columns.map(column => (
                  <td 
                    key={column.id}
                    style={{ 
                      padding: '8px', 
                      borderBottom: '1px solid #e0e0e0',
                      textAlign: 'center'
                    }}
                  >
                    <Input
                      type="number"
                      min="0"
                      value={priceData[row.id]?.[column.id] || 0}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        updatePrice(row.id, column.id, value);
                      }}
                      style={{
                        textAlign: 'center',
                        border: '1px solid #e0e0e0',
                        padding: '8px',
                        borderRadius: '4px'
                      }}
                    />
                  </td>
                ))}
                {/* Empty cell to align with the add column header */}
                <td style={{ borderBottom: '1px solid #e0e0e0' }}></td>
              </tr>
            ))}
            {/* Add Row button as the last row */}
            <tr style={{ backgroundColor: '#f0f9ff' }}>
              <td colSpan={columns.length + 2} style={{ padding: '12px', borderBottom: '1px solid #e0e0e0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Input 
                    value={newRowName}
                    onChange={(e) => setNewRowName(e.target.value)}
                    placeholder="New color"
                    style={{ width: '150px' }}
                  />
                  <Button onClick={handleAddRow} size="sm">
                    <Plus size={16} />
                    Add Color
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceTable;
