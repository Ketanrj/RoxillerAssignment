import { useState, useMemo, useEffect } from 'react';
import { ChevronDown, ArrowUpDown } from 'lucide-react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const STORE_LIST_URL = 'api/admin/store/search'

type StoreList = {
    id: number,
    name: string,
    email: string,
    address: string,
    ratingsCount?: number
}

const StoreListings = () => {

    const [storeList, setStoreList] = useState<StoreList[]>();
    const {auth} = useAuth();

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const getStoreList = async () => {
            const response = await axios.get(STORE_LIST_URL, {
                headers: {
                    Authorization: auth.token,
                }
            });

            if (response.status != 200) {
                throw new Error('Unable to list store details', response.data);
            }
            setStoreList(response.data);
        }

        getStoreList();
    }, [])

    // Filter and sort data based on search term and sort order
    const filteredData = useMemo(() => {
        let filtered = storeList?.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Sort by email
        filtered?.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.email.localeCompare(b.email);
            } else {
                return b.email.localeCompare(a.email);
            }
        });

        return filtered;
    }, [storeList, searchTerm, sortOrder]);

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
                            {storeList?.map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                        {row.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                        {row.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                        {row.ratingsCount}
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

export default StoreListings;