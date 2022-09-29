export default function PostList({
  $target,
  initialState,
  onCreateSubPost,
  onRemove,
  onEdit,
}) {
  const $list = document.createElement("div");
  $list.className = "list";
  $target.appendChild($list);

  this.state = initialState;

  this.setState = (nextState) => {
    if (nextState) {
      this.state = nextState;
      this.render();
    }
  };

  const docRender = ({ title, id, documents }, docArr) => {
    docArr.push(
      `<li data-id=${id}>
      <span class="list-title">▶ ${title}</span>
      <button class="addPost-button">+</button>
      <button class="delPost-button">-</button>
      </li>`
    );
    if (documents.length !== 0) {
      docArr.push("<ul>");

      for (let document of documents) {
        const { title, id, documents } = document;
        docRender({ title, id, documents }, docArr);
      }
      docArr.push("</ul>");
    }

    return docArr;
  };

  this.render = () => {
    $list.innerHTML = `
    <p style="padding-left: 8px;">Jocharito's Notion</p>
	  <ul>
	    ${this.state
        .map(({ title, id, documents }) =>
          docRender({ title, id, documents }, []).join("")
        )
        .join("")}  
	  </ul>`;
  };

  $list.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      const { id } = $li.dataset;

      if (e.target.className === "addPost-button") {
        onCreateSubPost(id);
      } else if (e.target.className === "delPost-button") {
        onRemove(id);
      } else {
        onEdit(id);
      }
    }
  });
}
