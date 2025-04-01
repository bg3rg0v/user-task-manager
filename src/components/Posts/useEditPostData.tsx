import { CloseOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { Post } from "@lib/interfaces";
import { useCallback, useMemo, useState } from "react";
import { usePostsContext } from "~/context/usePostsContext";

type InputKey = "title" | "body";
const useEditPostData = (userId: number, post: Post) => {
  const { deletePost, deletePostId, savePost, updatePostLocally } =
    usePostsContext();

  const [selectedPost, setSelectedPost] = useState({
    title: post.title,
    body: post.body,
  });

  const [isEditable, setIsEditable] = useState({ title: false, body: false });

  const postCancelHandler = useCallback(() => {
    setSelectedPost({ title: post.title, body: post.body });
    setIsEditable({ title: false, body: false });
  }, [post.body, post.title]);

  const updatePostAndSave = useCallback(() => {
    setIsEditable({ title: false, body: false });
    updatePostLocally(userId, { ...post, ...selectedPost });
    savePost(post.id, post);
  }, [post, savePost, selectedPost, updatePostLocally, userId]);

  const isContentChanged = useMemo(
    () => post.title !== selectedPost.title || post.body !== selectedPost.body,
    [post.title, post.body, selectedPost.title, selectedPost.body]
  );

  const focusChangeHandler = (key: InputKey) =>
    setIsEditable((prev) => ({ ...prev, [key]: true }));

  const inputChangeHandler = (key: InputKey, value: string) => {
    setSelectedPost((prev) => ({ ...prev, [key]: value }));
  };

  const actions = useMemo(
    () =>
      [
        {
          title: "Save",
          color: { tooltip: "blue", button: "primary" },
          actionHandler: updatePostAndSave,
          loading: false,
          icon: (
            <SaveOutlined style={{ fontSize: isContentChanged ? 24 : 22 }} />
          ),
          disabled: !isContentChanged,
          isVisible: true,
        },
        {
          title: "Delete",
          color: { tooltip: "red", button: "danger" },
          actionHandler: () => deletePost(userId, post.id),
          loading: deletePostId === post.id,
          icon: <DeleteOutlined style={{ fontSize: 22 }} />,
          disabled: false,
          isVisible: true,
        },
        {
          title: "Cancel",
          color: { tooltip: "", button: "default" },
          actionHandler: postCancelHandler,
          loading: false,
          icon: <CloseOutlined style={{ fontSize: 22 }} />,
          disabled: false,
          isVisible: isEditable.title || isEditable.body,
        },
      ] as const,
    [
      deletePost,
      deletePostId,
      isContentChanged,
      post.id,
      postCancelHandler,
      updatePostAndSave,
      userId,
      isEditable.body,
      isEditable.title,
    ]
  );

  return {
    actions,
    selectedPost,
    isEditable,
    postCancelHandler,
    updatePostAndSave,
    isContentChanged,
    deletePostHandler: () => deletePost(userId, post.id),
    focusChangeHandler,
    inputChangeHandler,
  };
};

export default useEditPostData;
