import { Table, Empty } from "antd";
import LoadingSpinner from "@components/LoadingSpinner";
import { isEmpty, size } from "lodash";
import useTasksData from "./useTasksData";
import { useAppSelector } from "@store/hooks";

const Tasks = () => {
  const { status, error, filteredTasks, currentPage } = useAppSelector(
    (state) => state.tasks
  );
  const { columns, handleTableChange } = useTasksData();

  if (status === "idle" || status === "loading") return <LoadingSpinner />;
  if (error) return <>Error</>;

  return (
    <>
      {isEmpty(filteredTasks) ? (
        <Empty description={`No Tasks Found`} />
      ) : (
        <Table
          bordered
          dataSource={filteredTasks}
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
      )}
    </>
  );
};

export default Tasks;
