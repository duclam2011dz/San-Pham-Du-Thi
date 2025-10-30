import { EditorCore } from "./editor/editorCore.js";

const canvas = document.getElementById("editorCanvas");
const editor = new EditorCore(canvas);

window.addEventListener("resize", () => editor.resizeCanvas());