// ApiList.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { Plus, MoreVertical, Search, ChevronDown, Check } from 'lucide-react';
import Pagination from '@/components/ui/Pagination';
import Modal from '@/components/ui/Modal/Modal';
import Link from 'next/link';

interface ApiData {
    id: number;
    version: string;
    endpoint: string;
    method: string;
    description: string;
    status: string;
    type: string;
    createdBy: string;
}

interface ApiListProps {
    data: ApiData[];
}

const ApiList: React.FC<ApiListProps> = ({ data }) => {
    const [apiData, setApiData] = useState<ApiData[]>(data);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [methodFilter, setMethodFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');

    const [openFilter, setOpenFilter] = useState<string | null>(null);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [apiToDelete, setApiToDelete] = useState<ApiData | null>(null);

    const methods = ['All', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
    const statuses = ['All', 'Draft', 'Pending Approval', 'Active', 'Suspended', 'Deprecated'];
    const types = ['All', 'Public', 'Private'];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.filter-dropdown-container')) {
                setOpenFilter(null);
            }
            if (!target.closest('.action-menu-container')) {
                setOpenMenuId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const FilterDropdown = ({ label, value, options, onSelect, type }: {
        label: string;
        value: string;
        options: string[];
        onSelect: (val: string) => void;
        type: string;
    }) => (
        <div className={`filter-dropdown-container relative flex flex-col gap-2 min-w-[160px]`}>
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <div className="relative">
                <button
                    onClick={() => setOpenFilter(openFilter === type ? null : type)}
                    className="flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                    <span className="text-gray-700 truncate mr-2">{value}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform ${openFilter === type ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown menu with higher z-index and fixed positioning */}
                {openFilter === type && (
                    <>
                        {/* Backdrop to capture clicks */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setOpenFilter(null)}
                        />

                        {/* Dropdown positioned absolutely within the relative container */}
                        <div className="absolute top-full left-0 w-full mt-1 z-50">
                            <div className="bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                {options.map((option) => (
                                    <div
                                        key={option}
                                        onClick={() => {
                                            onSelect(option);
                                            setOpenFilter(null);
                                        }}
                                        className="px-3 py-2 text-sm hover:bg-blue-50 cursor-pointer flex justify-between items-center text-gray-700"
                                    >
                                        <span className="truncate">{option}</span>
                                        {value === option && <Check className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

    const handleDeleteClick = (api: ApiData) => {
        setApiToDelete(api);
        setDeleteModalOpen(true);
        setOpenMenuId(null);
    };

    const confirmDelete = () => {
        if (apiToDelete) {
            setApiData(prevData => prevData.filter(item => item.id !== apiToDelete.id));
            console.log("Deleted API:", apiToDelete.id);
        }
        setDeleteModalOpen(false);
        setApiToDelete(null);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setApiToDelete(null);
    };

    const filteredData = apiData.filter(item => {
        const matchesSearch = item.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMethod = methodFilter === 'All' || item.method === methodFilter;
        const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
        const matchesType = typeFilter === 'All' || item.type === typeFilter;
        return matchesSearch && matchesMethod && matchesStatus && matchesType;
    });

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

    return (
        <div className="space-y-4  scrollbar-hide">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-800">API List</h1>
                <Link href="/apimanagement/create">
                    <Button
                        type="button"
                        variant="primary"
                        size="md"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Create New API
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex flex-wrap items-end gap-4 mb-4">
                    <FilterDropdown
                        label="HTTP Method"
                        value={methodFilter}
                        options={methods}
                        onSelect={setMethodFilter}
                        type="method"
                    />
                    <FilterDropdown
                        label="Status"
                        value={statusFilter}
                        options={statuses}
                        onSelect={setStatusFilter}
                        type="status"
                    />
                    <FilterDropdown
                        label="Type"
                        value={typeFilter}
                        options={types}
                        onSelect={setTypeFilter}
                        type="type"
                    />
                </div>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by endpoint name..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">API Version</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Endpoint Name</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">HTTP Method</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Description</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Status</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Type</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Created By</th>
                            <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {paginatedData.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-700">{item.version}</td>
                                <td className="px-6 py-4 text-sm font-mono text-gray-600">{item.endpoint}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{item.method}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{item.description}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-3 py-1 rounded-md text-xs font-semibold 
                                        ${item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                            item.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                                                item.status === 'Pending Approval' ? 'bg-amber-100 text-amber-700' :
                                                    item.status === 'Suspended' ? 'bg-orange-100 text-orange-700' :
                                                        item.status === 'Deprecated' ? 'bg-red-100 text-red-700' :
                                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-3 py-1 rounded-md text-xs font-semibold 
                                        ${item.type === 'Public' ? 'bg-purple-100 text-purple-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                        {item.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold">
                                            {item.createdBy[0]}
                                        </div>
                                        <span className="text-gray-700">{item.createdBy}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="action-menu-container relative">
                                        <button
                                            onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <MoreVertical className="w-4 h-4 text-gray-600" />
                                        </button>

                                        {/* Action menu with backdrop */}
                                        {openMenuId === item.id && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-40"
                                                    onClick={() => setOpenMenuId(null)}
                                                />
                                                <div className="absolute right-0 top-8 w-48 z-50">
                                                    <div className="bg-white rounded-md shadow-xl border border-gray-100 py-1">
                                                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-left">
                                                            <span className="text-lg">▶</span> Open in playground
                                                        </button>
                                                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-left">
                                                            <span className="text-lg">👁</span> View
                                                        </button>
                                                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-left">
                                                            <span className="text-lg">✎</span> Edit
                                                        </button>
                                                        <div className="border-t border-gray-100 my-1"></div>
                                                        <button
                                                            onClick={() => handleDeleteClick(item)}
                                                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                                                        >
                                                            <span className="text-lg">🗑</span> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="border-t border-gray-200 px-6 py-4 bg-white">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        rowsPerPage={rowsPerPage}
                        totalItems={filteredData.length}
                        onPageChange={setCurrentPage}
                        onRowsPerPageChange={setRowsPerPage}
                    />
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={closeDeleteModal}
                title="Are you sure"
                message={`You want to delete this API`}
                imageSrc="/icons/warning.png"
                imageAlt="Danger Icon"
                imageWidth={48}
                imageHeight={48}
                closeOnBackdrop={true}
                closeOnEsc={true}
                size="sm"
                overlayClassName="z-[100]"
                footer={
                    <div className="flex gap-3">
                        <button
                            onClick={closeDeleteModal}
                            className="flex-1 py-2 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="flex-1 py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                }
            />
        </div>
    );
};

export default ApiList;