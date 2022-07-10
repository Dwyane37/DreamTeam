import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
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
        <Typography variant="body2">{props.briefing}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleEdit}>
          Edit
        </Button>
        <DeleteIcon sx={{ color: '#A40606' }} onClick={handleDelete} />
      </CardActions>
    </Card>
  );
}
