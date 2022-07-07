import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import './RecommenderCard.css';

export default function RecommenderCard(props) {
  const viewMore = () => {
    // TODO view more details about the job
    console.log('view more');
  };

  const location = `${props.location.city}, ${props.location.state} ${props.location.country}`;

  return (
    <Card variant="outlined" className="recommender-card" onClick={viewMore}>
      <CardContent>
        <Typography variant="h8" component="div">
          {props.title}
        </Typography>
        <Typography className="recommender-card-subtext">{props.company}</Typography>
        <Typography className="recommender-card-subtext" color="text.secondary">
          {location}
        </Typography>
      </CardContent>
    </Card>
  );
}
