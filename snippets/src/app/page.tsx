import { db } from '@/db';
import Link from 'next/link';

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className="flex justify-between items-center p-2 border rounded"
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Snippets</div>
        <Link href={'/snippets/new'} className="border rounded p-2">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderSnippets}</div>
    </div>
  );
}
