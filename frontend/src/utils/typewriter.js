const initTypewriter = () => {
  const typewriters = document.querySelectorAll(".typewriter");

  typewriters.forEach((element) => {
    const content = element.textContent.trim();
    element.style.setProperty("--content", `"${content}"`);
    element.style.setProperty("--steps", content.length);
  });
};

export default initTypewriter;
