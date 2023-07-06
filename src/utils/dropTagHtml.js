export const createSummary = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent;
};
