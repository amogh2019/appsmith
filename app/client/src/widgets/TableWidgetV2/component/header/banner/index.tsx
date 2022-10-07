import React from "react";

export interface BannerPropType {
  addNewRow: boolean;
}

export function Banner(props: BannerPropType) {
  return <div data-test={props.addNewRow} />;
}
