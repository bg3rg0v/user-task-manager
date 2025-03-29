import { Col, Row, Tabs } from "antd";
import { Outlet } from "react-router-dom";
import useAppLayoutData from "./useAppLayoutData";
const AppLayout = () => {
  const { activeTabKey, tabs, tabChangeHandler } = useAppLayoutData();

  return (
    <Row>
      <Col span={18} offset={3}>
        <Tabs
          onChange={tabChangeHandler}
          activeKey={activeTabKey}
          centered
          items={tabs.map((tab) => {
            return {
              label: tab.label,
              key: tab.pathKey,
              children: <Outlet />,
            };
          })}
        />
      </Col>
    </Row>
  );
};

export default AppLayout;
