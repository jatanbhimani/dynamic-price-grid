
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Search as SearchIcon } from 'lucide-react';

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

interface SearchProps {
  grids: GridOption[];
  rows: RowOption[];
  columns: ColumnOption[];
  priceData: PriceData;
}

const Search: React.FC<SearchProps> = ({ grids, rows, columns, priceData }) => {
  const [selectedGrid, setSelectedGrid] = useState<string>('');
  const [selectedRow, setSelectedRow] = useState<string>('');
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [searchResult, setSearchResult] = useState<number | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = () => {
    if (selectedGrid && selectedRow && selectedColumn) {
      const price = priceData[selectedGrid]?.[selectedRow]?.[selectedColumn] ?? null;
      setSearchResult(price);
      setHasSearched(true);
    }
  };

  const getGridName = (id: string) => {
    return grids.find(g => g.id === id)?.name || '';
  };

  const getRowName = (id: string) => {
    return rows.find(r => r.id === id)?.name || '';
  };

  const getColumnName = (id: string) => {
    return columns.find(c => c.id === id)?.name || '';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Product Price</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>RAM Option</label>
            <Select value={selectedGrid} onValueChange={setSelectedGrid}>
              <SelectTrigger>
                <SelectValue placeholder="Select RAM option" />
              </SelectTrigger>
              <SelectContent>
                {grids.map(grid => (
                  <SelectItem key={grid.id} value={grid.id}>
                    {grid.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Color</label>
            <Select value={selectedRow} onValueChange={setSelectedRow}>
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {rows.map(row => (
                  <SelectItem key={row.id} value={row.id}>
                    {row.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Storage</label>
            <Select value={selectedColumn} onValueChange={setSelectedColumn}>
              <SelectTrigger>
                <SelectValue placeholder="Select storage option" />
              </SelectTrigger>
              <SelectContent>
                {columns.map(column => (
                  <SelectItem key={column.id} value={column.id}>
                    {column.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleSearch}
            disabled={!selectedGrid || !selectedRow || !selectedColumn}
            style={{ marginTop: '10px' }}
          >
            <SearchIcon size={16} style={{ marginRight: '5px' }} />
            Search Price
          </Button>
          
          {hasSearched && (
            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              borderRadius: '8px',
              backgroundColor: searchResult !== null ? '#f0f9ff' : '#fff5f5',
              border: `1px solid ${searchResult !== null ? '#cce5ff' : '#f8d7da'}`
            }}>
              {searchResult !== null ? (
                <div>
                  <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Price Found:</div>
                  <div style={{ fontSize: '1.5rem', color: '#0066cc' }}>
                    ₹ {searchResult.toLocaleString()}
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#555' }}>
                    For {getGridName(selectedGrid)}, {getRowName(selectedRow)}, {getColumnName(selectedColumn)}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', color: '#dc3545' }}>
                  <AlertCircle size={18} style={{ marginRight: '10px' }} />
                  <span>No price found for this configuration. Please check your selection or configure this price in the table.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Search;
