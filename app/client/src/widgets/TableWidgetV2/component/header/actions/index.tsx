import React from "react";
import styled from "styled-components";
import { Icon, Classes } from "@blueprintjs/core";
import {
  TableHeaderContentWrapper,
  PaginationWrapper,
  PaginationItemWrapper,
  CommonFunctionsMenuWrapper,
} from "../../TableStyledWrappers";
import { SearchComponent } from "design-system";
import TableFilters from "./filter";
import {
  ReactTableColumnProps,
  TableSizes,
  ReactTableFilter,
} from "../../Constants";
import TableDataDownload from "./Download";
import { Colors } from "constants/Colors";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { PageNumberInput } from "./PageNumberInput";
import ActionItem from "./ActionItem";

const SearchComponentWrapper = styled.div<{
  borderRadius: string;
  boxShadow?: string;
  accentColor: string;
}>`
  margin: 3px 10px;
  flex: 0 0 200px;

  & .${Classes.INPUT} {
    border-radius: ${({ borderRadius }) => borderRadius} !important;
  }
  & .${Classes.INPUT}:active, & .${Classes.INPUT}:focus {
    border-radius: ${({ borderRadius }) => borderRadius};
    border: 0px solid !important;
    border-color: ${({ accentColor }) => accentColor} !important;
    box-shadow: none !important;
  }
`;

export interface ActionsPropsType {
  updatePageNo: (pageNo: number, event?: EventType) => void;
  nextPageClick: () => void;
  prevPageClick: () => void;
  pageNo: number;
  totalRecordsCount?: number;
  tableData: Array<Record<string, unknown>>;
  tableColumns: ReactTableColumnProps[];
  pageCount: number;
  currentPageIndex: number;
  pageOptions: number[];
  columns: ReactTableColumnProps[];
  hiddenColumns?: string[];
  widgetName: string;
  widgetId: string;
  searchKey: string;
  searchTableData: (searchKey: any) => void;
  serverSidePaginationEnabled: boolean;
  filters?: ReactTableFilter[];
  applyFilter: (filters: ReactTableFilter[]) => void;
  tableSizes: TableSizes;
  isVisibleDownload?: boolean;
  isVisibleFilters?: boolean;
  isVisiblePagination?: boolean;
  isVisibleSearch?: boolean;
  delimiter: string;
  borderRadius: string;
  boxShadow: string;
  accentColor: string;
  allowAddNewRow: boolean;
  onAddNewRow: () => void;
}

function Actions(props: ActionsPropsType) {
  return (
    <>
      {props.isVisibleSearch && (
        <SearchComponentWrapper
          accentColor={props.accentColor}
          borderRadius={props.borderRadius}
          boxShadow={props.boxShadow}
        >
          <SearchComponent
            onSearch={props.searchTableData}
            placeholder="Search..."
            value={props.searchKey}
          />
        </SearchComponentWrapper>
      )}
      {(props.isVisibleFilters || props.isVisibleDownload) && (
        <CommonFunctionsMenuWrapper tableSizes={props.tableSizes}>
          {props.isVisibleFilters && (
            <TableFilters
              accentColor={props.accentColor}
              applyFilter={props.applyFilter}
              borderRadius={props.borderRadius}
              columns={props.columns}
              filters={props.filters}
              widgetId={props.widgetId}
            />
          )}

          {props.isVisibleDownload && (
            <TableDataDownload
              columns={props.tableColumns}
              data={props.tableData}
              delimiter={props.delimiter}
              widgetName={props.widgetName}
            />
          )}

          {props.allowAddNewRow && (
            <ActionItem
              className="t--add-new-row"
              icon="add"
              selectMenu={props.onAddNewRow}
              selected={false}
              title="Add a row"
              width={14}
            />
          )}
        </CommonFunctionsMenuWrapper>
      )}

      {props.isVisiblePagination && props.serverSidePaginationEnabled && (
        <PaginationWrapper>
          {props.totalRecordsCount ? (
            <TableHeaderContentWrapper className="show-page-items">
              {props.totalRecordsCount} Records
            </TableHeaderContentWrapper>
          ) : null}
          <PaginationItemWrapper
            accentColor={props.accentColor}
            borderRadius={props.borderRadius}
            className="t--table-widget-prev-page"
            disabled={props.pageNo === 0}
            onClick={() => {
              props.prevPageClick();
            }}
          >
            <Icon color={Colors.HIT_GRAY} icon="chevron-left" iconSize={16} />
          </PaginationItemWrapper>
          {props.totalRecordsCount ? (
            <TableHeaderContentWrapper>
              Page&nbsp;
              <PaginationItemWrapper
                accentColor={props.accentColor}
                borderRadius={props.borderRadius}
                className="page-item"
                selected
              >
                {props.pageNo + 1}
              </PaginationItemWrapper>
              &nbsp;
              <span>{`of ${props.pageCount}`}</span>
            </TableHeaderContentWrapper>
          ) : (
            <PaginationItemWrapper
              accentColor={props.accentColor}
              borderRadius={props.borderRadius}
              className="page-item"
              selected
            >
              {props.pageNo + 1}
            </PaginationItemWrapper>
          )}
          <PaginationItemWrapper
            accentColor={props.accentColor}
            borderRadius={props.borderRadius}
            className="t--table-widget-next-page"
            disabled={
              !!props.totalRecordsCount && props.pageNo === props.pageCount - 1
            }
            onClick={() => {
              props.nextPageClick();
            }}
          >
            <Icon color={Colors.HIT_GRAY} icon="chevron-right" iconSize={16} />
          </PaginationItemWrapper>
        </PaginationWrapper>
      )}
      {props.isVisiblePagination && !props.serverSidePaginationEnabled && (
        <PaginationWrapper>
          <TableHeaderContentWrapper className="show-page-items">
            {props.tableData?.length} Records
          </TableHeaderContentWrapper>
          <PaginationItemWrapper
            accentColor={props.accentColor}
            borderRadius={props.borderRadius}
            className="t--table-widget-prev-page"
            disabled={props.currentPageIndex === 0}
            onClick={() => {
              const pageNo =
                props.currentPageIndex > 0 ? props.currentPageIndex - 1 : 0;
              props.updatePageNo(pageNo + 1, EventType.ON_PREV_PAGE);
            }}
          >
            <Icon color={Colors.GRAY} icon="chevron-left" iconSize={16} />
          </PaginationItemWrapper>
          <TableHeaderContentWrapper>
            Page{" "}
            <PageNumberInput
              borderRadius={props.borderRadius}
              disabled={props.pageCount === 1}
              pageCount={props.pageCount}
              pageNo={props.pageNo + 1}
              updatePageNo={props.updatePageNo}
            />{" "}
            of {props.pageCount}
          </TableHeaderContentWrapper>
          <PaginationItemWrapper
            accentColor={props.accentColor}
            borderRadius={props.borderRadius}
            className="t--table-widget-next-page"
            disabled={props.currentPageIndex === props.pageCount - 1}
            onClick={() => {
              const pageNo =
                props.currentPageIndex < props.pageCount - 1
                  ? props.currentPageIndex + 1
                  : 0;
              props.updatePageNo(pageNo + 1, EventType.ON_NEXT_PAGE);
            }}
          >
            <Icon color={Colors.GRAY} icon="chevron-right" iconSize={16} />
          </PaginationItemWrapper>
        </PaginationWrapper>
      )}
    </>
  );
}

export default Actions;
