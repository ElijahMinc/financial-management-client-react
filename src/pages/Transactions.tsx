import React from 'react';
import { TransactionForm } from '../components/TransactionForm';
import { instance } from '../api/axios.api';
import { ICategory, IResponseTransactionLoader, ITransactions } from '../types/types';
import { toast } from 'react-toastify';
import { TransactionTable } from '../components/TransactionTable';
import { useLoaderData } from 'react-router-dom';
import { formatToUSD } from '../helpers/currency.helper';
import { Chart } from '../components/Chart';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transactionsAction = async ({ request }: any) => {

  switch (request.method) {
    case 'POST': {
      const formData = await request.formData()
      const newTransaction = {
        title: formData.get('title'),
        amount: +formData.get('amount'),
        category: formData.get('category'),
        type: formData.get('type')
      }


      await instance.post('/transactions', newTransaction)

      toast.success('Transaction added')


      return null
    }
    case 'DELETE': {
      const formData = await request.formData()
      const transactionId = formData.get('id')

      await instance.delete(`transactions/transaction/${transactionId}`)

      toast.success('Transaction deleted')
      
      return null
    }
  }

  const data = {};

  return data;
};

export const transactionsLoader = async () => {
  const { data: categories } = await instance.get<ICategory[]>('/categories');
  const { data: transactions } = await instance.get<ITransactions[]>('/transactions');
  const {data:totalIncome} = await instance.get<number>('/transactions/income/find')
  const {data: totalExpense} = await instance.get<number>('/transactions/expense/find')

  const data = {
    categories,
    transactions,
    totalIncome,
    totalExpense
  };

  return data;
};

export const Transactions: React.FC = () => {
  const { totalExpense, totalIncome } = useLoaderData() as IResponseTransactionLoader

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-4 items-start ">
        {/* Add transaction Form */}
        <div className="col-span-2 grid">
          <TransactionForm />
        </div>

        {/* Statistic blocks */}
        <div className="rounded-md bg-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="uppercase text-md font-bold text-center">
                Total Income
              </p>
              <p className="bg-green-600 mt-2 rounded-sm p-1 text-center">
                {formatToUSD.format(totalIncome)}
              </p>
            </div>

            <div>
              <p className="uppercase text-md font-bold text-center">
                Total Expense
              </p>
              <p className="bg-red-600 mt-2 rounded-sm p-1 text-center">
                {formatToUSD.format(totalExpense)}  
              </p>
            </div>
          </div>
          <>
           <Chart totalExpense={totalExpense} totalIncome={totalIncome} />
          </>
        </div>
      </div>

      {/* Transaction Table */}
      <h3 className="my-5">
        <TransactionTable limit={5}/>
      </h3>
    </>
  );
};
