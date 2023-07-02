import { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import MOCK_DATA from "../mocks/MOCK_DATA.json";

const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    getTableProps,
    prepareRow,
    getTableBodyProps,
  } =
    // @ts-ignore
    useTable({ columns, data, initialState: { pageIndex: 2 } }, usePagination);

  // @ts-ignore
  const { pageIndex, pageSize } = state;

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
          {page?.map((row) => {
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
      </table>
      <div>
        <span>
          Page <strong>{`${pageIndex + 1} of ${pageOptions?.length} `}</strong>
        </span>
        <span>
          | Go to Page:
          <input
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e?.target?.value ? Number(e.target.value) : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e?.target?.value))}
        >
          {[10, 15, 20, 25].map((size) => {
            return (
              <option key={size} value={size}>
                Show {size}
              </option>
            );
          })}
        </select>
        <button disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
          {"<<"}
        </button>
        <button disabled={!canPreviousPage} onClick={() => previousPage()}>
          Previous
        </button>
        <button disabled={!canNextPage} onClick={() => nextPage()}>
          Next
        </button>
        <button disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>
          {">>"}
        </button>
      </div>
    </>
  );
};

export default PaginationTable;
