/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom';
import {  ITransactionType, ITransactions } from '../types/types';
import { formatDate } from '../helpers/date.helper';
import { formatToUSD } from '../helpers/currency.helper';
import { instance } from '../api/axios.api';
import ReactPaginate from 'react-paginate';

interface TransactionTableProps {
	limit: number
}

export const TransactionTable = ({ limit }: TransactionTableProps) => {
	const [data, setData] = useState<ITransactions[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);

	const { transactions } = useLoaderData()

	const fetchTransactions = async (page: number) => {
		const response = await instance.get(`/transactions/pagination?page=${page}&limit=${limit}`);

		setData(response.data);
		setTotalPages(Math.ceil(transactions.length / limit));
		// setCurrentPage(Math.ceil(transactions.length / limit));
	}

	const handlePageChange = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected + 1);
	}
	

	useEffect(() => {
		fetchTransactions(currentPage)
	}, [currentPage, JSON.stringify(transactions)])

	if(!data.length){
		return <h3>No content</h3>
	}

	return (
		<>
		<ReactPaginate 
		
			className='flex gap-3 justify-end mt-3 items-center'
			activeClassName='bg-blue-600 rounded-md'
			pageLinkClassName='text-white text-xs py-1 px-2 rounded-sm'
			previousClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
			nextClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
			disabledClassName='text-white/50 cursor-not-allow'
			disabledLinkClassName='text-slate-600 cursor-not-allow'
			pageCount={totalPages}
			pageRangeDisplayed={1}
			marginPagesDisplayed={2}
			onPageChange={handlePageChange}
		/>
			<div className='bg-slate-800 px-4 py-3 mt-4 rounded-md'>
				<table className='w-full'>
					<thead>
						<td className="font-bold">#</td>
						<td className="font-bold">Title</td>
						<td className="font-bold">Amount</td>
						<td className="font-bold">Category</td>
						<td className="font-bold">Date</td>
						<td className="font-bold text-right">Action</td>
					</thead>
					<tbody>
						{(data as ITransactions[]).map(({id, title, type, category, amount, createdAt }, idx) => (
						<tr key={id}>
							<td>{idx + 1}</td>
							<td>{title}</td>
							<td className={type === ITransactionType.INCOME ? 'text-green-500' : 'text-red-500'}>
								{type === ITransactionType.INCOME 
								? 
								`+${formatToUSD.format(amount)}` 
								: 
								`-${formatToUSD.format(amount)}`}
							</td>
							<td>{type}</td>
							<td>{category?.title || 'Other'}</td>
							<td>{formatDate(createdAt)}</td>
							<td>
								<Form method='delete' action="/transactions">
									<input name='id' type='hidden' value={id} />
									<button className='btn hover:btn-red ml-auto'>
										<FaTrash/>
									</button>
								</Form>
							</td>
						</tr>
							))}
					</tbody>
				</table>

			</div>
		</>
		)
}