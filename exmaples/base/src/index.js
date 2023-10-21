import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Editor } from "mdsimdg";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>
);
