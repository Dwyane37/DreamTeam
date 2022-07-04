import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
export default function JobCard() {
  const handleApply = (e) => {
    // TODO Apply for the job
    e.stopPropagation();
    console.log('apply');
  };

  const handleSave = (e) => {
    // TODO Save the job
    e.stopPropagation();
    console.log('save');
  };

  const viewMore = () => {
    // TODO view more details about the job
    console.log('view more');
  };

  return (
    <Card variant="outlined" sx={{ minWidth: 275, width: '50vw' }} onClick={viewMore}>
      <CardContent>
        <Typography variant="h5" component="div">
          Job Title
        </Typography>
        <Typography sx={{ mb: 1.5 }}>Company</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Job Location
        </Typography>
        <Typography variant="body2">Job Briefing</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleApply}>
          Apply
        </Button>
        <div>
          <BookmarkAddOutlinedIcon onClick={handleSave} />
          {/* <Button size="small" onClick={handleSave}>
            Save
          </Button> */}
        </div>
      </CardActions>
    </Card>
  );
}
