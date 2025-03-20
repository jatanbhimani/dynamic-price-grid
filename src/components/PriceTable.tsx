
import React from 'react';
import { Input } from '@/components/ui/input';

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
}

const PriceTable: React.FC<PriceTableProps> = ({ 
  grid, 
  rows, 
  columns, 
  priceData, 
  updatePrice 
}) => {
  if (!grid) return null;

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceTable;
