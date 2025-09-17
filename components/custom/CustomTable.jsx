"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function CustomTable({ columns, rows, className }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Fixed rows per page

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const paginatedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className={cn(
        "border border-gray-400 rounded-xl p-3 overflow-hidden",
        className
      )}
    >
      <div className="rounded-xl shadow-sm overflow-x-auto">
        <Table className="min-w-full">
          {/* Header */}
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50 transition-colors">
              {columns.map((col, index) => (
                <TableHead
                  key={col.key}
                  className={cn(
                    "text-left py-4 border-b-0 text-[16px] font-semibold text-black",
                    index === 0 && "rounded-tl-xl rounded-bl-xl",
                    index === columns.length - 1 &&
                      "rounded-tr-xl rounded-br-xl"
                  )}
                >
                  {col.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Gap */}
          <tbody>
            <tr>
              <td colSpan={columns.length} className="h-3"></td>
            </tr>
          </tbody>

          {/* Body */}
          <TableBody className="bg-white">
            {paginatedRows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="hover:bg-gray-50 transition-colors"
              >
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={col.key}
                    className={`
                      text-left text-gray-900
                      ${rowIndex === 0 && colIndex === 0 ? "rounded-tl-xl" : ""}
                      ${
                        rowIndex === 0 && colIndex === columns.length - 1
                          ? "rounded-tr-xl"
                          : ""
                      }
                      ${
                        rowIndex === paginatedRows.length - 1 && colIndex === 0
                          ? "rounded-bl-xl"
                          : ""
                      }
                      ${
                        rowIndex === paginatedRows.length - 1 &&
                        colIndex === columns.length - 1
                          ? "rounded-br-xl"
                          : ""
                      }
                    `}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Simple Pagination */}
      <div className="flex justify-end items-center space-x-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={cn(
              "px-4 py-1 rounded",
              currentPage === page ? "bg-gray-500 text-white" : "bg-gray-200"
            )}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
