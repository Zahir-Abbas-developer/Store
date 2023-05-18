
import { Col, Layout, Row } from "antd";

import React from 'react'
import AmountReceivableTable from './AmountReceivableTable/AmountReceivableTable'
import Cards from "./Cards/Cards"
import AccountReceivableMain from './charts/AccountRecieveable/AccountReceivable'
import ClientAverageProfit from './charts/ClientAverageProfit/ClientAverageProfit'
import RevenueComparison from './charts/RevenueComparison/RevenueComparison'
import StaffCategories from './charts/StaffCategories/StaffCategories'
import WeekWiseSummary from './charts/WeekWiseSummary/WeekWiseSummary'
import ClientProfitTable from './ClientProfitTable/ClientProfitTable'
import TopClientsCards from './TopClients/TopClientsCards'

import './FinanceDashboard.scss'
import BreadCrumb from "../../layout/BreadCrumb/BreadCrumb";
const FinanceDashboard = () => {
   //BreadCrumb Items
   const breadCrumbItems = [
    {
      title: "Finance",
      path: "",
    },
    {
      title: "Dashboard",
      path: "/dashboard",
    },
  ];
  return (
    <Layout className="bgLight-color wrap-main-finance-dashboard">
    <BreadCrumb breadCrumbItems={breadCrumbItems} />
      <Row gutter={[23, 23]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
          <div className="wrapper-finance-only-top-card-content"  style={{ paddingBottom:"20px" }}>
        <Cards/>
        </div>
        </Col>
       </Row>
       <div className="wrapper-finance-graph-content-body" >
       <Row gutter={[23, 23]} style={{ paddingBottom:"20px"}}>
       
        <Col sm={24} md={24} lg={24} xl={12}>
        <AccountReceivableMain/>
        </Col>
        <Col sm={24} md={24} lg={24} xl={12}>
        <RevenueComparison/>
        </Col>
        </Row>
        <Row gutter={[23, 23]} style={{ paddingBottom:"20px"}}>
        <Col sm={24} md={24} lg={24} xl={14}>
        <ClientAverageProfit/>
        </Col>
        <Col sm={24} md={24} lg={24} xl={10}>
        <StaffCategories/>
        </Col>
        </Row>
        <Row gutter={[23, 23]} style={{ paddingBottom:"20px"}}>
        <Col xs={24}   sm={24} md={24} lg={24} xl={24}>
        <WeekWiseSummary/>
        </Col>
        </Row>
        <Row gutter={[23, 23]} style={{ paddingBottom:"24px"}}>
        <Col sm={24} md={24} lg={24} xl={13} xxl={14} style={{ paddingBottom:"0px"}}>
        <AmountReceivableTable/>
        <ClientProfitTable/>
        </Col>
        <Col sm={24} md={24} lg={24} xl={11} xxl={10}>
        <TopClientsCards/>
        </Col>
        </Row>
        </div>
    </Layout>
  )
}

export default FinanceDashboard