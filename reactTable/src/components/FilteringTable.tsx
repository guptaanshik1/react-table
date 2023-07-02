import { useMemo } from "react";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import MOCK_DATA from "../mocks/MOCK_DATA.json";
import GlobalFilter from "./GlobalFilter";

const FilteringTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    headerGroups,
    rows,
    getTableProps,
    prepareRow,
    getTableBodyProps,
    footerGroups,
    state,
    // @ts-ignore
    setGlobalFilter,
  } =
    // @ts-ignore
    useTable({ columns, data }, useFilters, useGlobalFilter);

  // @ts-ignore
  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups?.map((header) => {
            return (
              <tr {...header?.getHeaderGroupProps()}>
                {header?.headers?.map((column) => {
                  return (
                    <th {...column?.getHeaderProps()}>
                      {column?.render("Header")}
                      <div>
                        {
                          // @ts-ignore
                          column?.canFilter ? column?.render("Filter") : null
                        }
                      </div>
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

export default FilteringTable;
