import React, { Component } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { get } from "../../../../app/api";

const JobDelete = ({ openState, rowId, refresh }) => {
  const [open, setOpen] = openState;
  const [formRefresh, setFormRefresh] = refresh;

  const handleDelete = () => {
    const data = `
        mutation JobDelete($jobId: Int)
        {
            jobDelete(
            jobId: $jobId
            )
            {
            ok
            }      
        }`;
    get(data, { jobId: rowId }).then((response) => {
      setFormRefresh((formRefresh) => !formRefresh);
    });

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Job Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JobDelete;
