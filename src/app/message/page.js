"use client"
import Layout from '@/components/layout';
import React, { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import loader from "@/assets/loader.png";
import Image from "next/image";

function MessageList() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/message?page=${page}&pageSize=${pageSize}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                if (response.ok) {
                    setMessages(result.data);
                    setTotal(result.total);
                } else {
                    console.error(result.error);
                }
            } catch (error) {
                console.error('An unexpected error occurred:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [page, pageSize]);

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < Math.ceil(total / pageSize)) {
            setPage(page + 1);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="">
                        <Image src={loader} width={120} height={120} alt="Loading" className="animate-bounce" />
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className='mt-12'>
                <div>
                    <h1 className='text-blue-600 text-xl font-bold ml-6'>Messages</h1>
                </div>
                <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto mx-6">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">Prenom</th>
                                <th className="py-3 px-6">Nom</th>
                                <th className="py-3 px-6">Email</th>
                                <th className="py-3 px-6">Telephone</th>
                                <th className="py-3 px-6"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {
                                messages.map((message) => (
                                    <tr key={message.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{message.firstname}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{message.lastname}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{message.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{message.tel}</td>
                                        <td className="px-6 py-4 flex">
                                            <a href="javascript:void()" className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                <FaEye className='w-6 h-6 text-blue-500' />
                                            </a>
                                            <a href="javascript:void()" className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                <MdDelete className='w-6 h-6 text-blue-500' />
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="max-w-screen-xl mx-auto mt-4 px-4 text-gray-600 md:px-8">
                    <div className="flex items-center justify-between text-sm text-gray-600 font-medium">
                        <a
                            onClick={handlePreviousPage}
                            disabled={page === 1}
                            className="px-4 py-2 cursor-pointer border rounded-lg duration-150 hover:bg-gray-50">Previous</a>
                        <div>
                            Page {page} sur {Math.ceil(total / pageSize)}
                        </div>
                        <a
                            onClick={handleNextPage}
                            disabled={page === Math.ceil(total / pageSize)}
                            className="px-4 py-2 cursor-pointer border rounded-lg duration-150 hover:bg-gray-50">Next</a>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default MessageList;
