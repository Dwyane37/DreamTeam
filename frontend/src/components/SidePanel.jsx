import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// const panelItem = (job) => {
//   // const location = `${job.city}, ${job.state} ${props.location}`;

//   return (

//   );
// };

export default function SidePanelList({ jobs, handleClickOpen }) {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      {jobs.map((job, idx) => (
        <div key={idx}>
          <ListItem button id={job.id} onClick={handleClickOpen}>
            <ListItemText primary={job.title} secondary={job.company} />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
}
