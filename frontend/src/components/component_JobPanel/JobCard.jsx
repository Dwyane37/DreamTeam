import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { apiGet } from '../API';

import './JobCard.css';

export default function JobCard(props) {
  const [save, setSave] = React.useState(false);

  const handleApply = (e) => {
    // TODO Apply for the job
    e.stopPropagation();
    console.log('apply');
    props.socket?.emit('applyJob', {
      senderName: sessionStorage.getItem('id'),
      receiverName: '91272343673357427676270600691321',
      jobID: 123,
    });
  };

  const handleSave = (e) => {
    // TODO Save the job
    e.stopPropagation();
    const jobId = e.currentTarget.parentNode.parentNode.id;
    if (!save) {
      // haven't saved it yet
      apiGet('/internship/save', { token: sessionStorage.getItem('token'), internship: jobId })
        .then((data) => {
          console.log(data);
        })
        .catch((e) => alert(e));
      setSave(true);
    }
  };

  const location = `${props.location.city}, ${props.location.state} ${props.location.country}`;

  return (
    <Card id={props.jobID} className="job-card" variant="outlined" onClick={props.hanldeClickOpen}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{props.company}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {location}
        </Typography>
        <Typography paragraph={true} noWrap={true}>
          {props.briefing}
        </Typography>
      </CardContent>
      <CardActions className="job-card-action">
        <Button size="small" onClick={handleApply}>
          Apply
        </Button>
        <div onClick={handleSave}>
          {!save && <BookmarkAddOutlinedIcon className="BookmarkIcon" />}
          {save && <BookmarkAddedIcon className="BookmarkIcon" />}
        </div>
      </CardActions>
    </Card>
  );
}
