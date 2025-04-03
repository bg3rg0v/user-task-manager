import TooltipButton from "@components/ui/TooltipButton";
import { Input, List, Modal, Space } from "antd";
import { Post } from "~/lib/interfaces";
import useEditPostData from "./useEditPostData";

const EditPost = ({ userId, post }: { userId: string; post: Post }) => {
  const {
    actions,
    isValid,
    isEditable,
    selectedPost,
    showDeleteConfirm,
    focusChangeHandler,
    inputChangeHandler,
    confirmDeleteHandler,
    toggleShowDeleteConfirm,
  } = useEditPostData(userId, post);

  return (
    <>
      <Modal
        title="Confirm Delete"
        open={showDeleteConfirm}
        onOk={confirmDeleteHandler}
        onCancel={toggleShowDeleteConfirm}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this post?</p>
      </Modal>
      <List.Item
        actions={[
          <Space size="middle" align="end">
            {actions
              .filter((action) => action.isVisible)
              .map(
                ({
                  title,
                  color,
                  icon,
                  loading: isButtonLoading,
                  actionHandler,
                  disabled,
                }) => (
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
                    loading={isButtonLoading}
                  />
                )
              )}
          </Space>,
        ]}
      >
        <List.Item.Meta
          title={
            <Input
              placeholder={isValid ? "" : "Post title is required"}
              status={isValid ? "" : "error"}
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
              placeholder={isValid ? "" : "Post body is required"}
              status={isValid ? "" : "error"}
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
    </>
  );
};

export default EditPost;
