import { Button, Tooltip } from "antd";
import type { BaseButtonProps } from "antd/es/button/button";
import type { TooltipPropsWithTitle } from "antd/es/tooltip";

type TooltipButtonProps = BaseButtonProps & { onClick: () => void } & {
  tooltipprops: TooltipPropsWithTitle;
};
const TooltipButton = ({ ...props }: TooltipButtonProps) => {
  return (
    <Tooltip {...props.tooltipprops}>
      <Button {...props} />
    </Tooltip>
  );
};

export default TooltipButton;
