import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../API';

import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { SessionInfo, JobBigButton, JobSmallButton } from './AddJobFormStyle';
import FieldFilter from '../component_Filter/FieldFilter';
import RegionFilter from '../component_Filter/RegionFilter';
import CitizenshipFilter from '../component_Filter/CitizenshipFilter';

import './AddJobForm.css';

export default function AddJobForm() {
  const navigate = useNavigate();
  const initFilter = {
    country: null,
    state: null,
    city: null,
    field: null,
    citizenship: [],
  };
  const [filter, setFilter] = React.useState(initFilter);
  const [openSessionEdit, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [link, setLink] = React.useState('');
  const [datetime, setDatetime] = React.useState(new Date());
  const [sessions, setSessions] = React.useState([]);
  //const [aaaa, setaaaa] = React.useState(new Date(datetime));

  const post = (e) => {
    e.preventDefault();
    apiPost('internship/add_internship', {
      title: title,
      //field: field,
      //location: location,
      //working_right: right,
      description: description,
      meeting: [{ link: link, datetime: datetime }],
    })
      .then((body) => {
        console.log(body);
        localStorage.setItem('token', body.errormessage);
        navigate('/dashboard');
      })
      .catch((e) => alert(e));
  };

  const handleChange = (newValue) => {
    setDatetime(newValue);
  };

  const createSession = () => {
    setOpen(true);
  };

  const clear = () => {
    setDatetime(new Date());
    setLink('');
  };

  const Create = () => {
    setSessions([...sessions, { datetime: datetime, link: link }]);
    clear();
    setOpen(false);
  };

  const deleteSession = (e) => {
    const idx = e.target.id;
    console.log(typeof parseInt(idx));
    setSessions([...sessions.slice(0, parseInt(idx)), ...sessions.slice(parseInt(idx) + 1)]);
  };

  const Cancel = () => {
    clear();
    setOpen(false);
  };

  // React.useEffect(() => {
  //   console.log(filter);
  // }, [filter]);

  // React.useEffect(() => {
  //   console.log(sessions);
  // }, [sessions]);
  return (
    <Box
      className="AddJobForm"
      component="form"
      onSubmit={(e) => {
        post(e);
      }}
    >
      <Box className="JobInformationForm">
        <FormControl variant="standard">
          <TextField
            label="Title:"
            variant="standard"
            id="Job_title_input"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </FormControl>
        <RegionFilter label="defineLocation" updateFilter={[filter, setFilter]} />
        <FieldFilter label="defineField" updateFilter={[filter, setFilter]} />
        <CitizenshipFilter lable="defineCitizenship" updateFilter={[filter, setFilter]} />
        <p>Job Decription</p>
        <TextareaAutosize
          minRows={6}
          maxRows={10}
          placeholder="Description"
          value={description}
          label="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Box>

      <JobBigButton variant="outlined" onClick={createSession}>
        Create an Info Session
      </JobBigButton>

      {openSessionEdit && (
        <Box className="createSession">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDateTimePicker
              label="Choose Date and Time"
              // inputFormat="MM/dd/yyyy"
              value={datetime}
              onChange={(newValue) => handleChange(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <FormControl variant="standard">
            <TextField
              label="Add a link"
              id="Job_link_input"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
          </FormControl>
          <Stack spacing={6} direction="row">
            <JobSmallButton variant="outlined" color="error" onClick={Cancel}>
              Cancel
            </JobSmallButton>
            <JobSmallButton variant="outlined" onClick={Create}>
              Create
            </JobSmallButton>
          </Stack>
        </Box>
      )}

      {sessions &&
        sessions.map((session, idx) => (
          <Box key={idx} id={idx} className="SessionInfo">
            <SessionInfo defaultValue={session.datetime} id="Job_session_time" readOnly multiline />
            <SessionInfo defaultValue={session.link} id="Job_session_link" readOnly multiline />
            <ButtonGroup variant="text" aria-label="text button group">
              <Button onClick={createSession}>Edit</Button>
              <Button id={idx} color="error" onClick={deleteSession}>
                Delete
              </Button>
            </ButtonGroup>
          </Box>
        ))}

      <Box className="PostForm">
        <JobSmallButton type="submit" variant="outlined">
          Post
        </JobSmallButton>
      </Box>
    </Box>
  );
}
