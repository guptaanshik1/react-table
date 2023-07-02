import { useMemo } from "react";
import { useTable, useColumnOrder } from "react-table";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import MOCK_DATA from "../mocks/MOCK_DATA.json";

const ColumnOrder = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    headerGroups,
    rows,
    getTableProps,
    prepareRow,
    getTableBodyProps,
    footerGroups,
    setColumnOrder,
  } =
    // @ts-ignore
    useTable({ columns, data }, useColumnOrder);

  const changeColumnOrder = () => {
    setColumnOrder([]); // pass ids of columns here
  };

  return (
    <>
      <button onClick={changeColumnOrder}>Change Column Order</button>
      <table {...getTableProps()}>
        <thead>
          {headerGroups?.map((header) => {
            return (
              <tr {...header?.getHeaderGroupProps()}>
                {header?.headers?.map((column) => {
                  return (
                    <th {...column?.getHeaderProps()}>
                      {column?.render("Header")}
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
    </>
  );
};

export default ColumnOrder;
