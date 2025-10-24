import { findPageAlContent } from "./AlgorithmexplanationpageContents.js";
import { renderHeader2 } from "./renderHeader.js";
function codeEditor(position, content) {
  require.config({
    paths: {
      vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs",
    },
  });
  require(["vs/editor/editor.main"], function () {
    const editor = monaco.editor.create(document.querySelector(`${position}`), {
      value: content,
      language: "cpp",
      theme: "vs-dark",
      minimap: { enabled: false },
      automaticLayout: true,
      scrollBeyondLastLine: false,
    });

    // 🔹 자동 높이 조정
    const container = document.querySelector(`${position}`);
    const updateHeight = () => {
      const lineHeight = editor.getOption(
        monaco.editor.EditorOption.lineHeight
      );
      const lineCount = editor.getModel().getLineCount();
      const height = lineHeight * lineCount + 40; // padding 포함
      container.style.height = height + "px";
      editor.layout();
    };

    editor.onDidChangeModelContent(updateHeight);
    updateHeight();
  });
}
function renderAlgorithmexplanationPage() {
  renderHeader2("algorithm");
  let explanationHTML = ``;
  const url = new URL(window.location.href);
  const target = url.searchParams.get("AlgorithmId");
  let explanationContent = findPageAlContent(target);
  explanationHTML = `<div class="info">
        <div class="title">${explanationContent.title}</div>
        <div class="date">${explanationContent.date}</div>
      </div>
      <div class="content">
        ${renderExplanationContents(explanationContent)}
      </div>`;
  document.querySelector(".main-element").innerHTML = explanationHTML;
}
function renderExplanationContents(explanationContent) {
  let contentLength = explanationContent.content.length;
  let contentHTML = ``;
  for (let i = 0; i < contentLength; i++) {
    contentHTML += `<p>${explanationContent.content[i]}</p><div class="editor${i}"></div>`;
    codeEditor(`.editor${i}`, `${explanationContent.code[i]}`);
  }
  return contentHTML;
}
renderAlgorithmexplanationPage();
