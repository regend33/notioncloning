import { push } from "../utils/router.js";

export default function Header({ $target }) {
  const $header = document.createElement("div");
  $header.className = "header";
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
    <img src="/src/notionImg.png" class="notion-img">
    <h3 class="header-text">Notion</h3>
    `;
  };

  this.render();

  $header.addEventListener("click", () => {
    push("/");
  });
}
