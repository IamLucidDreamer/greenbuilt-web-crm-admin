import React, { useEffect, useReducer, useState } from "react";
import { DataTable } from "../components/table/Index";
import ActionButtons from "../components/actionsButtons/Index";
import axios from "../../appConfig/httpHelper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DrawerComp } from "./components/Drawer";
// import { FilterDrawer } from "./components/FilterDrawer";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../components/styles/innerTableActions";
import { AddNewAsset } from "./components/AddNewAsset";

export const Assets = () => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  const [showAdd, setShowAdd] = useState(false);

  // Declaring the States Required for the Working of the Component
  const [actions, setActions] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    {
      drawer: false,
      loading: false,
      filter: false,
      pagination: 15,
      trash: false,
      newAsset: false,
      loadingAllAssets: false,
      downloadAllAssets: false,
    }
  );

  const {
    drawer,
    loading,
    filter,
    pagination,
    trash,
    newAsset,
    loadingAllAssets,
    downloadAllAssets,
  } = actions;

  const [value, setValue] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    { assets: [], allAssets: [], drawerValue: {}, filterValue: {} }
  );

  const { assets, allAssets, drawerValue, filterValue } = value;

  // Functions Used for Different Data
  const requestsCaller = () => {
    setActions({ loading: true });
    axios
      .get("/asset/get-all?limit=500", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setValue({ assets: res.data.data });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loading: false }));
  };

  const getAllAssets = () => {
    setActions({ loadingAllAssets: true });
    axios
      .get("/asset/get-all?limit=500", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Products Ready for Download");
        setActions({ downloadAllAssets: true });
        setValue({ allAssets: res.data.data });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loadingAllAssets: true }));
  };

  // const getProductBySearch = (value) => {
  //   setActions({ loading: true });
  //   axios
  //     .post(
  //       "/product/search",
  //       {
  //         key: "title",
  //         value: value,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       toast.success("Search Performed Successfully.");
  //       setValue({ products: res.data.data });
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(setActions({ loading: false }));
  // };

  // const getFilteredProduct = (value) => {
  //   setActions({ loading: true });
  //   const filterValue = {};
  //   if (value.industryTypeSelected !== "") {
  //     filterValue.industryType = value.industryTypeSelected;
  //   }
  //   if (value.packagingTypeSelected !== "") {
  //     filterValue.packagingType = value.packagingTypeSelected;
  //   }
  //   if (value.uomSelected !== "") {
  //     filterValue.uom = value.uomSelected;
  //   }
  //   console.log({ filterValue });
  //   axios
  //     .post("/product/get-all/query", filterValue, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       toast.success("Filters Applied Successfully.");
  //       setValue({ products: res.data.data });
  //       console.log(res.data.data);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(setActions({ loading: false }));
  // };

  const DeleteItem = (productId) => {
    axios
      .delete(`/product/delete/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast.success(res.data.message);
        requestsCaller();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Product Deletion Failed");
      });
  };

  useEffect(() => requestsCaller(), []);

  // This Columns Variable is used to determine The Values getting inside the Table Component
  const columns = [
    {
      key: "name",
      title: "Name",
      render: (data) => data.name,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      key: "id",
      title: "ID",
      render: (data) => data.id,
    },
    {
      key: "packagingType",
      title: "Packaging Type",
      render: (data) => data.id,
    },
    {
      key: "industryName",
      title: "Industry Name",
      render: (data) => data.industryName,
    },
    {
      key: "sourceType",
      title: "Source Type",
      render: (data) => data.sourceType,
    },
    {
      key: "make",
      title: "Make",
      render: (data) => data.make,
    },
    {
      key: "model",
      title: "Model",
      render: (data) => data.model,
    },
    {
      key: "serviceNo",
      title: "Service No",
      render: (data) => data.serviceNo,
      sorter: (a, b) => a.serviceNo - b.serviceNo,
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
        {!props?.record?.isApproved ? (
          <DeleteOutlined
            title="Ban"
            style={innerTableActionBtnDesign}
            onClick={() => DeleteItem(props?.record?.productId)}
          />
        ) : null}
      </div>
    );
  };

  const addNewAssest = () => setShowAdd(true);

  const backAddNewAsset = () => setShowAdd(false);

  const onCloseDrawer = () => {
    setActions({ drawer: false });
    setValue({ drawerValue: {} });
  };

  // const openFilterDrawer = () => {
  //   setActions({ filter: true });
  // };

  // const onCloseFilterDrawer = () => {
  //   setActions({ filter: false });
  //   setValue({ filterValue: {} });
  // };

  return (
    <>
      {showAdd ? (
        <AddNewAsset back={backAddNewAsset} />
      ) : (
        <div className="">
          <ActionButtons
            pageTitle={"Asset Master"}
            showSearchButton={false}
            onSearch={""}
            showFilterButton={false}
            onFilter={""}
            showTrashButton={false}
            showTrashFunction={""}
            showReFreshButton={true}
            refreshFunction={requestsCaller}
            showExportDataButton={true}
            exportDataFunction={getAllAssets}
            totalItems={allAssets}
            csvName={"Assets.csv"}
            loadingItems={loadingAllAssets}
            downloadItems={downloadAllAssets}
            showAddNewButton={true}
            addNewFunction={addNewAssest}
          />
          <div className="border-2 mt-5">
            <DataTable
              usersData={assets}
              columns={columns}
              loading={loading}
            />
          </div>
          <div>
            {/* <DrawerComp
              title={"Asset Details"}
              visible={drawer}
              onCloseDrawer={onCloseDrawer}
              data={drawerValue}
            /> */}
          </div>
          {/* <div>
            <FilterDrawer
              title={"Set Product Filters"}
              visible={filter}
              onCloseDrawer={onCloseFilterDrawer}
              data={filterValue}
              applyFilter={getFilteredProduct}
              resetFilter={requestsCaller}
            />
          </div> */}
        </div>
      )}
    </>
  );
};
