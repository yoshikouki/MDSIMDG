import React, { useState } from "react";
import { convertMarkdownToHtml } from "../../lib/markdown";

const Editor: React.FC = () => {
  const [markdownInput, setMarkdownInput] = useState("");

  const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownInput(event.target.value);
  };

  const htmlOutput = convertMarkdownToHtml(markdownInput);

  return (
    <div className="mdsimdg-container">
      <textarea
        value={markdownInput}
        onChange={onInputChange}
        placeholder="Type your Markdown here..."
        className="mdsimdg-textarea"
      />
      <div
        dangerouslySetInnerHTML={{ __html: htmlOutput }}
        className="mdsimdg-preview"
      />
    </div>
  );
};

export default Editor;
