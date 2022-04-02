import React, { useState } from "react";
import { Button } from "antd";
import { ProductApprovals } from "./pages/ProductsApprovals";
import { BusinessUsersApprovals } from "./pages/BusinessUsersAprrovals";

export const Approvals = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <div className="flex flex-row justify-around my-4">
        <Button type="primary" onClick={() => setShow(true)}>
          Business Users
        </Button>
        <Button type="primary" onClick={() => setShow(false)}>
          Products
        </Button>
      </div>
      <div>{show ? <BusinessUsersApprovals /> : <ProductApprovals />}</div>
    </div>
  );
};
