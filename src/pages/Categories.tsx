import React, { useState } from 'react';
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { Form, useLoaderData } from 'react-router-dom';
import { CategoryModal } from '../components/CategoryModal';
import { instance } from '../api/axios.api';
import { ICategory } from '../types/types';
import { toast } from 'react-toastify';

export const categoriesAction = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      try {
        const formData = await request.formData();

        const categoryData = {
          title: formData.get('title'),
        };

        await instance.post('/categories', categoryData);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }

      return null;
    }
    case 'PATCH': {
      try {
        const formData = await request.formData();

        const categoryData = {
          id: formData.get('id'),
          title: formData.get('title'),
        };

        await instance.patch(
          `/categories/category/${categoryData.id}`,
          categoryData,
        );
      } catch (error: any) {
        toast.error(error.response.data.message);
      }

      return null;
    }
    case 'DELETE': {
      try {
        const formData = await request.formData();

        const categoryId = formData.get('id');

        await instance.delete(`/categories/category/${categoryId}`);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }

      return null;
    }
    default:
      break;
  }
};

export const categoriesLoader = async () => {
  const { data } = await instance.get<ICategory[]>('/categories');

  return data;
};

export const Categories: React.FC = () => {
  const [categoryId, setCategoryId] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const categories = useLoaderData() as ICategory[];

  const [isVisibleModal, setVisibleModal] = useState(false);
  console.log('categoryId', categoryId);
  return (
    <>
      <div className="mt-10 p-4 rounded-md bg-slate-800">
        <h1>Your category list:</h1>
        {/* Category list */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {categories.map(({ id, title }) => (
            <div
              key={id}
              className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative"
            >
              {title}
              <div className="transition-all hidden group-hover:flex absolute px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 justify-between items-center">
                <button
                  onClick={() => {
                    setVisibleModal(true);
                    setCategoryId(id);
                    setIsEdit(true);
                  }}
                >
                  <AiFillEdit />
                </button>

                <Form className="flex " method="delete" action="/categories">
                  <input name="id" type="hidden" value={id} />
                  <button type="submit">
                    <AiFillCloseCircle />
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setVisibleModal(true)}
          className="mt-3 max-w-fit flex items-center gap-2 text-white/50 hover:text-white"
        >
          <FaPlus />
          <span>Create a new category</span>
        </button>
      </div>
      {/* Add Category Modal */}
      {isVisibleModal && (
        <CategoryModal
          type={isEdit ? 'patch' : 'post'}
          id={categoryId}
          setVisibleModal={() => {
            setVisibleModal(false);
            setIsEdit(false);
          }}
        />
      )}

      {/* Edit Category Modal */}
    </>
  );
};
