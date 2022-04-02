import React, { useState } from "react";
import { Layout, Menu, Dropdown } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  QrcodeOutlined,
  FundProjectionScreenOutlined,
  FileOutlined,
  HistoryOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logoGreenbuilt.png";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      style={{ backgroundColor: "#140035" }}
    >
      <img
        src={Logo}
        alt=""
        className={`mx-auto w-44 my-1.5 ${collapsed ? "hidden" : "block"}`}
      />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        style={{ backgroundColor: "#140035" }}
      >
        <Menu.Item
          key="1"
          icon={<DashboardOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#fff" }}
          onClick={() => navigate("/admin/dashboard")}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<UserOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#fff" }}
          onClick={() => navigate("/admin/users")}
        >
          Users
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<QrcodeOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#fff" }}
          onClick={() => navigate("/admin/approvals")}
        >
          Approvals
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<FundProjectionScreenOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#fff" }}
          onClick={() => navigate("/admin/pointsmanager")}
        >
          Points Manager
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<FormOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#fff" }}
          onClick={() => navigate("/admin/assetmanager")}
        >
          Asset Manager
        </Menu.Item>
        <Menu.Item
          key="6"
          icon={<FileOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#fff" }}
          onClick={() => navigate("/admin/staticsmanager")}
        >
          Statics Manager
        </Menu.Item>
        <Menu.Item
          key="7"
          icon={<HistoryOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#fff" }}
          onClick={() => navigate("/admin/productmaster")}
        >
          Product Master
        </Menu.Item>
        <Menu.Item
          key="8"
          icon={<HistoryOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#fff" }}
          onClick={() => navigate("/admin/history")}
        >
          History
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
