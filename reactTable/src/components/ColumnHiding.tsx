import { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import MOCK_DATA from "../mocks/MOCK_DATA.json";
import { Checkbox } from "./Checkbox";

const ColumnHiding = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    headerGroups,
    rows,
    getTableProps,
    prepareRow,
    getTableBodyProps,
    footerGroups,
    allColumns,
    getToggleHideAllColumnsProps,
  } =
    // @ts-ignore
    useTable({ columns, data });

  return (
    <>
      <div>
        <div>
          <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
        </div>
        {allColumns?.map((column) => {
          return (
            <div key={column.id}>
              <label>
                <input type="checkbox" {...column.getToggleHiddenProps()} />
                {column.Header}
              </label>
            </div>
          );
        })}
      </div>
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

export default ColumnHiding;
