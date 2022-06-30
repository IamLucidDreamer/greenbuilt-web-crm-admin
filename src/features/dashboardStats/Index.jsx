import React, { useEffect, useState } from "react";
import StatsCard from "./components/StatsCard";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import axios from "../../appConfig/httpHelper";

export const DashboardStats = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState("");

  const dataLoader = () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("jwt"));
    axios
      .get(`/statistics/admin/get-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStats(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  };

  useEffect(() => {
    dataLoader();
  }, []);

  return (
    <div className="relative px-4 py-2">
      <div className="flex justify-end mr-10">
        <Button
          type="primary"
          loading={loading}
          onClick={() => dataLoader()}
        >
          <ReloadOutlined />
        </Button>
      </div>
      <div className="flex flex-wrap items-center mt-10 gap-8">
        <StatsCard title={"Total Users"} stat={stats.totalEndUsers} icon={1} />
        <StatsCard
          title={"Total Industry Types"}
          stat={stats.totalIndustryTypes}
          icon={2}
        />
        <StatsCard
          title={"Business Users"}
          stat={stats.businessUserCount}
          icon={3}
        />
        <StatsCard title={"End Users"} stat={stats.userCount} icon={4} />
        <StatsCard
          title={"Total Products"}
          stat={stats.totalProducts}
          icon={5}
        />
        <StatsCard title={"Total Assets"} stat={stats.totalAssets} icon={6} />
        <StatsCard
          title={"Total QR's Generated"}
          stat={stats.totalQRGenerated}
          icon={7}
        />
        <StatsCard
          title={"Total QR's Consumed"}
          stat={stats.totalQRConsumed}
          icon={8}
        />
        <StatsCard
          title={"Total Source Types"}
          stat={stats.totalQRConsumed}
          icon={9}
        />
      </div>
    </div>
  );
};
