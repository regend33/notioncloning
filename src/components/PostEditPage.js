import Editor from "./Editor.js";
import { fetchPost, fetchUpdatePost } from "../utils/fetch.js";
import { getItem, setItem } from "../utils/storage.js";

export default function PostEditPage({ $target, initialState, listRendering }) {
  const $page = document.createElement("div");
  $page.className = "postEditPage";

  this.state = initialState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;
  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: {
      title: "",
    },
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer); // debounce
      }
      timer = setTimeout(async () => {
        await fetchUpdatePost(post);
        await listRendering();
      }, 1000);

      setItem(postLocalSaveKey, {
        ...post,
        tempSaveData: new Date(),
      });
    },
    subPostRender: (id) => {
      this.setState({ id });
      history.replaceState(null, null, `/documents/${id}`);
    },
  });

  this.setState = async (nextState) => {
    this.state = nextState;
    postLocalSaveKey = `temp-post-${this.state.id}`;

    const post = await fetchLocalStorage();

    editor.setState(post);

    await fetchUpdatePost(this.state);
    await listRendering();
    await this.render();
  };

  const fetchLocalStorage = async () => {
    const post = fetchPost(this.state.id);
    const tempPost = getItem(postLocalSaveKey, {
      title: "",
      content: "",
      parent: null,
    });

    if (tempPost.tempSaveData && tempPost.tempSaveData > post.updatedAt) {
      if (confirm("저장되지 않은 임시 데이터가 있습니다. 불러올까요?")) {
        const updatedPost = {
          ...post,
          title: tempPost.title,
          content: tempPost.content,
        };

        return updatedPost;
      }
    }

    return post;
  };

  this.render = async () => {
    $target.appendChild($page);
  };
}
