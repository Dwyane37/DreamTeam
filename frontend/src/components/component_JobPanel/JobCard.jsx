import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

import './JobCard.css';

export default function JobCard(props) {
  const [save, setSave] = React.useState(false);

  const handleApply = (e) => {
    // TODO Apply for the job
    e.stopPropagation();
    console.log('apply');
  };

  const handleSave = (e) => {
    // TODO Save the job
    e.stopPropagation();
    setSave(!save);
  };

  // const viewMore = (e) => {
  //   // TODO view more details about the job
  //   console.log('view more');
  //   console.log(e.currentTarget.id);
  // };

  const location = `${props.location.city}, ${props.location.state} ${props.location.country}`;

  return (
    <Card id={props.jobID} variant="outlined" className="job-card" onClick={props.hanldeClickOpen}>
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
        <div>
          {!save && <BookmarkAddOutlinedIcon className="BookmarkIcon" onClick={handleSave} />}
          {save && <BookmarkAddedIcon className="BookmarkIcon" onClick={handleSave} />}
        </div>
      </CardActions>
    </Card>
  );
}
