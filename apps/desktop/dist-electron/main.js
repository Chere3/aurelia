import { app as e, BrowserWindow as n } from "electron";
import r from "node:path";
import { fileURLToPath as a } from "node:url";
const l = r.dirname(a(import.meta.url));
function o() {
  const i = new n({
    width: 1280,
    height: 840,
    minWidth: 1100,
    minHeight: 700,
    title: "Aurelia",
    webPreferences: {
      contextIsolation: !0,
      nodeIntegration: !1
    }
  }), t = process.env.VITE_DEV_SERVER_URL;
  t ? i.loadURL(t) : i.loadFile(r.join(l, "../dist/index.html"));
}
e.whenReady().then(() => {
  o(), e.on("activate", () => {
    n.getAllWindows().length === 0 && o();
  });
});
e.on("window-all-closed", () => {
  process.platform !== "darwin" && e.quit();
});
