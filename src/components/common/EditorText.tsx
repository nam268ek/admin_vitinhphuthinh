import React from "react";
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
          plugins: 'link image code',
          images_upload_url: 'postAcceptor.php',
          toolbar:
            "undo redo | styles | image | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          toolbar_mode: 'scrolling',
        }}
      />
    </>
  );
};
export default EditorText;
