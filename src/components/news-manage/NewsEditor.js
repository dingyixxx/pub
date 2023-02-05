import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import style from "./NewsEditor.module.css";
export default function NewsEditor(props) {
  const [editorState, seteditorState] = useState("");

  useEffect(() => {
    if (!props.content) return;
    const contentBlock = htmlToDraft(props.content);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      seteditorState(EditorState.createWithContent(contentState));
    }
  }, [props.content]);

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      onEditorStateChange={(editorState) => {
        seteditorState(editorState);
      }}
      editorClassName={style.editorClassName}
      onBlur={() => {
        props.handleEditContent(
          draftToHtml(convertToRaw(editorState.getCurrentContent()))
        );
      }}
    />
  );
}
