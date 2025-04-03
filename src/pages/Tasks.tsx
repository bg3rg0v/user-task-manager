import { Table } from "antd";
import { size } from "lodash";
import StatusWrapper from "@components/ui/StatusWrapper";
import useTasksData from "@hooks/useTasksData";

const Tasks = () => {
  const {
    isPageLoading,
    error,
    columns,
    currentPage,
    filteredTasks,
    handleTableChange,
  } = useTasksData();

  return (
    <StatusWrapper loading={isPageLoading} error={error}>
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
