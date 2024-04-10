import React from "react";
import { Tabs } from "antd";
interface TabProps {
  defaultActiveKey?: string;
  items: Array<{ key: string; label: string; children: React.ReactNode }>;
  onChange?: (key: string) => void;
}

const Tab: React.FC<TabProps> = ({
  defaultActiveKey = "1",
  items,
  onChange,
}) => {
  return (
    <div>
      <Tabs defaultActiveKey={defaultActiveKey} onChange={onChange}>
        {items?.map((item) => (
          <Tabs.TabPane key={item?.key} tab={item?.label}>
            {item?.children}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default Tab;
