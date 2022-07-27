import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

import './SimpleJobCard.css';

export default function SimpleJobCard(props) {
  const location = `${props.location.city}, ${props.location.state} ${props.location.country}`;

  return (
    <Paper id={props.jobID} onClick={props.hanldeClickOpen}>
      <CardContent>
        <Typography variant="h8" component="div">
          {props.title}
        </Typography>
        <Typography className="simple-card-subtext">{props.company}</Typography>
        <Typography className="simple-card-subtext" color="text.secondary">
          {location}
        </Typography>
      </CardContent>
    </Paper>
  );
}
