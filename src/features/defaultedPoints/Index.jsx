import React, { useEffect, useReducer } from "react";
import axios from "../../appConfig/httpHelper";
import ActionButtons from "../components/actionsButtons/Index";
import { DataTable } from "../components/table/Index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EyeOutlined, CheckOutlined } from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../components/styles/innerTableActions";

export const DefaultedPoints = () => {
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
    { defaultUsers: [], drawerValue: {} }
  );

  const { defaultUsers, drawerValue } = value;

  // Functions Used for Different Data
  const requestsCaller = () => {
    setActions({ loading: true });
    axios
      .get("/user/get-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setValue({
            defaultUsers: res.data.user
            .filter((val) => val.role === 2)
            .filter((val) => !val.defaultedPoints !== 0),
        });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loading: false }));
  };

  useEffect(() => requestsCaller(), []);

  const approveBusinessUser = (record) => {
    axios
      .post(
        `/user/approve/${record.id}`,
        {},
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

  // Table Column
  const columns = [
    {
      key: "name",
      title: "Name",
      render: (data) => data.name,
    },
    {
      key: "industryType",
      title: "Industry Type",
      render: (data) => data.industryType,
    },
    {
      key: "points",
      title: "Points",
      render: (data) => data.points,
    },
    {
      key: "email",
      title: "Email",
      render: (data) => data.email,
    },
    {
      key: "phoneNumber",
      title: "Phone Number",
      render: (data) => data.phoneNumber,
    },
    {
      key: "",
      title: "Phone Number",
      render: (data) => data.phoneNumber,
    },
    {
      key: "defaultedPoints",
      title: "Defaulted Points",
      render: (data) => data.defaultedPoints,
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
          onClick={() => approveBusinessUser(props?.record)}
        />
      </div>
    );
  };

  return (
    <div className="">
      <ActionButtons
        pageTitle={"Correct Defaulted Business Points"}
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
          usersData={defaultUsers}
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
