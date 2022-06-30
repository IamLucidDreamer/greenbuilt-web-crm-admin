import React from "react";
import {
  UserOutlined,
  UnorderedListOutlined,
  QrcodeOutlined,
  DeploymentUnitOutlined,
  CameraOutlined,
  SettingOutlined,
  BankOutlined,
  IdcardOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";

const StatsCard = (props) => {
  return (
    <div class="w-80 rounded-lg shadow-lg overflow-hidden bg-white">
      <div class="p-4 flex items-center">
        <div class="p-3 rounded-full text-green-1 bg-green-100 mr-8">
          {props.icon === 1 ? (
            <UserOutlined style={{ fontSize: "40px" }} />
          ) : null}
          {props.icon === 2 ? (
            <SettingOutlined style={{ fontSize: "40px" }} />
          ) : null}
          {props.icon === 3 ? (
            <BankOutlined style={{ fontSize: "40px" }} />
          ) : null}
          {props.icon === 4 ? (
            <IdcardOutlined style={{ fontSize: "40px" }} />
          ) : null}
          {props.icon === 5 ? (
            <UnorderedListOutlined style={{ fontSize: "40px" }} />
          ) : null}
          {props.icon === 6 ? (
            <DeploymentUnitOutlined style={{ fontSize: "40px" }} />
          ) : null}
          {props.icon === 7 ? (
            <QrcodeOutlined style={{ fontSize: "40px" }} />
          ) : null}
          {props.icon === 8 ? (
            <CameraOutlined style={{ fontSize: "40px" }} />
          ) : null}
          {props.icon === 9 ? (
            <ApartmentOutlined style={{ fontSize: "40px" }} />
          ) : null}
        </div>
        <div>
          <p class="mb-2 text-xl font-medium text-gray-600 ">{props.title}</p>
          <p class="text-2xl font-semibold text-gray-700">{props.stat}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
