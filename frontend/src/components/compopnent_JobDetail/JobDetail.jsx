import React from 'react';
import Typography from '@mui/material/Typography';
import './JobDetail.css';
import { Avatar, Button, Divider, Grid, Paper } from '@mui/material';
import Comments from '../comments/Comments';
import { citizenship } from '../assets';
import { apiGet } from '../API';
import { useNavigate } from 'react-router-dom';

export default function JobDetail(props) {
  // const job = props.job;
  const jobId = props.jobId;
  const [job, setJob] = React.useState(null);
  const [meetings, setMeetings] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    apiGet('internship/getinternship', { id: jobId }).then((res) => {
      setJob(res.internship[0]);
      setMeetings(res.meetings);
    });
  }, []);

  const handleProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleSave = (e) => {
    // TODO Save the job
    e.stopPropagation();
    apiGet('/internship/save', {
      token: sessionStorage.getItem('token'),
      internship: job.id,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => alert(e));
  };
  return (
    job && (
      <div className="dialog-page">
        <Paper style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column' }}>
          <Typography component="h3" variant="h5" align="center">
            {job.title}
          </Typography>
          <div className="job-detail-element">
            <Typography variant="subtitle1" color="text.secondary">
              Location
            </Typography>
            <Typography variant="body1"> {` ${job.city}, ${job.state} ${job.location}`}</Typography>
          </div>
          <div className="job-detail-element">
            <Typography variant="subtitle1" color="text.secondary">
              Company
            </Typography>
            <Typography variant="body1">{job.company}</Typography>
          </div>
          <div className="job-detail-element">
            <Typography variant="subtitle1" color="text.secondary">
              Field
            </Typography>
            <Typography variant="body1">{job.field}</Typography>
          </div>
          <div className="job-detail-element">
            <Typography variant="subtitle1" color="text.secondary">
              Citizenship Requirements
            </Typography>
            <ul className="job-citizenship">
              {job.working_right
                .toString()
                .split('')
                .map((item, idx) => (
                  <li key={idx}>{citizenship[item - 1]?.label}</li>
                ))}
            </ul>
          </div>
          <div className="job-detail-element">
            <Typography variant="subtitle1" color="text.secondary">
              Posted by:
            </Typography>
            <div className="author" onClick={() => handleProfile(job.user_id)}>
              <Avatar className="avatar" alt="profile image" src={job.thumbnail} sx={{ width: 56, height: 56 }} />
              <Typography className="jobAuthor" variant="body1">
                {job.name}
              </Typography>
            </div>
          </div>
          <div className="job-detail-element">
            <Typography variant="subtitle1" color="text.secondary">
              Information Sessions
            </Typography>
            {meetings?.map((meeting, idx) => {
              const date = new Date(meeting.datetime);
              console.log(date.getTime());
              return (
                <div key={idx}>
                  <span className="session-date">{date.toDateString()}</span>
                  <span className="session-time">{`${date.getHours()}:${date.getMinutes()}`}:</span>
                  <span className="session-link">{meeting.link}</span>
                </div>
              );
            })}
          </div>
          <div className="job-detail-element">
            <Typography variant="subtitle1" color="text.secondary">
              Job Description
            </Typography>
            <Typography variant="body1">{job.description}</Typography>
          </div>
          <div className="job-detail-element">
            <Typography variant="subtitle1" color="text.secondary">
              Apply Method
            </Typography>
            <Typography variant="body1">{job.applychannel}</Typography>
          </div>
          {sessionStorage.getItem('type') === '0' && (
            <div className="buttons">
              {/* <Button variant="contained" color="success" onClick={handleApply}>
              Apply
            </Button> */}

              <Button variant="contained" color="info" onClick={handleSave}>
                Save
              </Button>
            </div>
          )}
        </Paper>

        <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
        {/* <FAQ data={faqSample} />
      <Divider variant="fullWidth" style={{ margin: '30px 0' }} /> */}
        <Comments internshipId={props.job.id} currentUserId={sessionStorage.getItem('id')} />
      </div>
    )
  );
}
