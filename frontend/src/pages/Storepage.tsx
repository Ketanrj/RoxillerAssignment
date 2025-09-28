import { useState, useMemo, useEffect } from 'react';
import { ChevronDown, ArrowUpDown, Search } from 'lucide-react';
import axios from '../api/axios';
import { Link } from 'react-router';

const STORE_LIST_URL = 'api/admin/store/search'
const ACCESS_TOKEN = 'accessToken';
const token = localStorage.getItem(ACCESS_TOKEN);

type StoreList = {
    id: number,
    name: string,
    email: string,
    address: string,
    ratingsCount?: number
}

const StorePage = () => {

    const [storeList, setStoreList] = useState<StoreList[]>();

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const getStoreList = async () => {
            const response = await axios.get(STORE_LIST_URL, {
                headers: {
                    Authorization: token,
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
        <div className="w-full h-screen font-satoshi bg-slate-50">
            <div className="flex flex-col">
                {/* Header */}
                <header className="bg-white border-b border-slate-200 px-6 py-4">
                    <h1 className="text-2xl font-semibold text-slate-900">Stores Page</h1>
                </header>
                <main className="flex-1 p-6 overflow-auto max-w-6xl">
                    <div className="flex  justify-between pb-8">
                        <div className="w-full">
                            <div className="relative ">
                                <Search size={20} className='absolute mt-2 ml-2  text-slate-700' />
                                <input
                                    type="text"
                                    placeholder="Filter emails..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 w-3xl max-w-8xl pl-8 bg-white py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Columns
                            <ChevronDown size={16} />
                        </button>
                    </div>
                    <div className="w-full py-1  bg-white">
                        <div className="border border-slate-300 overflow-clip rounded-lg bg-white">
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
                    <div className="mt-8 ">
                        <Link to='/createStore'>
                            <button className='bg-primary text-white text-shadow-2xs px-4 py-2 border border-slate-200 rounded-lg cursor-pointer hover:shadow-sm '>Add new Store</button>
                        </Link>
                    </div>
                </main>

            </div>
        </div>
    );
};

export default StorePage;



