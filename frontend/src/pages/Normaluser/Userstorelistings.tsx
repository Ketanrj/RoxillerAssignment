import { useState, useMemo, useEffect } from 'react';
import { ArrowUpDown, Edit2 } from 'lucide-react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

const STORE_LIST_URL = 'api/user/storeList';

type StoreList = {
    id: number;
    name: string;
    email: string;
    address: string;
    totalRatings?: number;
    averageRating?: number;
};

const Userstorelistings = () => {
    const [storeList, setStoreList] = useState<StoreList[]>([]);
    const { auth } = useAuth();
    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const getStoreList = async () => {
            try {
                const response = await axios.get(STORE_LIST_URL, {
                    headers: { Authorization: auth.token },
                });

                if (response.status !== 200) {
                    throw new Error(`Unable to list store details: ${response.status}`);
                }
                console.log(response.data);
                setStoreList(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        getStoreList();
    }, [auth]);

    // Filter + Sort
    const filteredData = useMemo(() => {
        let filtered = storeList.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filtered.sort((a, b) => {
            return sortOrder === 'asc'
                ? a.email.localeCompare(b.email)
                : b.email.localeCompare(a.email);
        });

        return filtered;
    }, [storeList, searchTerm, sortOrder]);

    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleSubmitRating = (id: number, name: string, add: string, rating?: number) => {
        navigate('/Addrating', { state: { storeId: id, name: name, address: add, rating: rating || 0 } });
    }

    console.log()

    return (
        <div className="w-full max-w-4xl py-1 bg-white">
            <header className="bg-white border-b mx-4 border-slate-200 px-6 py-4">
                <h1 className="text-2xl font-semibold text-slate-900">Stores Page</h1>
            </header>
            <main className='flex mx-auto px-8 py-8'>
                <div className="flex w-full flex-col border border-slate-300 overflow-clip rounded-lg bg-white">
                    {/* Header with Search */}
                    <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                        <input
                            type="text"
                            placeholder="Filter name/email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 max-w-sm px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />

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
                                        <div
                                            className="flex items-center gap-1 cursor-pointer"
                                            onClick={handleSort}
                                        >
                                            Email
                                            <ArrowUpDown size={12} className="text-slate-400" />
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Total Rating
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Average Rating
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Add Rating
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
                                            {row.totalRatings ?? '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                            {row.averageRating ?? '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                            <button
                                                id='pass'
                                                type='submit'
                                                onClick={() => handleSubmitRating(row.id, row.name, row.address, row.averageRating)}
                                                className="flex text-sm items-center gap-1 font-normal hover:text-slate-800 hover:shadow-2xs cursor-pointer rounded-md  bg-slate-100 text-slate-600 px-3 border border-slate-300">
                                                <Edit2 size={12} />
                                                <span className='py-2 text-sm'>Give Rating</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Userstorelistings;
