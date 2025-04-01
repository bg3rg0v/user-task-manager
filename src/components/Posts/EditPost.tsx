import TooltipButton from "@components/TooltipButton";
import { Input, List, Space } from "antd";
import { Post } from "~/lib/interfaces";
import useEditPostData from "./useEditPostData";

const EditPost = ({ userId, post }: { userId: number; post: Post }) => {
  const {
    actions,
    selectedPost,
    isEditable,
    focusChangeHandler,
    inputChangeHandler,
  } = useEditPostData(userId, post);

  return (
    <List.Item
      actions={[
        <Space size="middle" align="end">
          {actions
            .filter((action) => action.isVisible)
            .map(({ title, color, icon, loading, actionHandler, disabled }) => (
              <TooltipButton
                key={title}
                disabled={disabled}
                variant="text"
                tooltipprops={{
                  title: title,
                  color: color.tooltip,
                }}
                color={color.button}
                icon={icon}
                onClick={actionHandler}
                loading={loading}
              />
            ))}
        </Space>,
      ]}
    >
      <List.Item.Meta
        title={
          <Input
            onFocus={() => focusChangeHandler("title")}
            onChange={(e) => inputChangeHandler("title", e.target.value)}
            style={{ cursor: isEditable.title ? "default" : "pointer" }}
            size="large"
            name="title"
            variant={isEditable.title ? "outlined" : "borderless"}
            value={selectedPost.title}
          />
        }
        description={
          <Input.TextArea
            onFocus={() => focusChangeHandler("body")}
            onChange={(e) => inputChangeHandler("body", e.target.value)}
            autoSize={{ minRows: 3, maxRows: 25 }}
            style={{ cursor: isEditable.title ? "default" : "pointer" }}
            size="large"
            name="title"
            variant={isEditable.body ? "outlined" : "underlined"}
            value={selectedPost.body}
          />
        }
      />
    </List.Item>
  );
};

export default EditPost;
