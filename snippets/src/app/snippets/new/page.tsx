'use client';

import { createSnippet } from '@/actions';
import { useFormState } from 'react-dom';

function SnippetCreatePage() {
  const [formState, action] = useFormState(createSnippet, { message: '' });
  return (
    <form action={action}>
      <h3 className="font-bold m-3">Create Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            className="p-2 border rounder w-full"
          />
        </div>

        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            id="code"
            name="code"
            className="p-2 border rounder w-full"
          />
        </div>
        {formState.message ? (
          <div className="my-2 p-2 border rounded bg-red-200 border-red-400">
            {formState.message}
          </div>
        ) : null}
        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}

export default SnippetCreatePage;
