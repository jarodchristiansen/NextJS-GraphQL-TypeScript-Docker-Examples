import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import GET_PRODUCTS from "../helpers/queries/getProducts";

const ProductContainer = ({ products }) => {
  const [items, setItems] = useState(products);

  const { data, loading, error } = useQuery(GET_PRODUCTS);

  useEffect(() => {
    if (loading === false && data) {
      console.log({ data });
      setItems(data?.getProducts);
    }
  }, [loading, data]);

  const renderProducts = () => {
    console.log("renderProducts", items);
    if (items && !error) {
      return (
        <div>
          <ul>
            {items.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>
      );
    } else if (error) {
      return <div>Error Message: {error}</div>;
    }
  };

  return (
    <div>
      <div>ProductContainer</div>

      {loading ? <div>Loading...</div> : renderProducts()}
    </div>
  );
};

export default ProductContainer;
