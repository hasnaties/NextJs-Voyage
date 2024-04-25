'use client';

import type { Snippet } from '@prisma/client';
import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { updateSnippet } from '@/actions';

interface SnippetEditor {
  snippet: Snippet | null;
}

function SnippetEditor({ snippet }: SnippetEditor) {
  const [code, setCode] = useState(snippet?.code);

  const editSnippetAction = updateSnippet.bind(
    null,
    snippet?.id,
    code as string
  );

  //onChange for Editor
  function handleEditorChange(value: string = '') {
    setCode(value);
  }

  return (
    <div className="flex flex-col gap-2">
      <Editor
        height={'40vh'}
        defaultLanguage="javascript"
        defaultValue={snippet?.code}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
        }}
      />

      <form action={editSnippetAction}>
        <button type="submit" className="border rounded p-2">
          Save
        </button>
      </form>
    </div>
  );
}

export default SnippetEditor;
