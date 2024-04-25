'use server';

import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createSnippet = async (
  formState: { message: string },
  formData: FormData
) => {
  const title = formData.get('title') as string;
  const code = formData.get('code') as string;

  if (!validateField(title)) {
    return {
      message: 'Title must be longer.',
    };
  }
  if (!validateField(code)) {
    return {
      message: 'code must have 3 characters.',
    };
  }

  await db.snippet.create({
    data: {
      title,
      code,
    },
  });

  /*
    could handle here
    the database error
  */
  revalidatePath('/');
  redirect('/');
};

export async function getSnippet(id: number) {
  return await db.snippet.findFirst({
    where: { id },
  });
}
export async function getSnippetList() {
  return await db.snippet.findMany();
}

export async function deleteSnippet(id: number | undefined) {
  await db.snippet.delete({
    where: { id },
  });

  revalidatePath('/');
  redirect('/');
}

export async function updateSnippet(id: number | undefined, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

// helper functions
function validateField(field: string) {
  if (typeof field === 'string' && field.length >= 3) {
    return true;
  }
  return false;
}
