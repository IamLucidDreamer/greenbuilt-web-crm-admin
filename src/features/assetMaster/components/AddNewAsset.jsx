import React from "react";
import { Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../appConfig/httpHelper";
import { toast } from "react-toastify";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export function AddNewAsset(props) {
  const industryType = useSelector((state) => state.statics.industryType);
  const sourceType = useSelector((state) => state.statics.sourceType);

  //Create Products Error With Points providing String in place of number
  const formik = useFormik({
    initialValues: {
      capacity: "",
      dateOfCommisioning: "",
      edc: "",
      feeder: "",
      industryName: "",
      latitude: "",
      locationNumber: "",
      longitude: "",
      make: "",
      model: "",
      name: "",
      noOfWtgs: "",
      ownCaptive: "",
      serviceNo: "",
      sourceType: "",
      substation: "",
    },
    validationSchema: Yup.object({
      capacity: Yup.string().required("Required"),
      dateOfCommisioning: Yup.string().required("Required"),
      edc: Yup.string().required("Required"),
      feeder: Yup.string().required("Required"),
      industryName: Yup.string().required("Required"),
      latitude: Yup.string().required("Required"),
      locationNumber: Yup.string().required("Required"),
      longitude: Yup.string().required("Required"),
      make: Yup.string().required("Required"),
      model: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      noOfWtgs: Yup.string().required("Required"),
      ownCaptive: Yup.string().required("Required"),
      serviceNo: Yup.string().required("Required"),
      sourceType: Yup.string().required("Required"),
      substation: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleCreateAsset(values);
    },
  });

  const handleCreateAsset = (values) => {
    const token = JSON.parse(localStorage.getItem("jwt"));
    const data = {};
    data.asset = { ...values, noOfWtgs: parseInt(values.noOfWtgs) };
    axios
      .post("/asset/upload/3", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        props.back();
        props.requestsCaller();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="m-2">
      <button
        className="text-purple-1 p-2 text-base"
        onClick={() => {
          props.back();
        }}
      >
        <ArrowLeftOutlined style={{ fontSize: 22 }} />
      </button>
      <h1 className="text-purple-1 text-center text-3xl font-bold">
        Create New Asset
      </h1>
      <div className="shadow-lg rounded-3xl">
        <div className="bg-white p-3 rounded-3xl">
          <form className="" onSubmit={formik.handleSubmit}>
            <div className="flex justify-between w-full ">
              <div className="my-5 flex flex-col w-5/12">
                <input
                  placeholder="Name"
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="my-5 flex flex-col w-5/12">
                <input
                  placeholder="Service No"
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                  {...formik.getFieldProps("serviceNo")}
                />
                {formik.touched.serviceNo && formik.errors.serviceNo ? (
                  <div>{formik.errors.serviceNo}</div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-between w-full ">
              <div className="my-5 flex flex-col w-5/12">
                <select
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
                  {...formik.getFieldProps("industryName")}
                >
                  <option disabled value="">
                    Select Industry Type
                  </option>
                  {industryType.map((data) => (
                    <option value={data.name}>{data.name}</option>
                  ))}
                </select>
                {formik.touched.industryName && formik.errors.industryName ? (
                  <div>{formik.errors.industryName}</div>
                ) : null}
              </div>
              <div className="my-5 flex flex-col w-5/12">
                <select
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-1"
                  {...formik.getFieldProps("sourceType")}
                >
                  <option disabled value="">
                    Select Source Type
                  </option>
                  {sourceType.map((data) => (
                    <option value={data.name}>{data.name}</option>
                  ))}
                </select>
                {formik.touched.sourceType && formik.errors.sourceType ? (
                  <div>{formik.errors.sourceType}</div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-between w-full ">
              <div className="my-5 flex flex-col w-5/12">
                <input
                  placeholder="Date Of Commisioning"
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                  {...formik.getFieldProps("dateOfCommisioning")}
                />
                {formik.touched.dateOfCommisioning &&
                formik.errors.dateOfCommisioning ? (
                  <div>{formik.errors.dateOfCommisioning}</div>
                ) : null}
              </div>
              <div className="my-5 flex flex-col w-5/12">
                <input
                  placeholder={`Capacity`}
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                  {...formik.getFieldProps("capacity")}
                />
                {formik.touched.capacity && formik.errors.capacity ? (
                  <div>{formik.errors.capacity}</div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-between w-full ">
              <div className="my-5 flex flex-col w-5/12">
                <input
                  placeholder="EDC"
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                  {...formik.getFieldProps("edc")}
                />
                {formik.touched.edc && formik.errors.edc ? (
                  <div>{formik.errors.edc}</div>
                ) : null}
              </div>
              <div className="my-5 flex flex-col w-5/12">
                <input
                  placeholder="Feeder"
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                  {...formik.getFieldProps("feeder")}
                />
                {formik.touched.feeder && formik.errors.feeder ? (
                  <div>{formik.errors.feeder}</div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-between w-full ">
              <div className="my-5 flex flex-col w-5/12">
                <input
                  placeholder="Latitude"
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                  {...formik.getFieldProps("latitude")}
                />
                {formik.touched.latitude && formik.errors.latitude ? (
                  <div>{formik.errors.latitude}</div>
                ) : null}
              </div>
              <div className="my-5 flex flex-col w-5/12">
                <input
                  placeholder="Longitude"
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                  {...formik.getFieldProps("longitude")}
                />
                {formik.touched.longitude && formik.errors.longitude ? (
                  <div>{formik.errors.longitude}</div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-between w-full ">
              <div className="my-5 flex flex-col w-5/12">
                <input
                  placeholder="Location Number"
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                  {...formik.getFieldProps("locationNumber")}
                />
                {formik.touched.locationNumber &&
                formik.errors.locationNumber ? (
                  <div>{formik.errors.locationNumber}</div>
                ) : null}
              </div>
              <div className="my-5 flex flex-col w-5/12">
                <input
                  placeholder="Make"
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                  {...formik.getFieldProps("make")}
                />
                {formik.touched.make && formik.errors.make ? (
                  <div>{formik.errors.make}</div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-between w-full ">
              <div className="my-5 flex flex-col w-5/12">
                <input
                  placeholder="Model"
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                  {...formik.getFieldProps("model")}
                />
                {formik.touched.model && formik.errors.model ? (
                  <div>{formik.errors.model}</div>
                ) : null}
              </div>
              <div className="my-5 flex flex-col w-5/12">
                <input
                  placeholder="No. Of Weightage"
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                  {...formik.getFieldProps("noOfWtgs")}
                />
                {formik.touched.noOfWtgs && formik.errors.noOfWtgs ? (
                  <div>{formik.errors.noOfWtgs}</div>
                ) : null}
              </div>
            </div>
            <div className="flex justify-between w-full ">
              <div className="my-5 flex flex-col w-5/12">
                <input
                  placeholder="Own Captive"
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                  {...formik.getFieldProps("ownCaptive")}
                />
                {formik.touched.ownCaptive && formik.errors.ownCaptive ? (
                  <div>{formik.errors.ownCaptive}</div>
                ) : null}
              </div>
              <div className="my-5 flex flex-col w-5/12">
                <input
                  placeholder="Sub-Station"
                  className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
                  {...formik.getFieldProps("substation")}
                />
                {formik.touched.substation && formik.errors.substation ? (
                  <div>{formik.errors.substation}</div>
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 my-5 bg-purple-1 border-2 border-purple-1 focus:outline-none rounded-2xl text-xl text-left text-white font-bold group duration-500 flex justify-evenly items-center hover:shadow-lg shadow-purple-1"
            >
              Create Asset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
