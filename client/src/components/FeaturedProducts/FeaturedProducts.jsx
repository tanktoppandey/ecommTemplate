import React, { useEffect } from "react";
import Card from "../Card/Card";
import "./FeaturedProducts.scss";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );

  useEffect(
    ()=>{
      console.log(data)
    },[data]
  )
 
  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
        Discover the latest in fashion with our curated collection of trendsetting apparel and accessories, blending style and quality for every wardrobe. Stay ahead with timeless elegance and modern chic, inspired by our passion for fashion.
        </p>
      </div>
      <div className="bottom">
        {error
          ? "Something went wrong!"
          : loading
          ? "loading"
          : data?.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default FeaturedProducts;
