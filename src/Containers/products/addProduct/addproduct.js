import React, { useState } from "react";
import axios from "../../../axios";

import { Button, Badge, Spinner, Alert } from "react-bootstrap";
import "./addProduct.css";
import { Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

const AddProducts = () => {
  const [formState, setformState] = useState("");

  const handleSubmit = values => {
    setformState("loading");
    axios
      .post("products", { name: values.name, price: values.price })
      .then(response => {
        if (response.status === 200) {
          setformState("successfull");
          setTimeout(() => {
            setformState("redirect");
          }, 2000);
        } else {
          setformState("error");
          setTimeout(() => {
            setformState("");
          }, 2000);
        }
      })
      .catch(err => {
        setformState("error");
        setTimeout(() => {
          setformState("");
        }, 2000);
      });
  };

  switch (formState) {
    case "loading":
      return (
        <div>
          <Alert variant="info">Adding Product</Alert>
          <Spinner animation="grow" variant="info" />
        </div>
      );
    case "redirect":
      return (
        <div>
          <Redirect to="/products-list"></Redirect>
        </div>
      );
    case "successfull":
      return (
        <div>
          <Alert variant="success">Product Added Successfully</Alert>
        </div>
      );
    case "error":
      return (
        <div>
          <Alert variant="danger">Error While Adding User</Alert>
        </div>
      );
    default:
      return <AddProductForm handleSubmit={handleSubmit}></AddProductForm>;
  }
};

const AddProductForm = ({ handleSubmit }) => {
  return (
    <div className="product-form">
      <h1>
        <Badge variant="primary" className="mb-5">
          New Product
        </Badge>
      </h1>

      <Formik
        initialValues={{ name: "", price: 0 }}
        validate={values => {
          let errors = {};
          if (!values.name) {
            errors.name = "Name Required";
          } else if (!values.price) {
            errors.price = "Price Required";
          } else if (values.price < 0) {
            errors.price = "Price Can't be negative";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Field
              type="text"
              name="name"
              placeholder="Product Name"
              className={
                errors.name && touched.name ? "text-input error" : "text-input"
              }
            />
            <ErrorMessage
              name="name"
              render={msg => <div className="error-message">{msg}</div>}
            />
            <Field
              type="number"
              name="price"
              placeholder="Product Price"
              className={
                errors.price && touched.price
                  ? "text-input error"
                  : "text-input"
              }
            />
            <ErrorMessage
              name="price"
              component="div"
              className="error-message"
            />

            <Button
              block
              disabled={isSubmitting || Object.keys(errors).length}
              type="submit"
              className="submit-button"
            >
              Add Product
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProducts;
