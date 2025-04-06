const initTypewriter = () => {
  const typewriters = document.querySelectorAll(".typewriter");

  typewriters.forEach((element) => {
    const content = (element.textContent ?? "").trim();
    const htmlElement = element as HTMLElement;
    htmlElement.style.setProperty("--content", `"${content}"`);
    htmlElement.style.setProperty("--steps", content.length.toString());
  });
};

export default initTypewriter;
