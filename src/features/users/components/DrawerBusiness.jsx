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
        <TabPane tab="Business Users Details" key="1">
          <Row>
            <Col span={12} lg={12} md={12} sm={32} xs={32}>
              <Desc title="Name" content={props?.data?.name} />

              <Desc title="Email" content={props?.data?.email} />
              <Desc title="Phone Number" content={props?.data?.phoneNumber} />
              <Desc title="Mobile Number" content={props?.data?.mobileNumber} />
              <Desc
                title="Gender"
                content={props?.data?.gender ? "Male" : "Female"}
              />
              <Desc title="Address" content={props?.data?.address} />
              <Desc title="City" content={props?.data?.city} />
              <Desc title="State" content={props?.data?.state} />
              <Desc title="Country" content={props?.data?.country} />
            </Col>
            <Col span={12} lg={12} md={12} sm={32} xs={32}>
              <Desc title="Registered On" content={props?.data?.createdAt} />
              <Desc
                title="Approval Status"
                content={props?.data?.isApproved ? "Approved" : "Not Approved"}
              />
              <Desc title="GSTIN" content={props?.data?.gstin} />
              <Desc
                title="EB Service Number"
                content={props?.data?.ebServiceNumber}
              />
              <Desc title="Industry Type" content={props?.data?.industryType} />
              <Desc
                title="Trash"
                content={props?.data?.isTrash ? "True" : "False"}
              />
              <Desc title="Company Code" content={props?.data?.companyCode} />
              <Desc title="Points" content={props?.data?.points} />
            </Col>

            <Col span={32} className="p-3 mt-3">
              <h2>
                <b>Documents : </b>
              </h2>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </Drawer>
  );
};
