import { useState, useEffect, useCallback } from 'react';
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from '../api/axios';

const USER_LIST_URL = 'api/admin/user/search'
const ACCESS_TOKEN = 'accessToken';
const token = localStorage.getItem(ACCESS_TOKEN);

type UserList = {
    id: string,
    name: string,
    email: string,
    address: string,
    role?: string
}

type PaginationInfo = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

type ApiResponse = {
    users: UserList[];
    pagination: PaginationInfo;
}

const UserListings = () => {
    const [userList, setUserList] = useState<UserList[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo>({
        page: 1,
        limit: 5,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Debounced search function
    const getUserList = useCallback(async (
        page: number = 1,
        search: string = '',
        role: string = '',
        limit: number = 10
    ) => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            params.append('page', page.toString());
            params.append('limit', limit.toString());

            if (search.trim()) {
                params.append('name', search);
                params.append('email', search);
            }

            if (role) {
                params.append('role', role);
            }

            const response = await axios.get(`${USER_LIST_URL}?${params.toString()}`, {
                headers: {
                    Authorization: token,
                }
            });

            if (response.status !== 200) {
                throw new Error('Unable to fetch user list');
            }

            const data: ApiResponse = response.data;
            setUserList(data.users);
            setPagination(data.pagination);

        } catch (err: any) {
            setError(err.message || 'Failed to fetch users');
            setUserList([]);
        } finally {
            setLoading(false);
        }
    }, [token]);


    useEffect(() => {
        getUserList(1, searchTerm, roleFilter, pagination.limit);
    }, []);

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            getUserList(1, searchTerm, roleFilter, pagination.limit);
        }, 500); // 500ms delay

        return () => clearTimeout(timeoutId);
    }, [searchTerm, roleFilter, getUserList]);

    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        const sorted = [...userList].sort((a, b) => {
            if (sortOrder === 'asc') {
                return b.email.localeCompare(a.email);
            } else {
                return a.email.localeCompare(b.email);
            }
        });
        setUserList(sorted);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            getUserList(newPage, searchTerm, roleFilter, pagination.limit);
        }
    };

    const getRoleBadgeColor = (role?: string) => {
        switch (role) {
            case 'ADMIN':
                return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'STORE_OWNER':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'USER':
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="w-full max-w-6xl py-1 bg-white">
            <div className="border border-slate-300 rounded-lg bg-white flex flex-col h-[70vh]">
                {/* Filters */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
                    <div className="flex gap-4 flex-1">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 max-w-sm px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">All Roles</option>
                        <option value="NORMAL_USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="STORE_OWNER">Store Owner</option>
                    </select>
                </div>

                {/* Loading/Error */}
                {loading && (
                    <div className="px-6 py-8 text-center text-slate-500 flex-1">
                        Loading users...
                    </div>
                )}

                {error && (
                    <div className="px-6 py-4 bg-red-50 border-b border-red-200">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                {/* Table */}
                {!loading && !error && (
                    <div className="flex-1 ">
                        <table className="w-full overflow-y-auto">
                            <thead className="sticky top-0 bg-white z-10 shadow-sm">
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
                                        Address
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Role
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {!userList || userList.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-6 py-8 text-center text-slate-500"
                                        >
                                            No users found
                                        </td>
                                    </tr>
                                ) : (
                                    userList.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                                {user.address || "N/A"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(
                                                        user.role
                                                    )}`}
                                                >
                                                    {user.role || "USER"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {!loading && !error && userList && userList.length > 0 && (
                    <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-700">
                                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                                {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                                {pagination.total} users
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={!pagination.hasPrev}
                                className="p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed rounded"
                            >
                                <ChevronLeft size={16} />
                            </button>

                            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded">
                                {pagination.page}
                            </span>
                            <span className="text-slate-500 text-sm">
                                of {pagination.totalPages}
                            </span>

                            <button
                                onClick={() => handlePageChange(pagination.page + 1)}
                                disabled={!pagination.hasNext}
                                className="p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed rounded"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default UserListings;