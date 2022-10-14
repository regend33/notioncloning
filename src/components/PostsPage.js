import PostList from "./PostList.js";
import Header from "./Header.js";
import { fetchList, fetchNewPost, fetchDeletePost } from "../utils/fetch.js";
import { push } from "../utils/router.js";

export default function PostsPage({ $target, initialState }) {
  const $page = document.createElement("div");
  const $button = document.createElement("button");

  $page.className = "postsPage";
  $button.className = "addPage-button";
  $button.textContent = "+새 페이지";

  this.state = initialState;

  this.setState = async () => {
    this.state = await fetchList();
    postList.setState(this.state);
    this.render();
  };

  new Header({
    $target: $page,
  });

  const postList = new PostList({
    $target: $page,
    initialState: [],
    onCreateSubPost: async (parentId) => {
      const post = {
        title: "",
        parent: parentId,
      };
      const newPost = await fetchNewPost(post);
      push(`/documents/${newPost.id}`);
    },
    onRemove: async (id) => {
      if (confirm("정말 삭제하시겠습니까?")) {
        await fetchDeletePost(id);
        push("/");
      }
    },
    onEdit: (id) => {
      push(`/documents/${id}`);
    },
  });

  this.render = () => {
    $target.appendChild($page);
    $target.appendChild($button);
  };

  $button.addEventListener("click", async (e) => {
    e.preventDefault();
    if (e.target.className === "addPage-button") {
      const post = {
        title: "",
        parent: null,
      };
      const newPost = await fetchNewPost(post);
      push(`/documents/${newPost.id}`);
    }
  });
}
