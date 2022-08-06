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
  const [company, setCompany] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [application, setApplication] = React.useState('');
  const [link, setLink] = React.useState('');
  const [datetime, setDatetime] = React.useState(new Date());
  const [sessions, setSessions] = React.useState([]);
  const [editItemIdx, setEditItemIdx] = React.useState(null);
  //const [aaaa, setaaaa] = React.useState(new Date(datetime));

  const processCitizenshipArray = (arr) => {
    if (arr) {
      const ids = arr.map((item) => item.id);
      ids.sort();
      return ids.join('');
    }
    return '';
  };

  const post = (e) => {
    e.preventDefault();
    const right = processCitizenshipArray(filter.citizenship);
    const attr = {
      id: sessionStorage.getItem('id'),
      title: title,
      location: filter.country?.name || '', //e.g. "Australie"
      state: filter.state?.name || '', // e.g. "New Southe Wales"
      city: filter.city?.name || '', // e.g. Sydney
      field: filter.field?.label || '', //e.g. Science
      working_right: right || '0', //e.g. 125, each digit represent a working_right item, 1:first item, 2:second item, 5:fifth item
      description: description, //e.g. text text text
      application: application,
      meeting: sessions, //e.g. [{datetime: string, link: string }, {datetime: string , link: string }]
    };
    console.log(attr);

    apiPost('internship/add_internship', attr)
      .then((body) => {
        console.log(body);
      })
      .catch((e) => alert(e));
  };

  const handleChange = (newValue) => {
    setDatetime(newValue);
  };

  const createSession = () => {
    setOpen(true);
  };

  const editSession = (e) => {
    setEditItemIdx(e.target.parentNode.id);
    let session = sessions[e.target.parentNode.id];
    console.log(session);
    setDatetime(session.datetime);
    setLink(session.link);
    setOpen(true);
  };

  const clear = () => {
    setDatetime(new Date());
    setLink('');
  };

  const Create = () => {
    if (!editItemIdx) {
      setSessions([...sessions, { datetime: datetime.toISOString(), link: link }]);
    } else {
      let newSessions = [...sessions];
      newSessions[editItemIdx].datetime = datetime;
      newSessions[editItemIdx].link = link;
      setSessions(newSessions);
    }
    clear();
    setOpen(false);
  };

  const deleteSession = (e) => {
    const idx = e.target.parentNode.id;
    console.log(typeof parseInt(idx));
    setSessions([...sessions.slice(0, parseInt(idx)), ...sessions.slice(parseInt(idx) + 1)]);
  };

  const Cancel = () => {
    if (editItemIdx) {
      setEditItemIdx(null);
    }
    clear();
    setOpen(false);
  };

  // React.useEffect(() => {
  //   console.log(filter);
  // }, [filter]);
  // React.useEffect(() => {
  //   console.log(link);
  // }, [link]);

  React.useEffect(() => {
    console.log(sessions);
  }, [sessions]);
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
          <TextField
            label="Company:"
            variant="standard"
            id="Job_company_input"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
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
          style={{ background: '#ebf4f9' }}
        />
        <p>Apply Method</p>
        <TextareaAutosize
          minRows={3}
          maxRows={5}
          placeholder="Apply method, e.g. email or link"
          value={application}
          label="Apply Method"
          onChange={(e) => {
            setApplication(e.target.value);
          }}
          style={{ background: '#ebf4f9' }}
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
              {editItemIdx ? 'Save' : 'Create'}
            </JobSmallButton>
          </Stack>
        </Box>
      )}

      {sessions &&
        sessions.map((session, idx) => (
          <Box key={idx} id={idx} className="SessionInfo">
            <SessionInfo value={session.datetime} id="Job_session_time" readOnly multiline />
            <SessionInfo value={session.link} id="Job_session_link" readOnly multiline />
            <ButtonGroup id={idx} variant="text" aria-label="text button group">
              <Button onClick={editSession}>Edit</Button>
              <Button color="error" onClick={deleteSession}>
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
