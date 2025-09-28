import React, { useState, useMemo } from 'react';
import { ChevronDown, ArrowUpDown } from 'lucide-react';

type Props = {
  title?: string;
};

const TableComponent = ({ title }: Props) => {

  const [data] = useState([
    { id: 1, name: 'John Michale', email: 'ken99@example.com', rating: '$316.00' },
    { id: 2, name: 'John Michale', email: 'abe45@example.com', rating: '$242.00' },
    { id: 3, name: 'John Michale', email: 'monserrat44@example.com', rating: '$837.00' },
    { id: 4, name: 'John Michale', email: 'silas22@example.com', rating: '$874.00' },
    { id: 5, name: 'John Michale', email: 'carmella@example.com', rating: '$721.00' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter and sort data based on search term and sort order
  const filteredData = useMemo(() => {
    let filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.rating.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort by email
    filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.email.localeCompare(b.email);
      } else {
        return b.email.localeCompare(a.email);
      }
    });

    return filtered;
  }, [data, searchTerm, sortOrder]);

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="w-full max-w-4xl py-1  bg-white">
      <div className="border border-slate-300 overflow-clip rounded-lg bg-white">
        {/* Header with Search */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Filter emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 max-w-sm px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          
          {/* Columns Dropdown */}
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Columns
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer" onClick={handleSort}>
                    Email
                    <ArrowUpDown size={12} className="text-slate-400" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  rating
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {row.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {row.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {row.rating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;