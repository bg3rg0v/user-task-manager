import { Button, Input, InputRef, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DataIndex } from "./tasksTablePreprocessor";
import { useRef } from "react";
import { FilterConfirmProps, FilterRestProps } from "antd/es/table/interface";
import { head } from "lodash";

const TableSearch = ({
  dataIndex,
  selectedKeys,
  setSelectedKeys,
  confirm,
  close,
  clearFilters,
}: {
  confirm: (param?: FilterConfirmProps) => void;
  dataIndex: DataIndex;
  selectedKeys: React.Key[];
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  close: () => void;
  clearFilters?: (param?: FilterRestProps) => void;
}) => {
  const searchInput = useRef<InputRef>(null);

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    confirm({ closeDropdown: false });
  };

  return (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Input
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={head(selectedKeys)}
        onChange={(e) => {
          setSelectedKeys(e.target.value ? [e.target.value] : []);
        }}
        style={{ marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => confirm({ closeDropdown: false })}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button type="link" size="small" onClick={() => close()}>
          Close
        </Button>
      </Space>
    </div>
  );
};

export default TableSearch;
