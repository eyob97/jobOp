import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import JobDelete from "./JobDelete";
import { JobType } from "./models/JobType";
import JobEdit from "./JobEdit";
import Button from "@mui/material/Button";
import JobApplicants from "./JobApplicants";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const tableTitle = [
  "Title",
  "Category",
  "Location",
  "Salary",
  "Expiry Date",
  "Applicants",
  "Action",
];

const JobTable = ({ rows, refresh, applicants, companys }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [rowId, setRowId] = useState(0);
  const [formRefresh, setFormRefresh] = refresh;
  const [row, setRow] = useState<JobType>(null);
  const [editForm, setEditForm] = useState(false);
  const [openApplicants, setOpenApplicants] = useState(false);
  const handleDelete = (rowId) => {
    setRowId(rowId);
    setOpenDelete(true);
  };
  const handleEdit = (row: JobType) => {
    setRow(row);
    setEditForm(true);
  };
  const applicantCount = (id) => {
    let count = 0;
    applicants.applicantList.map((applicant) => {
      if (applicant.job.id == id) count++;
    });
    return count;
  };

  const handleApplicants = (row) => {
    setRowId(row);
    setOpenApplicants(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {tableTitle.map((col, id) => (
                <StyledTableCell align="center" key={id}>
                  {col}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(
              (row) =>
                row.id != 0 && (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.title}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.category}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.location}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.salary}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.expiry_date}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApplicants(row.id)}
                      >
                        {applicantCount(row.id)}
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton
                        onClick={() => {
                          handleDelete(row.id);
                        }}
                        aria-label="delete"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleEdit(row);
                        }}
                        aria-label="edit"
                        color="success"
                      >
                        <EditIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {openDelete && (
        <JobDelete
          openState={[openDelete, setOpenDelete]}
          rowId={rowId}
          refresh={[formRefresh, setFormRefresh]}
        />
      )}
      {editForm && (
        <JobEdit
          openState={[editForm, setEditForm]}
          jobList={[row, setRow]}
          refresh={[formRefresh, setFormRefresh]}
          companyList={companys}
        />
      )}
      {openApplicants && (
        <JobApplicants
          openState={[openApplicants, setOpenApplicants]}
          applicants={applicants.applicantList.filter(
            (app) => app.job.id == rowId
          )}
          refresh={[formRefresh, setFormRefresh]}
        />
      )}
    </>
  );
};
export default JobTable;
