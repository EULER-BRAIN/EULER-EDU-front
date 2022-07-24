import { Editor } from '@toast-ui/react-editor';
import "@toast-ui/editor/dist/i18n/ko-kr";
import '@toast-ui/editor/dist/toastui-editor.css';

const TuiEditor = (props) => {
  return (
    <Editor
      ref={ props.editorRef }
      height={ props.height }
      initialEditType={ props.initialEditType }
      language="ko-KR"
      useCommandShortcut={ false }
    />
  )
}
TuiEditor.defaultProps = {
  height: "500px",
  initialEditType: "wysiwyg"
}

export default TuiEditor
