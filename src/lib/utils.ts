
const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const truncate = (s: string, max: number) =>
    s.length > max ? s.slice(0, Math.max(0, max - 1)).trimEnd() + "…" : s;

export {
    esc,
    truncate
};
