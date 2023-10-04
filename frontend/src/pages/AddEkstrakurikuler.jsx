import React, { useEffect } from "react";
import Layout from "./Layout";
import FormAddEkstrakurikuler from "../components/FormAddEkstrakurikuler";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddEkstrakurikuler = () => {
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
      <FormAddEkstrakurikuler />
    </Layout>
  );
};

export default AddEkstrakurikuler;
