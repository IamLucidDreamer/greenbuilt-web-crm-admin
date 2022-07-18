import React from "react";
import { Row, Col, Drawer, Tabs, TabPane, Image } from "antd";
import { Desc } from "../../components/layout/Desc";

export const DrawerComp = (props) => {
  const { TabPane } = Tabs;
  console.log({ props });
  return (
    <Drawer
      title={props.title}
      width="75%"
      placement="right"
      onClose={() => props.onCloseDrawer()}
      visible={props.visible}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Asset information" key="1">
          <Row>
            <Col span={12} lg={12} md={12} sm={32} xs={32}>
              <Desc title="Name" content={props?.data?.name} />
              <Desc title="Industry Type" content={props?.data?.industryName} />
              <Desc title="Source Type" content={props?.data?.sourceType} />
              <Desc title="Service Number" content={props?.data?.serviceNo} />
              <Desc title="Date Of Commisioning" content={props?.data?.dateOfCommisioning} />
              <Desc title="Capacity" content={props?.data?.capacity} />
              <Desc title="EDC" content={props?.data?.edc} />
            </Col>
            <Col span={12} lg={12} md={12} sm={32} xs={32}>
              <Desc title="Feeder" content={props?.data?.feeder} />
              <Desc title="Latitude" content={props?.data?.latitude} />
              <Desc title="Longitude" content={props?.data?.longitude} />
              <Desc title="Make" content={props?.data?.make} />
              <Desc title="Model" content={props?.data?.model} />
              <Desc title="No. Of Weightage" content={props?.data?.noOfWtgs} />
              <Desc title="Own Captive" content={props?.data?.ownCaptive} />
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </Drawer>
  );
};
