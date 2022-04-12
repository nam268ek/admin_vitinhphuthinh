import React from "react";
// import { EditorState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "@tinymce/tinymce-react";

const EditorText: React.FC = () => {
  const editorRef = React.useRef<any>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey="36o0ojhuc7sllttxedj7a8v063r27hqfnq1kce5entqyc4vt"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | styles | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          toolbar_mode: 'scrolling',
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
};
export default EditorText;
