import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { apiPost } from './API';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
//import Input from '@mui/material/Input';
//import JobInformationInp from '../components/JobInformationInp';

export default function EditJobForm() {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState(0);
  const [title, setTitle] = React.useState('');
  const [field, setField] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [right, setRight] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [link, setLink] = React.useState('');
  const [datetime, setDatetime] = React.useState(new Date('2022-07-13T12:00:00'));

  const post = (e) => {
    e.preventDefault();
    apiPost('internship/add_internship', {
      title: title,
      field: field,
      location: location,
      working_right: right,
      description: description,
      meeting: [{ link: link, datetime: datetime }],
    })
      .then((body) => {
        console.log(body);
        localStorage.setItem('token', body.errormessage);
        navigate('/login');
      })
      .catch((e) => alert(e));
  };

  const JobInformationInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(2),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '35vw',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  const DescriptionInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(2.5),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '35vw',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  const AddLinkInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(2),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '15vw',
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  const SessionInfo = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(2),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      fontSize: 16,
      width: '25vw',
      transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  const JobSmallButton = styled(Button)({
    textTransform: 'none',
    width: '7vw',
  });

  const JobBigButton = styled(Button)({
    textTransform: 'none',
    width: '35vw',
    //margin: '10px',
  });

  const handleChange = (newValue) => {
    setDatetime(newValue);
  };

  const createSession = () => {
    setStatus(1);
  };

  const Create = () => {
    setStatus(2);
  };

  const Cancel = () => {
    setStatus(0);
  };

  //const ttt = (event) => {
  //  setTitle(event.target.value);
  //};

  return (
    <Box
      className="EditJobForm"
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
        <FormControl variant="standard">
          <TextField
            label="Field:"
            variant="standard"
            id="Job_field_input"
            value={field}
            onChange={(e) => {
              setField(e.target.value);
            }}
          />
        </FormControl>
        <FormControl variant="standard">
          <TextField
            label="Location:"
            variant="standard"
            id="Job_location_input"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel shrink htmlFor="Job_right_input">
            Working right:
          </InputLabel>
          <Select
            id="Job_right_input"
            value={right}
            onChange={(e) => {
              setRight(e.target.value);
            }}
          >
            <MenuItem value={'international student'}>International student</MenuItem>
            <MenuItem value={'PR'}>PR</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard">
          <TextField
            label="Description:"
            variant="standard"
            id="Job_description_input"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            multiline
            rows={3}
          />
        </FormControl>
      </Box>
      {status === 0 && (
        <JobBigButton variant="outlined" onClick={createSession}>
          Create an Info Session
        </JobBigButton>
      )}
      {status === 2 && (
        <Box className="SessionInfo">
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="Job_session_time"></InputLabel>
            <SessionInfo defaultValue={datetime} id="Job_session_time" readOnly multiline />
            <SessionInfo defaultValue={link} id="Job_session_link" readOnly multiline />
          </FormControl>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button onClick={createSession}>Edit</Button>
            <Button color="error" onClick={Cancel}>
              Delete
            </Button>
          </ButtonGroup>
        </Box>
      )}
      {status === 1 && (
        <>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDateTimePicker
              label="Choose date"
              inputFormat="MM/dd/yyyy"
              value={datetime}
              onChange={handleChange}
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
        </>
      )}
      {status !== 1 && (
        <Box className="PostForm">
          <JobSmallButton type="submit" variant="outlined">
            Post
          </JobSmallButton>
        </Box>
      )}
    </Box>
  );
}
