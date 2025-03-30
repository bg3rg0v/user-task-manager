import { Col, Row, Tabs } from "antd";
import { Outlet } from "react-router-dom";
import useAppLayoutData from "./useAppLayoutData";
import styles from "./AppLayout.module.css";
const AppLayout = () => {
  const { activeTabKey, tabs, tabChangeHandler } = useAppLayoutData();

  return (
    <Row>
      <Col span={18} offset={3}>
        <Tabs
          className={activeTabKey ? "" : styles.selectOverride}
          onTabClick={tabChangeHandler}
          defaultActiveKey={activeTabKey}
          activeKey={activeTabKey}
          centered
          items={tabs.map((tab) => {
            return {
              className: "myClass",
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
