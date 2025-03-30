import { Button, List, Skeleton, Typography } from "antd";
import { useState } from "react";
import { Post } from "~/interfaces";

const PostItem = ({ post }: { post: Post }) => {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <List.Item
      key={post.id}
      contentEditable={isEditable}
      actions={[
        <Button
          variant="outlined"
          color="default"
          key="post-edit"
          onClick={() => setIsEditable(!isEditable)}
        >
          {isEditable ? "Cancel" : "Edit"}
        </Button>,
        <Button variant="text" color="danger" key="post-delete">
          Delete
        </Button>,
      ]}
    >
      {/* include loading prop */}
      <Skeleton avatar loading={false} title={false} active>
        <List.Item.Meta
          title={<Typography.Title level={4}>{post.title}</Typography.Title>}
          description={<Typography.Paragraph>{post.body}</Typography.Paragraph>}
        />
      </Skeleton>
    </List.Item>
  );
};

export default PostItem;
