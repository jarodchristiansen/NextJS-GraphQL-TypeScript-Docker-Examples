import Head from "next/head";
import styles from "../styles/Home.module.css";
import ProductContainer from "../components/ProductContainer";
import client from "../apollo-client";
import GET_PRODUCTS from "../helpers/queries/getProducts";
import AddProductForm from "../components/AddProductForm";
import { useQuery } from "@apollo/client";

export default function Home(props) {
  return (
    <div className="container text-center">
      <AddProductForm />

      <ProductContainer products={props?.data?.data?.getProducts || null} />
    </div>
  );
}

// export async function getStaticProps() {
//   const data = await client.query({
//     query: GET_PRODUCTS,
//   });
//
//   return {
//     props: {
//       data,
//     },
//   };
// }
