import React from 'react';
import { Form } from 'react-router-dom';

interface CategoryModalProps {
  id: number;
  type: 'post' | 'patch';
  setVisibleModal: (visible: boolean) => void;
}

export const CategoryModal = ({
  id,
  type,
  setVisibleModal,
}: CategoryModalProps) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full bg-black/50 flex justify-center items-center">
      <Form
        action="/categories"
        method={type}
        onSubmit={() => setVisibleModal(false)}
        className="grid gap-2 w-[300px] rounded-b-md bg-slate-900 p-5"
      >
        <label htmlFor="title">
          <small>Category Title</small>
          <input name="id" type="hidden" value={id} />
          <input
            className="input w-full"
            type="text"
            name="title"
            placeholder="Title"
          />
        </label>

        <div className="flex items-center gap-2">
          <button className="btn btn-green" type="submit">
            {type === 'patch' ? 'Save' : 'Submit'}
          </button>
          <button
            className="btn btn-red"
            onClick={() => setVisibleModal(false)}
          >
            Close
          </button>
        </div>
      </Form>
    </div>
  );
};
