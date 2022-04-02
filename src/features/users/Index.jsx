import React, { useState } from "react";
import { DataTable } from "../components/table/Index";
import { ActionButtons } from "../components/actionsButtons/Index";
import { Button } from "antd";
import { BusinessUsers } from "./pages/BusinessUsers";
import { EndUsers } from "./pages/EndUsers";

export const Users = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <div className="flex flex-row justify-around my-4">
        <Button type="primary" onClick={() => setShow(true)}>
          Business Users
        </Button>
        <Button type="primary" onClick={() => setShow(false)}>
          End Users
        </Button>
      </div>
      <div>{show ? <BusinessUsers /> : <EndUsers />}</div>
    </div>
  );
};
