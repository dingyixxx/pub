import React ,{useState}from 'react'
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw} from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import style from './NewsEditor.module.css'
export default function NewsEditor(props) {
    const [editorState, seteditorState] = useState('')
  return (
    <Editor
  editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  onEditorStateChange={(editorState)=>{
    seteditorState(editorState);}}
  editorClassName={style.editorClassName}
    onBlur={()=>{ props.handleEditContent(draftToHtml(convertToRaw(editorState.getCurrentContent()))) }}
/>
  )
}
