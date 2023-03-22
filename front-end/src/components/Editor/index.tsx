import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor, { PluginProps } from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

interface MarkdownItPropsType {
  handleOnChange?: any;
}

const mdParser = new MarkdownIt(/* Markdown-it options */);

const Editor = (props: MarkdownItPropsType) => {
  const [contentMarkdown, setContentMarkdown] = React.useState("");
  const { handleOnChange } = props;

  const handleOnchange = ({ html, text }: any) => {
    setContentMarkdown(text);
    handleOnChange({ html, text });
  };

  return (
    <MdEditor
      {...props}
      value={contentMarkdown}
      style={{ height: "300px" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={(e: any) => handleOnchange(e)}
      className={`markdown`}
    />
  );
};

export default Editor;
