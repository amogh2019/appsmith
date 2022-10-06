import React from "react";
import Actions, { ActionsProps } from "./actions";
import { Banner, BannerPropType } from "./banner";

function TableHeader(props: ActionsProps & BannerPropType) {
  const { addNewRow, ...ActionProps } = props;

  return addNewRow ? (
    <Banner addNewRow={addNewRow} />
  ) : (
    <Actions {...ActionProps} />
  );
}

export default TableHeader;
