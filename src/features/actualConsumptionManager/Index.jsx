import React, { useEffect, useReducer } from "react";
import ActionButtons from "../components/actionsButtons/Index";
import { DataTable } from "../components/table/Index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  EyeOutlined,
  DownloadOutlined,
  EditOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../components/styles/innerTableActions";
import axios from "../../appConfig/httpHelper";
import { EditEntry } from "./components/EditEntry";

export const ActualConsumptionManager = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("jwt"));

  // Declaring the States Required for the Working of the Component
  const [actions, setActions] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    {
      drawer: false,
      editPlan: false,
      loading: false,
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
      .get("/power-consumption/get-all??limit=50&offset=0", {
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
    axios
      .post(
        `/power-consumption/approve/${record.id}`,
        {
          points: record?.totalGreenConsumption,
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
      .delete(`/power-consumption/delete/${record.id}`, {
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
      key: "userName",
      title: "User Name",
      render: (data) => data?.user?.name,
    },
    {
      key: "day",
      title: "Day",
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
      key: "totalConsumption",
      title: "Total Consumption",
      render: (data) => data.totalConsumption,
    },
    {
      key: "totalGreenConsumption",
      title: "Total Green Consumption",
      render: (data) => data.totalGreenConsumption,
    },
    {
      key: "actions",
      title: "Actions",
      render: (record) => <ColumnActions record={record} />,
    },
  ];

  console.log(pointsApproval);

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
        <a href={props.record.ebBillLocation} target="_blank">
          <DownloadOutlined title="Edit" style={innerTableActionBtnDesign} />
        </a>
        <EditOutlined
          title="Edit"
          style={innerTableActionBtnDesign}
          onClick={() => {
            setActions({ editPlan: true });
            setValue({ editValue: props?.record });
            console.log(props?.record, "Hello");
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

  const backEditPlan = () => setActions({ editPlan: false });

  return (
    <>
      {editPlan ? (
        <EditEntry
          back={backEditPlan}
          requestsCaller={requestsCaller}
          data={editValue}
        />
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
          {/* <div>
    <DrawerComp
      title={"Product Details"}
      visible={drawer}
      onCloseDrawer={onCloseDrawer}
      data={drawerValue}
    />
  </div> */}
        </div>
      )}
    </>
  );
};
