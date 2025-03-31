import { CloseOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Input, List, Space, Tooltip } from "antd";
import { useMemo, useState } from "react";
import { usePostsContext } from "~/context/usePostsContext";
import { Post } from "~/lib/interfaces";

const EditPost = ({ userId, post }: { userId: number; post: Post }) => {
  const { deletePost, deletePostId, savePost, updatePostLocally } =
    usePostsContext();

  const [selectedPost, setSelectedPost] = useState({
    title: post.title,
    body: post.body,
  });

  const [isEditable, setIsEditable] = useState({ title: false, body: false });

  const postCancelHandler = () => {
    console.log(post.title);

    setSelectedPost({ title: post.title, body: post.body });
    setIsEditable({ title: false, body: false });
  };

  const updatePostAndSave = () => {
    setIsEditable({ title: false, body: false });
    updatePostLocally(userId, { ...post, ...selectedPost });
    savePost(post.id, post);
  };

  const isContentChanged = useMemo(
    () => post.title !== selectedPost.title || post.body !== selectedPost.body,
    [post.title, post.body, selectedPost.title, selectedPost.body]
  );

  return (
    <List.Item
      actions={[
        <Space>
          <Tooltip title="Save">
            <Button
              disabled={!isContentChanged}
              icon={<SaveOutlined style={{ fontSize: 22 }} />}
              type="text"
              key="save-post"
              onClick={updatePostAndSave}
            />
          </Tooltip>
          <Tooltip title="Delete" color="red">
            <Button
              icon={<DeleteOutlined style={{ fontSize: 22 }} />}
              variant="text"
              color="danger"
              key="delete-post"
              onClick={() => deletePost(userId, post.id)}
              loading={deletePostId === post.id}
            />
          </Tooltip>
          {(isEditable.title || isEditable.body) && (
            <Tooltip title="Cancel">
              <Button
                disabled={!Object.values(isEditable).includes(true)}
                icon={<CloseOutlined style={{ fontSize: 22 }} />}
                type="text"
                key="cancel-update-post"
                onClick={postCancelHandler}
              />
            </Tooltip>
          )}
        </Space>,
      ]}
    >
      <List.Item.Meta
        title={
          <>
            <Input
              onFocus={() =>
                setIsEditable((prev) => ({ ...prev, title: true }))
              }
              onChange={(e) => {
                setSelectedPost((prev) => ({ ...prev, title: e.target.value }));
              }}
              style={{ cursor: isEditable.title ? "default" : "pointer" }}
              size="large"
              name="title"
              variant={isEditable.title ? "outlined" : "borderless"}
              value={selectedPost.title}
            />
          </>
        }
        description={
          <>
            <Input.TextArea
              onFocus={() => setIsEditable((prev) => ({ ...prev, body: true }))}
              onChange={(e) => {
                setSelectedPost((prev) => ({ ...prev, body: e.target.value }));
              }}
              autoSize={{ minRows: 3, maxRows: 25 }}
              style={{ cursor: isEditable.title ? "default" : "pointer" }}
              size="large"
              name="title"
              variant={isEditable.body ? "outlined" : "underlined"}
              value={selectedPost.body}
            />
          </>
        }
      />
    </List.Item>
  );
};

export default EditPost;
