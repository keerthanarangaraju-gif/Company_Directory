import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    Paper,
} from "@mui/material";

import Companies from "../data/companies.json";
import { blue, red } from "@mui/material/colors";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${theme.tableCellClasses?.head || "MuiTableCell-head"}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${theme.tableCellClasses?.body || "MuiTableCell-body"}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function CompanyTables({ searchValue }) {
    const [sortField, setSortField] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    const search = searchValue?.toLowerCase() || "";

    // search filter
    const filteredCompanies = Companies.filter((company) =>
        Object.values(company).some((value) =>
            String(value).toLowerCase().includes(search)
        )
    );

    // sort handler
    const handleSort = (field) => {
        const isAsc = sortField === field && sortOrder === "asc";
        setSortOrder(isAsc ? "desc" : "asc");
        setSortField(field);
    };

    const sortedCompanies = [...filteredCompanies].sort((a, b) => {
        const aValue = String(a[sortField]).toLowerCase();
        const bValue = String(b[sortField]).toLowerCase();
        return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
    });

    // pagination
    const paginatedCompanies = sortedCompanies.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Paper>
            <TableContainer sx={{ maxWidth: "100%" }}>
                <Table sx={{ minWidth: 700 }}>


                    <TableHead
                        sx={{
                            backgroundColor: "#003366",  // header color
                            "& .MuiTableCell-head": {
                                color: "white",
                                fontWeight: "bold",
                            },
                            "& .MuiTableSortLabel-root": {
                                color: "white !important",
                            },
                            "& .MuiTableSortLabel-icon": {
                                color: "white !important",
                                opacity: 1,
                            },
                        }}
                    >
                        <TableRow sx={{ maxWidth: "100%" }}>
                            <StyledTableCell>
                                <TableSortLabel
                                    active={sortField === "name"}
                                    direction={sortOrder}
                                    onClick={() => handleSort("name")}
                                    sx={{
                                        color: "white",
                                        "& .MuiTableSortLabel-icon": {
                                            opacity: 1,
                                            color: "white",
                                        },
                                    }}
                                >
                                    Company Name
                                </TableSortLabel>

                            </StyledTableCell>

                            <StyledTableCell>
                                <TableSortLabel
                                    active={sortField === "company_identification_number"}
                                    direction={sortOrder}
                                    onClick={() => handleSort("company_identification_number")}
                                    sx={{
                                        color: "white",
                                        '& .MuiTableSortLabel-icon': {
                                            color: "white !important"
                                        }
                                    }}
                                >
                                    CIN
                                </TableSortLabel>
                            </StyledTableCell>

                            <StyledTableCell>
                                <TableSortLabel
                                    active={sortField === "registered_date"}
                                    direction={sortOrder}
                                    onClick={() => handleSort("registered_date")}
                                    sx={{
                                        color: "white",
                                        '& .MuiTableSortLabel-icon': {
                                            color: "white !important"
                                        }
                                    }}
                                >
                                    Registered Date
                                </TableSortLabel>
                            </StyledTableCell>

                            <StyledTableCell>
                                <TableSortLabel
                                    active={sortField === "status"}
                                    direction={sortOrder}
                                    onClick={() => handleSort("status")}
                                    sx={{
                                        color: "white",
                                        '& .MuiTableSortLabel-icon': {
                                            color: "white !important"
                                        }
                                    }}
                                >
                                    Status
                                </TableSortLabel>
                            </StyledTableCell>

                            <StyledTableCell>
                                <TableSortLabel
                                    active={sortField === "state"}
                                    direction={sortOrder}
                                    onClick={() => handleSort("state")}
                                    sx={{
                                        color: "white",
                                        '& .MuiTableSortLabel-icon': {
                                            color: "white !important"
                                        }
                                    }}
                                >
                                    State
                                </TableSortLabel>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedCompanies.map((company, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{company.name}</StyledTableCell>
                                <StyledTableCell>{company.company_identification_number}</StyledTableCell>
                                <StyledTableCell>{company.registered_date}</StyledTableCell>
                                <StyledTableCell>{company.status}</StyledTableCell>
                                <StyledTableCell>{company.state}</StyledTableCell>
                            </StyledTableRow>
                        ))}

                        {paginatedCompanies.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} style={{ textAlign: "center", padding: 40 }}>
                                    <strong>No matching companies found</strong>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={sortedCompanies.length}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
                rowsPerPageOptions={[10, 20, 30]}
            />
        </Paper>
    );
}
