import React, { useState } from "react";

const Editor: React.FC = () => {
  const [text, setText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="editor-container">
      <textarea
        className="editor-textarea"
        value={text}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Editor;
