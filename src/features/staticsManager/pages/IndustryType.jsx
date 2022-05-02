import React, { useEffect, useReducer, useState } from "react";
import axios from "../../../appConfig/httpHelper";
import ActionButtons from "../../components/actionsButtons/Index";
import { DataTable } from "../../components/table/Index";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EyeOutlined, CloseOutlined } from "@ant-design/icons";
import { innerTableActionBtnDesign } from "../../components/styles/innerTableActions";
import { useFormik } from "formik";
import * as Yup from "yup";

export const IndustryType = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("jwt"));
  const [show, setShow] = useState(false);

  // Declaring the States Required for the Working of the Component
  const [actions, setActions] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    {
      drawer: false,
      loading: false,
      pagination: 15,
      trash: false,
      loadingAllIndustryType: false,
      downloadAllIndustryType: false,
    }
  );

  const {
    drawer,
    loading,
    pagination,
    trash,
    loadingAllIndustryType,
    downloadAllIndustryType,
  } = actions;

  const [value, setValue] = useReducer(
    (state, diff) => ({ ...state, ...diff }),
    { industryType: [], allIndustryType: [] }
  );

  const { industryType, allIndustryType, drawerValue } = value;

  // Functions Used for Different Data
  const requestsCaller = () => {
    setActions({ loading: true });
    axios
      .get("/industryType/get-all?limit=50", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setValue({
          industryType: res.data.data,
        });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loading: false }));
  };

  const getAllIndustryType = () => {
    setActions({ loadingAllProducts: true });
    axios
      .get("/industryType/get-all?limit=50", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Business Users Ready for Download");
        setActions({ downloadAllIndustryType: true });
        setValue({
          allIndustryType: res.data.user.filter((val) => val.role === 2),
        });
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loadingAllBusiness: true }));
  };

  const handleNewIndustryType = ({ name }) => {
    axios
      .post(
        "/industryType/create",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("New Industry Added Successfully.");
        requestsCaller()
        setShow(false)
      })
      .catch((err) => console.log(err))
      .finally(setActions({ loadingAllBusiness: true }));
  };

  const deleteIndustry = () => {};

  const showAddNew = () => setShow(true);

  useEffect(() => requestsCaller(), []);

  // Table Column
  const columns = [
    {
      key: "id",
      title: "ID",
      render: (data) => data.id,
    },
    {
      key: "name",
      title: "Name",
      render: (data) => data.name,
    },
    {
      key: "uid",
      title: "Unique ID",
      render: (data) => data.industryTypeId,
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

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Hello world");
      handleNewIndustryType(values);
    },
  });

  return (
    <div className="">
      <ActionButtons
        pageTitle={"Indutry Type"}
        showTrashButton={false}
        showTrashFunction={""}
        showReFreshButton={true}
        refreshFunction={requestsCaller}
        showExportDataButton={true}
        exportDataFunction={getAllIndustryType}
        totalItems={allIndustryType}
        csvName={"IndutryType"}
        loadingItems={loadingAllIndustryType}
        downloadItems={downloadAllIndustryType}
        showAddNewButton={true}
        addNewFunction={showAddNew}
      />
      {show ? (
        <form onSubmit={formik.handleSubmit} className="my-4 flex justify-start items-center">
          <h1 className="text-xl text-purple-1 m-0">Add New Industry Type</h1>
          <div className="ml-10">
            <input
              placeholder="Name of Indutry Type "
              className="border-2 border-purple-1 px-2 py-3 bg-purple-1 bg-opacity-5 rounded-lg"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.feeder && formik.errors.feeder ? (
              <div>{formik.errors.feeder}</div>
            ) : null}
          </div>
          <button className="ml-10 text-xl bg-purple-1 text-white p-3 rounded-xl" type="submit">
            Submit
          </button>
          <button className="ml-10" onClick={() => setShow(false)}>
            <CloseOutlined />
          </button>
        </form>
      ) : null}
      <div className="border-2 mt-5">
        <DataTable
          usersData={industryType}
          columns={columns}
          loading={loading}
        />
      </div>
    </div>
  );
};
