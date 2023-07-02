import { useMemo } from "react";
import { useTable, useRowSelect } from "react-table";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import MOCK_DATA from "../mocks/MOCK_DATA.json";
import { Checkbox } from "./Checkbox";

const RowSelection = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    headerGroups,
    rows,
    getTableProps,
    prepareRow,
    getTableBodyProps,
    footerGroups,
    selectedFlatRows,
  } =
    // @ts-ignore
    useTable({ columns, data }, useRowSelect, (hooks) => {
      hooks?.visibleColumns?.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row?.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    });

  const firstPageRows = rows?.slice(0, 10);

  return (
    <>
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
          {firstPageRows?.map((row) => {
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
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows?.map((row) => row?.original),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
};

export default RowSelection;
