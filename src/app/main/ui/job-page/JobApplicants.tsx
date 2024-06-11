import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { get } from "../../../../app/api";

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
  "Name",
  "Email",
  "Phone",
  "Qualifications",
  "Experience",
  "CV Link",
  "Action",
];
const JobApplicants = ({ openState, applicants, refresh }) => {
  const [open, setOpen] = openState;
  const [formRefresh, setFormRefresh] = refresh;
  const handleClose = () => {
    setOpen(false);
    setFormRefresh((formRefresh) => !formRefresh);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
          },
        }}
      >
        <DialogTitle>Applicants</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="customized table">
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
                {applicants.map((applicant, index) => (
                  <StyledTableRow key={applicant.id}>
                    <StyledTableCell align="center">
                      {applicant.seekerId.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {applicant.seekerId.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {applicant.seekerId.phoneNumber}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {applicant.qualifications}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {applicant.experience}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {applicant.cvlink}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton
                        onClick={() => {}}
                        aria-label="delete"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {}}
                        aria-label="edit"
                        color="success"
                      >
                        <EditIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="success" variant="contained">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default JobApplicants;
