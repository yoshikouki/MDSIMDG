import { remark } from "remark";

export const convertMarkdownToHtml = (markdown) => {
  let htmlOutput = "";
  remark().process(markdown, (err, file) => {
    if (err) throw err;
    htmlOutput = String(file);
  });
  return htmlOutput;
};
