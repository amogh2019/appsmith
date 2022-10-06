import { TableColumnProps } from "./Constants";
import { isPlainObject, isNil, isString } from "lodash";
import moment from "moment";
import { ColumnTypes } from "../constants";

export const transformTableDataIntoCsv = (props: {
  columns: TableColumnProps[];
  data: Array<Record<string, unknown>>;
}) => {
  const csvData = [];
  csvData.push(
    props.columns
      .map((column: TableColumnProps) => {
        if (column.metaProperties && !column.metaProperties.isHidden) {
          return column.Header;
        }
        return null;
      })
      .filter((i) => !!i),
  );
  for (let row = 0; row < props.data.length; row++) {
    const data: { [key: string]: any } = props.data[row];
    const csvDataRow = [];
    for (let colIndex = 0; colIndex < props.columns.length; colIndex++) {
      const column = props.columns[colIndex];
      let value = data[column.alias];
      if (column.metaProperties && !column.metaProperties.isHidden) {
        value =
          isString(value) && value.includes("\n")
            ? value.replace("\n", " ")
            : value;
        if (isString(value) && value.includes(",")) {
          csvDataRow.push(`"${value}"`);
        } else {
          csvDataRow.push(value);
        }
      }
    }
    csvData.push(csvDataRow);
  }
  return csvData;
};
