import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import JobModel from "./models/JobModel";
import MenuItem from "@mui/material/MenuItem";
import { get } from "../../../../app/api";
import { JobType } from "./models/JobType";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import SkillModel from "./models/SkillModel";
import { SkillType } from "./models/SkillType";

interface SectorType {
  id?: number;
  name: string;
}

const statusList = [
  {
    value: "OPEN",
    label: "Open",
  },
  {
    value: "CLOSED",
    label: "Closed",
  },
  {
    value: "ON HOLD",
    label: "On Hold",
  },
];

const formatDate = (fDate) => {
  const date = new Date(fDate);
  return date.toISOString().substring(0, 10);
};
const JobEdit = ({ openState, jobList, companyList, refresh }) => {
  const [open, setOpen] = openState;
  const [job, setJob] = jobList;
  const [companys, setCompanys] = companyList;
  const [formRefresh, setFormRefresh] = refresh;
  const [value, setValue] = React.useState<SkillType[] | null>(job.skills);
  const defaultValue = job.skills;
  const [sectors, setSectors] = React.useState<SectorType[] | null>([
    job.sector,
  ]);
  const [skills, setSkills] = React.useState<SkillType[] | null>(job.skills);

  const skillList = () => {
    const data = `query {
      skillList{
        id
        name     
      }
    }`;

    get(data).then((response) => {
      setSkills(
        response["data"]["skillList"].map((skill) => {
          return SkillModel({ id: Number(skill.id), name: skill.name });
        })
      );
    });
  };

  const sectorList = () => {
    const data = `query {
      sectorList{
        id
        name     
      }
    }`;

    get(data).then((response) => {
      const sectors = response["data"]["sectorList"].map((sector) => {
        return {
          id: Number(atob(sector.id).split(":")[1]),
          name: sector.name,
        };
      });
      job.sector.id = sectors[0].id;
      job.sector.name = sectors[0].name;
      setJob((job) => job);
      setSectors(sectors);
    });
  };

  React.useEffect(() => {
    skillList();
    sectorList();
  }, []);
  const jobInsert = (jobs: JobType) => {
    const data = `mutation JobCreate($id: Int, $companyId: String, $title: String, $description: String, $qualifications: String,
        $salary: Int, $location: String, $recruiter: String, $sector: Int, 
        $expiryDate: String, $status: String, $createdDate: String, $updatedDate: String, $skills: GenericScalar )
    {
      jobCreate(
        id: $id,
        companyId: $companyId,
        title: $title,
        description: $description,
        qualifications: $qualifications,
        salary: $salary,
        location: $location,
        recruiter: $recruiter,
        sector: $sector,
        expiryDate: $expiryDate,
        skills: $skills,
        status: $status,
        createdDate: $createdDate,
        updatedDate: $updatedDate
      )
      {
        job{               
            id
            title        
            description
            qualifications            
        }
      }
    }`;

    const variables = {
      id: Number(jobs.id),
      companyId: jobs.company_id,
      title: jobs.title,
      description: jobs.description,
      qualifications: jobs.qualifications,
      salary: Number(jobs.salary),
      location: jobs.location,
      recruiter: "",
      sector: Number(jobs.sector),
      expiryDate: jobs.expiry_date,
      status: jobs.status,
      createdDate: jobs.created_date,
      updatedDate: jobs.updated_date,
      skills: jobs.skills,
    };

    get(data, variables).then((response) => {
      // //const jobs = JobModel(response["data"]["jobList"]);
      // const jobs = response["data"]["jobCreate"]["jobList"].map((row) => {
      //   return JobModel(row);
      // });
      // //const rows = response["data"]["jobList"]["edges"];
      // //setRows(rows);
      // setRows(jobs);
      handleClose();
    });
  };

  const handleClose = () => {
    setOpen(false);
    setFormRefresh((formRefresh) => !formRefresh);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            let formJson = Object.fromEntries((formData as any).entries());
            formJson = {
              ...formJson,
              id: job.id,
              skills: value,
              expiry_date: new Date(formJson.expiry_date),
              updated_date: new Date(job.updated_date),
              created_date: new Date(job.created_date),
              // updated_date: formatDate(job.updated_date),
              // created_date: formatDate(job.created_date),
            };
            jobInsert(JobModel(formJson));
          },
        }}
      >
        <DialogTitle>{job.id == "0" ? "Job Create" : "Job Edit"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <InputLabel htmlFor="title">Title</InputLabel>
              <TextField
                autoFocus
                required
                margin="dense"
                id="title"
                name="title"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={job.title}
                // onChange={handleTitleChange}
              />

              <InputLabel htmlFor="qualifications">Qualifications</InputLabel>
              <TextField
                autoFocus
                required
                margin="dense"
                id="qualifications"
                name="qualifications"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                rows={7}
                defaultValue={job.qualifications}
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel htmlFor="companyId">Company</InputLabel>
              <TextField
                autoFocus
                required
                margin="dense"
                id="company_id"
                name="company_id"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={companys[0].name}
                InputProps={{
                  readOnly: true,
                }}
              />
              <InputLabel htmlFor="location">Location</InputLabel>
              <TextField
                autoFocus
                required
                margin="dense"
                id="location"
                name="location"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={job.location}
              />
              <InputLabel htmlFor="salary">Salary</InputLabel>
              <TextField
                autoFocus
                required
                margin="dense"
                id="salary"
                name="salary"
                type="number"
                fullWidth
                variant="outlined"
                defaultValue={job.salary}
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel htmlFor="sector">Sector</InputLabel>
              <TextField
                autoFocus
                select
                required
                margin="dense"
                id="sector"
                name="sector"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={job.sector.id}
              >
                {sectors &&
                  sectors.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
              </TextField>
              <InputLabel htmlFor="status">Status</InputLabel>
              <TextField
                autoFocus
                required
                select
                margin="dense"
                id="status"
                name="status"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={job.status}
              >
                {statusList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <InputLabel htmlFor="expiry-date">Expiry Date</InputLabel>
              <TextField
                autoFocus
                required
                margin="dense"
                id="expiry_date"
                name="expiry_date"
                type="date"
                fullWidth
                variant="outlined"
                // defaultValue={new Date().toISOString().substring(0, 10)}
                defaultValue={formatDate(job.expiry_date)}
              />

              {/* <Autocomplete
                value={value}
                multiple
                limitTags={2}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setValue({
                      name: newValue,
                    });
                  } else if (newValue && newValue.name) {
                    // Create a new value from the user input
                    setValue({
                      name: newValue.name,
                      id: Number(newValue.id),
                    });
                  } else {
                    setValue(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  const { inputValue } = params;
                  // Suggest the creation of a new value
                  const isExisting = options.some(
                    (option) => inputValue === option.name
                  );
                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      inputValue,
                      name: inputValue,
                      id: -1,
                    });
                  }

                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="skills"
                options={skills}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.name) {
                    return option.name;
                  }
                  // Regular option
                  return option.name;
                }}
                renderOption={(props, option) => (
                  <li {...props}>{option.name}</li>
                )}
                sx={{ marginTop: 1 }}
                freeSolo
                renderInput={(params) => <TextField {...params} />}
              /> */}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor="description">Description</InputLabel>
              <TextField
                autoFocus
                required
                margin="dense"
                id="description"
                name="description"
                type="text"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                defaultValue={job.description}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="skills">Skills</InputLabel>
              <Autocomplete
                multiple
                id="skills"
                options={skills.filter((s: SkillType) => {
                  const result = value.filter((v) => v.id == s.id);
                  return result.length == 0 ? true : false;
                })}
                sx={{ marginTop: 1 }}
                value={value}
                freeSolo
                onChange={(event, newValue) => {
                  setValue(
                    newValue.map((v) => {
                      if (typeof v === "string") return { id: -1, name: v };
                      else return v;
                    })
                  );
                }}
                // defaultValue={defaultValue}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.name) {
                    return option.name;
                  }
                  // Regular option
                  return option.name;
                }}
                renderTags={(value, getTagProps) =>
                  value.map(
                    (option, index: number) =>
                      option.id != 0 && (
                        <Chip
                          variant="outlined"
                          label={option.name}
                          {...getTagProps({ index })}
                        />
                      )
                  )
                }
                renderInput={(params) => (
                  <TextField {...params} name="skills" />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default JobEdit;
