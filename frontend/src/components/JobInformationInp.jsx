import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export default function JobInformationInp() {
  const [title, setTitle] = React.useState('');
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
        transition: theme.transitions.create([
          'border-color',
          'background-color',
          'box-shadow',
        ]),
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
  
    return (
        <JobInformationInput id="Job_title_input" value={title} onChange={(e) => {setTitle(e.target.value);}} />
    );
  }