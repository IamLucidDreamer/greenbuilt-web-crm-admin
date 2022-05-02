import React, { useEffect, useReducer } from "react";
import ActionButtons from "../components/actionsButtons/Index";
import { DataTable } from "../components/table/Index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EyeOutlined, CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../components/styles/innerTableActions";
import axios from "../../appConfig/httpHelper";

export const PointsManager = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("jwt"));

  // Declaring the States Required for the Working of the Component
  const [actions, setActions] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    {
      drawer: false,
      loading: false,
      pagination: 15,
      trash: false,
    }
  );

  const { drawer, loading, pagination, trash } = actions;

  const [value, setValue] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    { pointsApproval: [], drawerValue: {} }
  );

  const { pointsApproval, drawerValue } = value;

  // Functions Used for Different Data
  const requestsCaller = () => {
    setActions({ loading: true });
    axios
      .get("/monthly-plan/consumption/get-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setValue({
          pointsApproval: res.data.data.filter(val => !val.isApproved)
        });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loading: false }));
  };

  useEffect(() => requestsCaller(), []);

  const approvePoints = (record) => {
    console.log(record)
    axios
      .post(
        `/monthly-plan/consumption/approve/${record.monthlyPlanId}`,
        {
          points: record?.toal,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        requestsCaller();
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  const deletePointsRequest = (record) => {
    console.log(record?.id);
    axios
      .delete(`/monthly-plan/consumption/delete/plan-id/${record.monthlyPlanId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast.success(res.data.message);
        requestsCaller();
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  // Table Column
  const columns = [
    {
      key: "totalPlan",
      title: "Total Plan",
      render: (data) => data.toal,
    },
    {
      key: "details",
      title: "Details",
      width: "800px",
      render: (data) => (
        <DataTable
          usersData={data?.monthlyPlans}
          columns={columnsNestedTable}
          pagination={false} 
        />
      ),
    },
    {
      key: "date",
      title: "Date",
      render: (data) => data.date,
    },
    {
      key: "month",
      title: "Month",
      render: (data) => data.month,
    },
    {
      key: "year",
      title: "Year",
      render: (data) => data.year,
    },
    {
      key: "actions",
      title: "Actions",
      render: (record) => <ColumnActions record={record} />,
    },
  ];

  const columnsNestedTable = [
    {
      key: "sourceType",
      title: "Source Type",
      render: (data) => data.sourceType,
    },
    {
      key: "ownCaptive",
      title: "Own Captive",
      render: (data) => data.ownCaptive,
    },
    {
      key: "groupCaptive",
      title: "Group Captive",
      render: (data) => data.groupCaptive,
    },
    {
      key: "thirdPartyPurchase",
      title: "Third Party Purchase",
      render: (data) => data.thirdPartyPurchase,
    },
    {
      key: "total",
      title: "Total",
      render: (data) => data?.ownCaptive + data?.thirdPartyPurchase + data?.groupCaptive,
    },
  ];

  const ColumnActions = (props) => {
    return (
      <div className="flex justify-around">
        {/* <EyeOutlined
          title="View"
          style={innerTableActionBtnDesign}
          onClick={() => {
            setActions({ drawer: true });
            setValue({ drawerValue: props?.record });
          }}
        /> */}
        <CheckOutlined
          title="Approve"
          style={innerTableActionBtnDesign}
          onClick={() => approvePoints(props?.record)}
        />
        <DeleteOutlined
          title="Delete"
          style={innerTableActionBtnDesign}
          onClick={() => deletePointsRequest(props?.record)}
        />
      </div>
    );
  };

  return (
    <div className="">
      <ActionButtons
        pageTitle={"Points Manager"}
        showTrashButton={false}
        showTrashFunction={""}
        showReFreshButton={true}
        refreshFunction={requestsCaller}
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
        <DataTable
          usersData={pointsApproval}
          columns={columns}
          loading={loading}
        />
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
