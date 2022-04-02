import React, { useState } from "react";
import ActionButtons from "../components/actionsButtons/Index";
import { DataTable } from "../components/table/Index";

export const PointsManager = () => {
  return (
    <div className="">
      <ActionButtons
        pageTitle={"Points Manager"}
        showTrashButton={false}
        showTrashFunction={""}
        showReFreshButton={false}
        refreshFunction={""}
        showExportDataButton={false}
        exportDataFunction={""}
        totalItems={""}
        csvName={""}
        loadingItems={""}
        downloadItems={""}
        showAddNewButton={false}
        addNewFunction={""}
      />
      <div className="border-2 mt-5">
        <DataTable usersData={""} columns={""} loading={""} />
      </div>
      {/* <div>
    <DrawerComp
      title={"Product Details"}
      visible={drawer}
      onCloseDrawer={onCloseDrawer}
      data={drawerValue}
    />
  </div> */}
    </div>
  );
};
