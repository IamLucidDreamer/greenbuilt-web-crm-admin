import React, { useEffect, useReducer } from "react";
import ActionButtons from "../components/actionsButtons/Index";
import { DataTable } from "../components/table/Index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  EyeOutlined,
  EditOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../components/styles/innerTableActions";
import axios from "../../appConfig/httpHelper";
import { DrawerComp } from "./components/Drawer";
import { EditEntry } from "./components/EditEntry";

export const PointsManager = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("jwt"));

  // Declaring the States Required for the Working of the Component
  const [actions, setActions] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    {
      drawer: false,
      loading: false,
      editPlan: false,
      pagination: 15,
      trash: false,
    }
  );

  const { drawer, loading, editPlan, pagination, trash } = actions;

  const [value, setValue] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    { pointsApproval: [], drawerValue: {}, editValue: {} }
  );

  const { pointsApproval, drawerValue, editValue } = value;

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
          pointsApproval: res.data.data.filter((val) => !val.isApproved),
        });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loading: false }));
  };

  useEffect(() => requestsCaller(), []);

  const approvePoints = (record) => {
    console.log(record);
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
      .delete(
        `/monthly-plan/consumption/delete/plan-id/${record.monthlyPlanId}`,
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

  const onCloseDrawer = () => setActions({ drawer: false });

  const backEditPlan = () => {
    setActions({ editPlan: false });
  };

  // Table Column
  const columns = [
    {
      key: "userName",
      title: "User Name",
      render: (data) => data?.user?.name,
    },
    {
      key: "totalPlan",
      title: "Total Plan",
      render: (data) => data.toal,
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

  const ColumnActions = (props) => {
    return (
      <div className="flex justify-around">
        <EyeOutlined
          title="View"
          style={innerTableActionBtnDesign}
          onClick={() => {
            setActions({ drawer: true });
            setValue({ drawerValue: props?.record });
          }}
        />
        <EditOutlined
          title="Edit"
          style={innerTableActionBtnDesign}
          onClick={() => {
            setActions({ editPlan: true });
            setValue({editValue: props?.record})
            console.log(props?.record , "Hello")
          }}
        />
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
    <>
      {editPlan ? (
        <EditEntry back={backEditPlan} requestsCaller={requestsCaller} data={editValue}/>
      ) : (
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
          <div>
            <DrawerComp
              title={"Product Details"}
              visible={drawer}
              onCloseDrawer={onCloseDrawer}
              data={drawerValue}
            />
          </div>
        </div>
      )}
    </>
  );
};
