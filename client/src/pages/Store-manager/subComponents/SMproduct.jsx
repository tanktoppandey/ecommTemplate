import React from 'react'
import useFetch from '../../../hooks/useFetch';
import { useEffect } from 'react';
import Card from '../../../components/Card/Card';

const SMproduct = () => {
  const { data, loading, error } = useFetch(
    `/products?populate=*`
  );
useEffect(
  ()=>{
    if(data){
      console.log(data)
    }
    else{
      console.log("no data found")
      console.log("error",error)
    }
    

  },[data]
)
  return (
    <div className="list">
    {loading
      ? "loading"
      : data?.map((item) => <Card item={item} key={item.id} />)}
  </div>
  )
}

export default SMproduct