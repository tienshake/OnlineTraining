import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
// import { values } from "markdown-it/lib/common/html_blocks";
interface courseDescriptionsType {
  html: string;
  text: string;
}
interface MarkdownItPropsType {
  handleOnChange?: any;
  value?: courseDescriptionsType;
}

const mdParser = new MarkdownIt(/* Markdown-it options */);

const Editor = (props: MarkdownItPropsType) => {
  // const [contentMarkdown, setContentMarkdown] = React.useState("");
  const { handleOnChange, value } = props;
  const handleOnchange = ({ html, text }: any) => {
    // setContentMarkdown(text);
    handleOnChange({ html, text });
  };

  return (
    <MdEditor
      {...props}
      value={value?.text}
      style={{ height: "300px" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={(e: any) => handleOnchange(e)}
      className={`markdown`}
    />
  );
};

export default Editor;
