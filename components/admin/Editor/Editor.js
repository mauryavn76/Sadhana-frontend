import { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Button from '../../multiusable/button';
const EditorJs = dynamic(() => import('react-editor-js'), { ssr: false });

let editorInstance;

const Editor = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editorTools, setEditorTools] = useState();

  const onSaveHandler = async (editorInstance) => {
    try {
      const blogData = await editorInstance.save();
      if (!title || title === '')
        throw new Error('Title cannot be empty. Please enter title');
      if (!blogData.blocks[0])
        throw new Error('Blog cannot be empty. Please enter some data');
      props.onSave(blogData, title, description);
    } catch (err) {
      console.log(err);
    }
  };

  let editorComponent;
  if (!editorTools) editorComponent = 'Loading...';
  else {
    editorComponent = (
      <div className="w-full flex flex-row items-center">
        <EditorJs
          holder="custom"
          className="w-full"
          instanceRef={(instance) => (editorInstance = instance)}
          tools={editorTools}
          placeholder={`Let's write an awesome blog!`}
        />
      </div>
    );
  }

  useEffect(() => {
    const importConstants = async () => {
      const tools = (await import('../Editor/EditorConstants')).default;
      setEditorTools(tools);
    };

    importConstants();
  }, []);

  return (
    <div className="flex flex-col my-10 items-center">
      <div className="flex flex-col w-4/5">
        <input
          className="border-[1px] border-black mb-4 block w-1/2 h-8"
          placeholder="Your Blog Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <textarea
          className="border-[1px] border-black mb-4 block w-1/2"
          placeholder="Your Blog Description"
          rows="4"
          cols="30"
          // value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div id="custom" className="border-[1px] border-black w-4/5 h-[70vh]">
        {editorComponent}
      </div>
      <div className="flex w-4/5 mt-2 justify-end">
        <Button
          color="bg-[#8FECFF]"
          label="Save"
          onTap={() => onSaveHandler(editorInstance)}
        />
      </div>
    </div>
  );
};

export default Editor;
