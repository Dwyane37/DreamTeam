import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import './MyJob.css';
import { IconButton } from '@mui/material';

export default function MyJobCard(props) {
  const handleEdit = (e) => {
    console.log('edit');
  };

  const handleDelete = (e) => {
    console.log('delete');
  };

  const location = `${props.location.city}, ${props.location.state} ${props.location.country}`;

  return (
    <Card variant="outlined">
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
      <CardActions className="myjob-card-action">
        <Button size="small" variant="outlined" onClick={handleEdit}>
          Edit
        </Button>

        <Button className="delete-button-text" size="small" color="error" variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
