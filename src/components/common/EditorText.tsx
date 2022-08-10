import React, { forwardRef, useImperativeHandle } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditorText: React.FC<any> = forwardRef(({ defaultValue }, ref) => {
  const editorRef = React.useRef<any>(null);
  const [keyID, setKeyID] = React.useState<number>(1);
  useImperativeHandle(ref, () => ({
    contentEditor: () => {
      if (editorRef.current) return editorRef.current.getContent();
    },
  }));

  React.useEffect(() => {
    if (defaultValue === "<p></p>") {
      setKeyID(keyID + 1);
    }
  }, [defaultValue]);

  return (
    <Editor
      apiKey="36o0ojhuc7sllttxedj7a8v063r27hqfnq1kce5entqyc4vt"
      key={keyID}
      initialValue={defaultValue}
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        height: 500,
        menubar: true,
        plugins: "link image code",
        images_upload_url: "postAcceptor.php",
        toolbar:
          "undo redo | styles | image | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        toolbar_mode: "scrolling",
      }}
    />
  );
});
export default EditorText;
