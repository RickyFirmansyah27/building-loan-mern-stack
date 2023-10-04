import React, { useEffect } from "react";
import Layout from "./Layout";
import FormViewGedung from "../components/FormVewGedung";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const ViewGedung = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  
  return (
    <Layout>
      <FormViewGedung />
    </Layout>
  );
};

export default ViewGedung;
