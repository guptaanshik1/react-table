import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import MOCK_DATA from "../mocks/MOCK_DATA.json";

const SortingTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    headerGroups,
    rows,
    getTableProps,
    prepareRow,
    getTableBodyProps,
    footerGroups,
  } =
    // @ts-ignore
    useTable({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()}>
      x
      <thead>
        {headerGroups?.map((header) => {
          return (
            <tr {...header?.getHeaderGroupProps()}>
              {header?.headers?.map((column) => {
                console.log("column:", column);
                return (
                  <th
                    {...column?.getHeaderProps(column?.getSortByToggleProps())}
                    style={{ cursor: "pointer" }}
                  >
                    {column?.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows?.map((row) => {
          prepareRow(row);
          return (
            <tr {...row?.getRowProps()}>
              {row?.cells?.map((cell) => {
                return (
                  <td {...cell?.getCellProps()}>{cell?.render("Cell")}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups?.map((footer) => {
          return (
            <tr {...footer?.getFooterGroupProps()}>
              {footer?.headers?.map((row) => {
                return (
                  <td {...row?.getFooterProps()}>{row?.render("Footer")}</td>
                );
              })}
            </tr>
          );
        })}
      </tfoot>
    </table>
  );
};

export default SortingTable;
