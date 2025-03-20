
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
  onAddRow?: (name: string, unit: string) => void;
  onAddColumn?: (name: string, unit: string) => void;
  units: Unit[];
  onAddUnit: (name: string) => void;
}

const PriceTable: React.FC<PriceTableProps> = ({ 
  grid, 
  rows, 
  columns, 
  priceData, 
  updatePrice,
  onAddRow,
  onAddColumn,
  units,
  onAddUnit
}) => {
  const [newRowName, setNewRowName] = useState<string>('');
  const [newColumnName, setNewColumnName] = useState<string>('');
  const [selectedColorUnit, setSelectedColorUnit] = useState<string>(units.find(u => u.name === 'Shade')?.name || units[0]?.name || '');
  const [selectedStorageUnit, setSelectedStorageUnit] = useState<string>(units.find(u => u.name === 'GB')?.name || units[0]?.name || '');
  const [newUnitName, setNewUnitName] = useState<string>('');
  const [showAddUnit, setShowAddUnit] = useState<boolean>(false);
  
  if (!grid) return null;

  const handleAddRow = () => {
    if (newRowName.trim() && onAddRow) {
      onAddRow(newRowName, selectedColorUnit);
      setNewRowName('');
    }
  };

  const handleAddColumn = () => {
    if (newColumnName.trim() && onAddColumn) {
      onAddColumn(newColumnName, selectedStorageUnit);
      setNewColumnName('');
    }
  };

  const handleAddUnit = () => {
    if (!newUnitName.trim()) return;
    onAddUnit(newUnitName);
    setNewUnitName('');
    setShowAddUnit(false);
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
        Price Configuration for {grid.name} {grid.unit}
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
                  {column.name} {column.unit}
                </th>
              ))}
              {/* Add Column button in the header */}
              <th style={{ padding: '12px', borderBottom: '2px solid #e0e0e0', backgroundColor: '#f0f9ff' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Value</label>
                      <Input 
                        value={newColumnName}
                        onChange={(e) => setNewColumnName(e.target.value)}
                        placeholder="Size"
                        style={{ width: '80px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Unit</label>
                      <Select value={selectedStorageUnit} onValueChange={setSelectedStorageUnit}>
                        <SelectTrigger style={{ width: '80px' }}>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {units.map(unit => (
                            <SelectItem key={unit.id} value={unit.name}>
                              {unit.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="add-new" className="text-blue-500">+ Add new</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddColumn} size="sm">
                      <Plus size={16} />
                    </Button>
                  </div>
                  
                  {selectedStorageUnit === 'add-new' || showAddUnit ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Input
                        value={newUnitName}
                        onChange={(e) => setNewUnitName(e.target.value)}
                        placeholder="New unit"
                        style={{ width: '100px' }}
                      />
                      <Button onClick={handleAddUnit} size="sm" variant="outline">
                        Add
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-500"
                      onClick={() => setShowAddUnit(true)}
                    >
                      <Plus size={14} /> Add unit
                    </Button>
                  )}
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
                  {row.name} {row.unit}
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Color</label>
                      <Input 
                        value={newRowName}
                        onChange={(e) => setNewRowName(e.target.value)}
                        placeholder="Color name"
                        style={{ width: '150px' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Unit</label>
                      <Select value={selectedColorUnit} onValueChange={setSelectedColorUnit}>
                        <SelectTrigger style={{ width: '100px' }}>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {units.map(unit => (
                            <SelectItem key={unit.id} value={unit.name}>
                              {unit.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="add-new" className="text-blue-500">+ Add new</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddRow} size="sm">
                      <Plus size={16} />
                      Add Color
                    </Button>
                  </div>
                  
                  {selectedColorUnit === 'add-new' || showAddUnit ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Input
                        value={newUnitName}
                        onChange={(e) => setNewUnitName(e.target.value)}
                        placeholder="New unit name"
                        style={{ width: '150px' }}
                      />
                      <Button onClick={handleAddUnit} size="sm" variant="outline">
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceTable;
