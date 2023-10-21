import React, { useState } from "react";

const Editor: React.FC = () => {
  const [markdownInput, setMarkdownInput] = useState("");

  const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownInput(event.target.value);
  };

  return (
    <div className="mdsimdg-container">
      <textarea
        value={markdownInput}
        onChange={onInputChange}
        placeholder="Type your Markdown here..."
        className="mdsimdg-textarea"
      />
    </div>
  );
};

export default Editor;
