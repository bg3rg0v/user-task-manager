import { Button, Space, Table } from "antd";
import { size } from "lodash";
import StatusWrapper from "@components/ui/StatusWrapper";
import useTasksData from "@hooks/useTasksData";

const Tasks = () => {
  const {
    isPageLoading,
    isPageError,
    columns,
    currentPage,
    filteredTasks,
    handleTableChange,
    isFilterApplied,
    handleResetFilters,
  } = useTasksData();

  return (
    <StatusWrapper loading={isPageLoading} error={isPageError}>
      <Space style={{ marginBottom: 16 }}>
        <Button
          disabled={!isFilterApplied}
          type="primary"
          onClick={handleResetFilters}
        >
          Reset Data
        </Button>
      </Space>
      <Table
        bordered
        dataSource={filteredTasks.map((task) => ({
          ...task,
          key: `task-${task.id}`,
        }))}
        columns={columns}
        pagination={{
          align: "start",
          current: currentPage,
          pageSize: 10,
          total: size(filteredTasks),
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
      />
    </StatusWrapper>
  );
};

export default Tasks;
