import { EditorCore } from "./editor/editorCore.js";

const canvas = document.getElementById("editorCanvas");
const editor = new EditorCore(canvas);

// Gọi autoload autosave
editor.importer.autoloadFromSession();

window.addEventListener("resize", () => editor.resizeCanvas());