import { deleteSnippet, getSnippetList } from '@/actions';
import { db } from '@/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export interface Id {
  params: {
    id: string;
  };
}

async function SnippetViewPage(props: Id) {
  const snippet = await db.snippet.findFirst({
    where: {
      id: parseInt(props.params.id),
    },
  });

  const editDeleteSnippet = deleteSnippet.bind(null, snippet?.id);

  if (!snippet) {
    return notFound();
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center m-4">
        <h1 className="font-bold text-xl">{snippet.title}</h1>
        <div className="flex gap-2">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="border rounded p-2"
          >
            Edit
          </Link>
          <form action={editDeleteSnippet}>
            <button className="border rounded p-2">Delete</button>
          </form>
        </div>
      </div>
      <div className="p-4 bg-gray-200 border rounded border-gray-200">
        {snippet?.code}
      </div>
    </div>
  );
}

/*
  Caching already existed
  Params
 */
export async function generateStaticParams() {
  const snippets = await getSnippetList();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}

export default SnippetViewPage;
