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
import "./styles.css"

const { Sider } = Layout;

const Sidebar = ({ setTitle }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      style={{
        backgroundColor: "#fff",
        boxShadow: "1px 1px 6px #c1c1c1",
        zIndex: 2,
      }}
    >
      <img
        src={Logo}
        alt=""
        className={`mx-auto my-1.5 duration-300 ${collapsed ? "w-0" : "w-44"}`}
      />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        style={{ backgroundColor: "#fff", marginTop: "10px" }}
      >
        <Menu.Item
          key="1"
          icon={<DashboardOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#0a2c3c" }}
          onClick={() => {
            navigate("/admin/dashboard");
            setTitle("Statistics");
          }}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<UserOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#0a2c3c" }}
          onClick={() => {
            navigate("/admin/users");
            setTitle("Users");
          }}
        >
          Users
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<QrcodeOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#0a2c3c" }}
          onClick={() => {
            navigate("/admin/approvals");
            setTitle("Approvals");
          }}
        >
          Approvals
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<FundProjectionScreenOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#0a2c3c" }}
          onClick={() => {
            navigate("/admin/pointsmanager");
            setTitle("Points Manager");
          }}
        >
          Points Manager
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<FundProjectionScreenOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#0a2c3c" }}
          onClick={() => {
            navigate("/admin/actualconsumptionmanager");
            setTitle("Actual Consumption Manager");
          }}
        >
          Actual Consumption Manager
        </Menu.Item>
        <Menu.Item
          key="6"
          icon={<FormOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#0a2c3c" }}
          onClick={() => {
            navigate("/admin/assetmaster");
            setTitle("Asset Manager");
          }}
        >
          Asset Manager
        </Menu.Item>
        <Menu.Item
          key="7"
          icon={<FileOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#0a2c3c" }}
          onClick={() => {
            navigate("/admin/staticsmanager");
            setTitle("Statics Manager");
          }}
        >
          Statics Manager
        </Menu.Item>
        <Menu.Item
          key="8"
          icon={<HistoryOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#0a2c3c" }}
          onClick={() => {
            navigate("/admin/productmaster");
            setTitle("Product Manager");
          }}
        >
          Product Manager
        </Menu.Item>
        <Menu.Item
          key="9"
          icon={<HistoryOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#0a2c3c" }}
          onClick={() => {
            navigate("/admin/history");
            setTitle("History");
          }}
        >
          History
        </Menu.Item>
        <Menu.Item
          key="10"
          icon={<HistoryOutlined style={{ fontSize: "18px" }} />}
          style={{ fontSize: "18px", display: "flex", color: "#0a2c3c" }}
          onClick={() => navigate("/admin/defaultedpoint")}
        >
          Defaulted Points
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
