import React, { useEffect, useReducer } from "react";
import ActionButtons from "../../components/actionsButtons/Index";
import { DataTable } from "../../components/table/Index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EyeOutlined, CheckOutlined } from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../../components/styles/innerTableActions";
import axios from "../../../appConfig/httpHelper";

export const ProductApprovals = () => {
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
    { productApproval: [], drawerValue: {} }
  );

  const { productApproval, drawerValue } = value;

  // Functions Used for Different Data
  const requestsCaller = () => {
    setActions({ loading: true });
    axios
      .get("/product/get-all/admin?limit=500&offset=0", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setValue({
          productApproval: res.data.data.filter((val) => !val.isApproved),
        });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loading: false }));
  };

  useEffect(() => requestsCaller(), []);

  const approveProduct = (record) => {
    axios
      .post(
        `/product/approve/${record.productId}`,
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
      key: "productName",
      title: "Product Name",
      render: (data) => data.title,
    },
    {
      key: "industryType",
      title: "Industry Type",
      render: (data) => data.industryType,
    },
    {
      key: "uom",
      title: "UOM",
      render: (data) => data.uom,
    },
    {
      key: "packagingType",
      title: "Packaging Type",
      render: (data) => data.packagingType,
    },
    {
      key: "points",
      title: "Points",
      render: (data) => data.points,
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
          onClick={() => approveProduct(props?.record)}
        />
      </div>
    );
  };

  return (
    <div className="">
      <ActionButtons
        pageTitle={"Products Approval"}
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
          usersData={productApproval}
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
