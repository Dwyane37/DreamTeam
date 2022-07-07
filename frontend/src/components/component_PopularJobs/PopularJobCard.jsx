import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function PopularJobCard(props) {
  const viewMore = () => {
    // TODO view more details about the job
    console.log('view more');
  };

  const location = `${props.location.city}, ${props.location.state} ${props.location.country}`;

  return (
    <Card variant="outlined" onClick={viewMore}>
      <CardContent>
        <Typography variant="h8" component="div">
          {props.title}
        </Typography>
        <Typography>{props.company}</Typography>
        <Typography color="text.secondary">{location}</Typography>
      </CardContent>
    </Card>
  );
}
