import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import products from '../../configs/Products';
import Funnel1 from './funnel_1/Funnel1';
import NotFount from '../../helpers/components/NotFount';

function useQuery(){
  const {search} = useLocation();
  return React.useMemo(()=> new URLSearchParams(search), [search]);
}
const FunnelFilter = () => {
  const {funnel, product} = useParams();
  const [currentFunnel, setCurrentFunnel] = useState(null);
  const funnels = ["1","2"];
  let query = useQuery();

  const funnelExist = () => funnels.includes(funnel);
  const productExist = () => !!products[product];

  useEffect(()=>{
    if(funnel){
      localStorage.setItem("fnl", "funnel_"+funnel);
    }
    setCurrentFunnel(getFunnel());
  },[funnel, localStorage.getItem("fnl")]);


  const getFunnel = ()=>{
    switch (funnel){
      case "1":
        return <Funnel1 product={product}/>
    }
  }

  return funnelExist() && productExist() ? currentFunnel : <NotFount/>
}

export default FunnelFilter