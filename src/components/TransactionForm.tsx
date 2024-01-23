import { FaPlus } from 'react-icons/fa';
import { Form, useLoaderData } from 'react-router-dom';
import { IResponseTransactionLoader } from '../types/types';
import { CategoryModal } from './CategoryModal';
import { useState } from 'react';

export const TransactionForm = () => {
  const [isVisibleCategoryModal, setIsVisibleCategoryModal] = useState(false)
  const { categories } = useLoaderData() as IResponseTransactionLoader;


  return (
    <div className="rounded-md bg-slate-800 p-4">
      <Form className="grid gap-4" method="post" action="/transactions">
        <label className="grid justify-content-start" htmlFor="title">
          <span className="text-start">Title</span>
          <input
            className="input border-slate-700"
            type="text"
            placeholder="Title..."
            name="title"
            required
          />
        </label>

        <label className="grid" htmlFor="amount">
          <span className="text-start">Amount</span>
          <input
            className="input border-slate-700"
            type="text"
            placeholder="Amount..."
            name="amount"
            required
          />
        </label>
        {/* Select */}

        {categories?.length ? (
          <label htmlFor="category" className="grid">
            <span className="text-start">Category</span>
            <select
              className="input border-slate-700 bg-slate-800"
              name="category"
              required
            >
              {categories.map(({id, title}) => (
                <option key={id} value={id}>{title}</option>
              ))}
            </select>
          </label>
        ) : (
          <h3 className='mt-1 text-red-300'>To continue create a category</h3>
        )}

        <button
           onClick={() => setIsVisibleCategoryModal(true)}
          className=" max-w-fit flex items-center gap-2 text-white/50 hover:text-white"
        >
          <FaPlus />
          <span>Manage Categories</span>
        </button>

        {/* Radio btns */}
        <div className="flex gap-4 items-center">
          <label
            className="cursor-pointer flex items-center gap-2"
            htmlFor="income"
          >
            <input
              id="income"
              type="radio"
              name="type"
              value="income"
              className="form-radio text-blue-600 w-[20px] h-[20px]"
            />
            <span>Income</span>
          </label>
          <label
            className="cursor-pointer flex items-center gap-2"
            htmlFor="expense"
          >
            <input
              id="expense"
              type="radio"
              name="type"
              value="expense"
              className="form-radio text-blue-600 w-[20px] h-[20px]"
            />
            <span>Expense</span>
          </label>
        </div>

        {/* Submit */}

        <button type='submit' className="btn btn-green max-w-fit mt-2">Submit</button>
      </Form>

      {isVisibleCategoryModal && (
        <CategoryModal
          type= 'post'
          id={0}
          setVisibleModal={() => {
            setIsVisibleCategoryModal(false);
          }}
        />
      )}

    </div>
  );
};
