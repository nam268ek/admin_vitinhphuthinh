import { Editor } from "@tinymce/tinymce-react";
import React, { forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import { reqUploadImageEditor } from "../redux/Slices/PrimarySlice";

const EditorText: React.FC<any> = forwardRef(({ defaultValue, statusChangeEditor }, ref) => {
  const editorRef = React.useRef<any>(null);
  const dispatch = useDispatch();
  const [keyID, setKeyID] = React.useState<number>(1);
  const TINYMCE = process.env.REACT_APP_TINYMCE || "";

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

  const image_upload_handler = (blobInfo: any): Promise<string> =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("editor", blobInfo.blob(), blobInfo.filename());

      dispatch(reqUploadImageEditor(formData))
        .then((res: any) => {
          resolve(res.payload.data.secure_url);
        })
        .catch((err: any) => {
          reject(err.payload.message);
        });
    });

  return (
    <Editor
      apiKey={TINYMCE}
      key={keyID}
      initialValue={defaultValue}
      onInit={(evt, editor) => (editorRef.current = editor)}
      onChange={statusChangeEditor}
      init={{
        height: 500,
        menubar: true,
        plugins: "link image code",
        // automatic_uploads: true,
        // file_picker_types: "image",
        // file_picker_callback: (cb, value, meta) => handleFilePickerCallback(cb, value, meta),
        // images_upload_url: `${process.env.REACT_APP_PROD_API_URL}image-upload`,
        // images_upload_credentials: true,
        images_upload_handler: image_upload_handler,
        // image_prepend_url: 'https://www.example.com/images/',
        image_title: true,
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
