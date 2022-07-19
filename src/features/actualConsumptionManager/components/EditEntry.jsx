import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../appConfig/httpHelper";
import { toast } from "react-toastify";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const EditEntry = (props) => {
  const token = JSON.parse(localStorage.getItem("jwt"));

  const handleRequest = (values) => {
    console.log(values);
    const form_data = new FormData();
    form_data.append("totalConsumption", values.totalConsumption);
    form_data.append("totalGreenConsumption", values.greenConsumption);

    for (var key of form_data.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    axios
      .put(`/power-consumption/update/${props.data.id}`, form_data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": `multipart/form-data; boundary=${form_data._boundary}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        props.requestsCaller()
        props.back();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      });
  };

  const formik = useFormik({
    initialValues: {
      totalConsumption: props.data?.totalConsumption,
      greenConsumption: props.data?.totalGreenConsumption,
    },
    validationSchema: Yup.object({
      totalConsumption: Yup.string().required("Required"),
      greenConsumption: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // Extracting the Year and Month from Month/Year Input
      const date = Date.parse(values.monthYear);
      const getDate = new Date(date);
      formik.setFieldValue("month", getDate.getMonth());
      formik.setFieldValue("year", getDate.getFullYear());
      console.log(values);
      handleRequest(values);
    },
  });
  return (
    <div className="my-2">
      <button
        className="text-purple-1 p-2 text-base"
        onClick={() => {
          props.back();
        }}
      >
        <ArrowLeftOutlined style={{ fontSize: 22 }} />
      </button>
      <h1 className="text-purple-1 text-center text-3xl font-bold">
        Edit Entry
      </h1>
      <form className="" onSubmit={formik.handleSubmit}>
        <div className="my-5 flex flex-col">
          <input
            placeholder="Total Consumption"
            className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
            {...formik.getFieldProps("totalConsumption")}
          />
          {formik.touched.totalConsumption && formik.errors.totalConsumption ? (
            <div> {formik.errors.totalConsumption}</div>
          ) : null}
        </div>
        <div className="my-5 flex flex-col">
          <input
            placeholder="Green Consumption"
            className="p-3 text-xl text-purple-1 rounded-xl border-2 border-purple-1 border-opacity-50 focus:outline-purple-11"
            {...formik.getFieldProps("greenConsumption")}
          />
          {formik.touched.greenConsumption && formik.errors.greenConsumption ? (
            <div>{formik.errors.greenConsumption}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 my-5 bg-purple-1 border-2 border-purple-1 focus:outline-none rounded-2xl text-xl text-left text-white font-bold group duration-500 flex justify-evenly items-center hover:shadow-lg shadow-purple-1"
        >
          Edit Entry
        </button>
      </form>
    </div>
  );
};
