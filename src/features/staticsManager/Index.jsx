import react ,{ useState } from "react";
import { Button } from "antd";
import { IndustryType } from "./pages/IndustryType";
import { SourceType } from "./pages/SourceType";
import { Uom } from "./pages/Uom";
import { PackagingType } from "./pages/PackagingType";

export const StaticsManager = () => {
    const [show, setShow] = useState(1);
    return (
      <div>
        <div className="flex flex-row justify-around my-4">
          <Button type="primary" onClick={() => setShow(1)}>
            Industry Type
          </Button>
          <Button type="primary" onClick={() => setShow(2)}>
            Source Type
          </Button>
          <Button type="primary" onClick={() => setShow(3)}>
            Unit of Measurement
          </Button>
          <Button type="primary" onClick={() => setShow(4)}>
            Packaging Type
          </Button>
        </div>
        <div>{show === 1 ? <IndustryType /> : null}</div>
        <div>{show === 2 ? <SourceType /> : null}</div>
        <div>{show === 3 ? <Uom /> : null}</div>
        <div>{show === 4 ? <PackagingType /> : null}</div>
      </div>
    );
  };
  