import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import './SimpleJobCard.css';

export default function SimpleJobCard(props) {
  const viewMore = () => {
    // TODO view more details about the job
    console.log('view more');
  };

  const location = `${props.location.city}, ${props.location.state} ${props.location.country}`;

  return (
    <Card variant="outlined" className="simple-job-card" onClick={viewMore}>
      <CardContent>
        <Typography variant="h8" component="div">
          {props.title}
        </Typography>
        <Typography className="simple-card-subtext">{props.company}</Typography>
        <Typography className="simple-card-subtext" color="text.secondary">
          {location}
        </Typography>
      </CardContent>
    </Card>
  );
}
