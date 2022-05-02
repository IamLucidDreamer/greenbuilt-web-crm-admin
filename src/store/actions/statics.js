import { toast } from "react-toastify";
import axios from "../../appConfig/httpHelper";
import { INDUSTRY_TYPE, SOURCE_TYPE, UOM, PACKAGING_TYPE } from "../constants";

const setIndustryType = (data) => ({
  type: INDUSTRY_TYPE,
  payload: data,
});

const setSourceType = (data) => ({
  type: SOURCE_TYPE,
  payload: data,
});

const setUom = (data) => ({
  type: UOM,
  payload: data,
});

const setPackagingType = (data) => ({
  type: PACKAGING_TYPE,
  payload: data,
});

export const getIndustryType = () => (dispatch) => {
  axios
    .get("/industryType/get-all")
    .then((res) => {
      console.log(res);
      dispatch(setIndustryType(res.data.data));
    })
    .catch((err) => console.log(err));
};

export const getSourceType = () => (dispatch) => {
  axios
    .get("/sourceType/get-all")
    .then((res) => {
      console.log(res);
      dispatch(setSourceType(res.data.data));
    })
    .catch((err) => console.log(err));
};

export const getUom = () => (dispatch) => {
  axios
    .get("/uom/get-all")
    .then((res) => {
      console.log(res);
      dispatch(setUom(res.data.data));
    })
    .catch((err) => console.log(err));
};

export const getPackagingType = () => (dispatch) => {
  axios
    .get("/packagingType/get-all")
    .then((res) => {
      console.log(res);
      dispatch(setPackagingType(res.data.data));
    })
    .catch((err) => console.log(err));
};
