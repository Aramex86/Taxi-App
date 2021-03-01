import React from "react";
import OrderBtn from "../Common/OrderBtn";
import SrearchComp from "../SearchComp/SrearchComp";

const Layout = (props: any) => {
  return (
    <>
      <SrearchComp />
      {props.children}
      <OrderBtn />
    </>
  );
};

export default Layout;
