export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEditing,
  subPostRender,
}) {
  const $editor = document.createElement("div");
  const $subPostList = document.createElement("div");
  $editor.className = "editor";
  $subPostList.className = "subPostList";
  $target.appendChild($editor);
  $target.appendChild($subPostList);

  this.state = initialState;

  this.setState = (nextState) => {
    if (nextState) {
      this.state = nextState;
      this.render();
    }
  };

  const docRender = ({ documents }, docArr) => {
    if (documents.length !== 0) {
      docArr.push("<ul>");
      for (let document of documents) {
        const { title, id, documents } = document;
        docArr.push(
          `<li data-id=${id}><span class="subPost-title">${
            title ? title : "제목 없음"
          }</span></li>`
        );
        docRender({ documents }, docArr);
      }
      docArr.push("</ul>");
    }

    return docArr;
  };

  this.render = () => {
    const { title, content, documents } = this.state;
    const subLists = docRender({ documents }, []).join("");

    $editor.innerHTML = `
      <input type="text" class="editor-title" placeholder="제목 없음" value="${
        title ? title : ""
      }" />
      <textarea class="editor-content" placeholder="입력하세요">${
        content ? content : ""
      }</textarea>
      `;

    // textarea를 contentEditable로 변경하여 사용자가 스타일을 조정 할 수 있게 변경
    // <div class="editor-content" contentEditable="true" placeholder="입력하세요">${
    //   content ? content : ""
    // }</div>

    $subPostList.innerHTML = `
    <button class="subPostList-toggle">▼</button>
    <span class="subPostList-title">하위 페이지 목록</span>
    <span class="subPostLists">${
      subLists === "" ? `<p>하위 페이지 없음</p>` : subLists
    }</span>
    `;
  };

  $subPostList.addEventListener("click", (e) => {
    if (e.target.className === "subPostList-toggle") {
      const $subLists = document.querySelector(".subPostLists");
      $subLists.classList.toggle("active");
    }
    if (e.target.className === "subPost-title") {
      const $li = e.target.closest("li");
      subPostRender($li.dataset.id);
    }
  });

  $editor.addEventListener("keyup", () => {
    const title = $editor.querySelector(".editor-title").value;
    const content = $editor.querySelector(".editor-content").value;

    const nextState = {
      ...this.state,
      title,
      content,
    };

    this.state = nextState;
    onEditing(this.state);
  });
}
