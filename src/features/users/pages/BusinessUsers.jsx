import React, { useEffect, useReducer } from "react";
import axios from "../../../appConfig/httpHelper";
import ActionButtons from "../../components/actionsButtons/Index";
import { DataTable } from "../../components/table/Index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EyeOutlined } from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../../components/styles/innerTableActions";
import { DrawerComp } from "../components/DrawerBusiness";

export const BusinessUsers = () => {
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
      loadingAllBusinessUsers: false,
      downloadAllBusinessUsers: false,
    }
  );

  const {
    drawer,
    loading,
    pagination,
    trash,
    loadingAllBusinessUsers,
    downloadAllBusinessUsers,
  } = actions;

  const [value, setValue] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    { businessUsers: [], allBusinessUsers: [], drawerValue: {} }
  );

  const { businessUsers, allBusinessUsers, drawerValue } = value;

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
        setValue({
          businessUsers: res.data.user.filter((val) => val.role === 2),
        });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loading: false }));
  };

  const getAllBusinessUsers = () => {
    setActions({ loadingAllProducts: true });
    axios
      .get("/user/get-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Business Users Ready for Download");
        setActions({ downloadAllBusinessUsers: true });
        setValue({
          allBusinessUsers: res.data.user.filter((val) => val.role === 2),
        });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loadingAllBusiness: true }));
  };

  useEffect(() => requestsCaller(), []);

  const onCloseDrawer = () => setActions({ drawer: false });

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
      key: "isApproved",
      title: "Status",
      render: (data) => (data.isApproved ? "Approved" : "Pending"),
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
      </div>
    );
  };

  return (
    <div className="">
      <ActionButtons
        pageTitle={"Business Users"}
        showTrashButton={false}
        showTrashFunction={""}
        showReFreshButton={true}
        refreshFunction={requestsCaller}
        showExportDataButton={true}
        exportDataFunction={getAllBusinessUsers}
        totalItems={allBusinessUsers}
        csvName={"Business Users"}
        loadingItems={loadingAllBusinessUsers}
        downloadItems={downloadAllBusinessUsers}
        showAddNewButton={false}
        addNewFunction={""}
      />
      <div className="border-2 mt-5">
        <DataTable
          usersData={businessUsers}
          columns={columns}
          loading={loading}
        />
      </div>
      <div>
        <DrawerComp
          title={"Business User Details"}
          visible={drawer}
          onCloseDrawer={onCloseDrawer}
          data={drawerValue}
        />
      </div>
    </div>
  );
};
