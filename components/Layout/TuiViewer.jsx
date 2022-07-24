import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

const TuiViewer = (props) => {
  return (
    <Viewer
      initialValue={props.initialValue}
    />
  )
}
TuiViewer.defaultProps = {
  initialValue: ''
}

export default TuiViewer
