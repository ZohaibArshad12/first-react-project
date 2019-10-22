import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { Alert, Spinner, Table } from "react-bootstrap";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [formState, setformState] = useState("");

  useEffect(() => {
    setformState("loading");
    axios
      .get("products")
      .then(response => {
        if (response.status === 200) {
          const products = [...response.data];
          setProducts(products);
          setformState("");
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
  }, []);

  switch (formState) {
    case "loading":
      return (
        <div>
          <Alert variant="info">Loading Products</Alert>
          <Spinner animation="grow" variant="info" />
        </div>
      );
    case "error":
      return (
        <div>
          <Alert variant="danger">Error While Loading Products</Alert>
        </div>
      );
    default:
      return (
        <div>
          <RenderList products={products} />
        </div>
      );
  }
};

const RenderList = ({ products }) => {
  return (
    <div>
      <Table striped bordered hover variant="dark" size="sm">
        <TableHeader />

        {products.map((product, index) => {
          return (
            <ProductRow
              key={product._id}
              index={index}
              product={product}
            />
          );
        })}
      </Table>
    </div>
  );
};

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>#</th>
        <th>prod Name</th>
        <th>Price</th>
      </tr>
    </thead>
  );
};

const ProductRow = ({ product, index }) => {
  return (
    <tbody>
      <tr>
        <td>{index}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
      </tr>
    </tbody>
  );
};

export default ProductsList;
