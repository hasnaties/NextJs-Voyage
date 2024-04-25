import { getSnippet } from '@/actions';
import { Id } from '../page';
import SnippetEditor from './SnippetEditor';

async function SnippetEditPage(props: Id) {
  const id = parseInt(props.params.id);
  const snippet = await getSnippet(id);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bond text-xl">{snippet?.title}</h1>
      <SnippetEditor snippet={snippet} />
    </div>
  );
}

export default SnippetEditPage;
