import { uploadImage } from "@/utils/uploadImage";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

interface TinyEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TinyEditor({ value, onChange }: TinyEditorProps) {
  const editorRef = useRef<any>(null);
  const tinyApiKey = process.env.NEXT_PUBLIC_TINYMCE_KEY || "no-api-key";

  return (
    <Editor
      apiKey={tinyApiKey}
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      onInit={(evt, editor) => {
        editorRef.current = editor;
      }}
      value={value}
      onEditorChange={(val) => onChange(val)}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          "advlist", "autolink", "lists", "link", "image", "charmap",
          "preview", "anchor", "searchreplace", "visualblocks", "code",
          "fullscreen", "insertdatetime", "media", "table", "help", "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | removeformat | image media link | code fullscreen | help",
        images_upload_handler: async (blobInfo: any) => {
          const file = blobInfo.blob();
          const url = await uploadImage(file);
          return url;
        },
        automatic_uploads: true,
        file_picker_types: "image",
        content_style:
          "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; line-height: 1.6; color: #1a1a2e; padding: 16px; }",
        branding: false,
        promotion: false,

        license_key: "gpl" as any,
      }}
    />
  );
}