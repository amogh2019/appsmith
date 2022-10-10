import React from "react";
import Actions, { ActionsProps } from "./actions";
import { Banner, BannerPropType } from "./banner";

function TableHeader(props: ActionsProps & BannerPropType) {
  const {
    accentColor,
    addNewRowInProgress,
    borderRadius,
    boxShadow,
    onAddNewRowAction,
    ...ActionProps
  } = props;

  return addNewRowInProgress ? (
    <Banner
      accentColor={accentColor}
      addNewRowInProgress={addNewRowInProgress}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      onAddNewRowAction={onAddNewRowAction}
    />
  ) : (
    <Actions
      accentColor={accentColor}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      {...ActionProps}
    />
  );
}

export default TableHeader;
