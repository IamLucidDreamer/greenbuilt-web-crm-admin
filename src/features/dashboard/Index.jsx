import React from "react";
import { Layout } from "antd";

import { Outlet } from "react-router-dom";

import "./styles/index.css";
import { HeaderElement } from "../components/layout/Header";
import Sidebar from "../components/sidebar/Sidebar";

const { Content } = Layout;

export const Dashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout className="site-layout">
        <HeaderElement />
        <Content style={{ margin: "0 16px" }}>
          {/* For Managing Component Change within the Nested Routes Outlet is used*/}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
