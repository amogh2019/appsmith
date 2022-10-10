import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { NumericInput, Keys } from "@blueprintjs/core";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { Colors } from "constants/Colors";

const PageNumberInputWrapper = styled(NumericInput)<{
  borderRadius: string;
}>`
  &&& input {
    box-shadow: none;
    border: 1px solid ${Colors.ALTO2};
    background: linear-gradient(0deg, ${Colors.WHITE}, ${Colors.WHITE}),
      ${Colors.POLAR};
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    line-height: 24px;
    padding: 0 !important;
    text-align: center;
    font-size: 12px;
    border-radius: ${({ borderRadius }) => borderRadius};
  }
  &&&.bp3-control-group > :only-child {
    border-radius: 0;
  }
  margin: 0 8px;
`;

export function PageNumberInput(props: {
  pageNo: number;
  pageCount: number;
  updatePageNo: (pageNo: number, event?: EventType) => void;
  disabled: boolean;
  borderRadius: string;
}) {
  const [pageNumber, setPageNumber] = React.useState(props.pageNo || 0);
  useEffect(() => {
    setPageNumber(props.pageNo || 0);
  }, [props.pageNo]);
  const handleUpdatePageNo = useCallback(
    (e) => {
      const oldPageNo = Number(props.pageNo || 0);
      let page = Number(e.target.value);
      // check page is less then min page count
      if (isNaN(page) || page < 1) {
        page = 1;
      }
      // check page is greater then max page count
      if (page > props.pageCount) {
        page = props.pageCount;
      }
      // fire Event based on new page number
      if (oldPageNo < page) {
        props.updatePageNo(page, EventType.ON_NEXT_PAGE);
      } else if (oldPageNo > page) {
        props.updatePageNo(page, EventType.ON_PREV_PAGE);
      }
      setPageNumber(page);
    },
    [props.pageNo, props.pageCount],
  );
  return (
    <PageNumberInputWrapper
      borderRadius={props.borderRadius}
      buttonPosition="none"
      clampValueOnBlur
      className="t--table-widget-page-input"
      disabled={props.disabled}
      max={props.pageCount || 1}
      min={1}
      onBlur={handleUpdatePageNo}
      onKeyDown={(e: any) => {
        if (e.keyCode === Keys.ENTER) {
          handleUpdatePageNo(e);
        }
      }}
      onValueChange={(value: number) => {
        setPageNumber(value);
      }}
      value={pageNumber}
    />
  );
}
