import DemoContent from "@fuse/core/DemoContent";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import JobTable from "./JobTable";
import { get } from "../../../../app/api";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import JobEdit from "./JobEdit";
import JobModel from "./models/JobModel";
import { JobType } from "./models/JobType";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));

function Job() {
  const [formRefresh, setFormRefresh] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [applicants, setApplicats] = useState({
    applicantList: [
      {
        id: 0,
        name: "",
        email: "",
        phone: "",
        qualifications: "",
        experience: "",
        cvlink: "",
        job: {
          id: 0,
        },
      },
    ],
    seekerList: [
      {
        id: 0,
        name: "",
        email: "",
        phoneNumber: "",
        cvPdfLink: "",
      },
    ],
  });
  const [companys, setCompanys] = useState([
    {
      id: 0,
      name: "",
    },
  ]);

  const [sectors, setSectors] = useState([
    {
      id: 0,
      name: "",
    },
  ]);

  const [rows, setRows] = useState([
    JobModel({
      id: 0,
      title: "",
      description: "",
      qualifications: "",
      salary: 0,
      sector: {
        id: 0,
        name: "",
      },
      skills: [
        {
          id: 0,
          name: "",
        },
      ],
    }),
  ]);
  const [jobs, setJobs] = useState<JobType>(
    JobModel({
      id: 0,
      title: "",
      description: "",
      qualifications: "",
      salary: 0,
      sector: {
        id: 0,
        name: "",
      },
    })
  );

  const jobList = () => {
    const data = `query {
      jobList{
          companyId{
              id
              name
          }        
          id
          title        
          description
          qualifications
          salary
          location
          recruiter{
              id
              name
          }
          sector{
            id
            name
          }
          expiry_date:expiryDate
          skills{
              id
              name
          }
          status
          created_date:createdDate
          updated_date:updatedDate        
      }
      applicantList{
        id
        cvLink
        qualifications
        experience  
        seekerId{
            id
            name
            email
            phoneNumber
        }      
        job{
            id    
            skills{
                name
            }              
        }        
      }
      seekerList{
        name
        email
        phoneNumber
        cvPdfLink
      }
      companyList{
        id
        name
      }
      sectorList{
        id
        name
      }
    }`;

    get(data).then((response) => {
      const jobs = response["data"]["jobList"].map((row) => {
        row.id = Number(atob(row.id).split(":")[1]);
        row.sector =
          row.sector != null
            ? {
                id: Number(atob(row.sector.id).split(":")[1]),
                name: row.sector.name,
              }
            : { id: 0, name: "" };
        row.skills = row.skills.map((s) => {
          return { id: Number(s.id), name: s.name };
        });
        return JobModel(row);
      });

      const applicants = response["data"]["applicantList"];
      // const applicants = response["data"]["applicantList"].map((applicant) => {
      //   console.log("applicant.job.id:: ", applicant.job.id);
      //   applicant.job.id = Number(atob(applicant.job.id).split(":")[1]);
      //   return applicant;
      // });
      const seekers = response["data"]["seekerList"];
      const companyList = response["data"]["companyList"];
      const sectorList = response["data"]["sectorList"];
      setRows(jobs);
      setCompanys(companyList);
      setApplicats({
        applicantList: applicants,
        seekerList: seekers,
      });
    });
  };
  useEffect(() => {
    jobList();
  }, [formRefresh]);

  const handleRefresh = () => {
    jobList();
  };
  const handleOpenEditForm = () => {
    setEditForm(true);
  };
  const { t } = useTranslation("jobPage");
  return (
    <Root
      header={
        <div className="p-24">
          <div
            className="flex flex-col sm:flex-row item-center sm:items-start   h-48 sm:p-10 w-full flex items-center justify-between"
            style={{ width: "100%" }}
          >
            <Box
              component="div"
              sx={{ display: "inline", flexDirection: "row" }}
            >
              <h4>{t("TITLE")}</h4>
            </Box>
            <Box
              component="div"
              sx={{ display: "inline", flexDirection: "row" }}
            >
              <Button
                className="mx-8 -top-30 whitespace-nowrap "
                variant="contained"
                size="small"
                color="info"
                onClick={(e) => {
                  handleRefresh();
                  //dispatch(setRefresh(new Date()));
                }}
                title="Refresh"
              >
                <FuseSvgIcon size={20}>heroicons-outline:refresh</FuseSvgIcon>
              </Button>
              <Button
                className="mx-8 -top-30  whitespace-nowrap"
                variant="contained"
                color="secondary"
                onClick={(e) => {
                  handleOpenEditForm();
                }}
                size="small"
                title="Add Job"
              >
                <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
                {/* <span className="mx-8">user</span> */}
              </Button>
            </Box>
          </div>
        </div>
      }
      content={
        <div className="p-24">
          <h4>Jobs</h4>
          <br />
          <JobTable
            rows={rows}
            refresh={[formRefresh, setFormRefresh]}
            applicants={applicants}
            companys={[companys, setCompanys]}
          />
          {editForm && (
            <JobEdit
              openState={[editForm, setEditForm]}
              jobList={[jobs, setJobs]}
              companyList={[companys, setCompanys]}
              refresh={[formRefresh, setFormRefresh]}
            />
          )}
        </div>
      }
    />
  );
}

export default Job;
