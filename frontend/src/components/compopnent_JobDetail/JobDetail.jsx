import React from 'react';
import Typography from '@mui/material/Typography';
import './JobDetail.css';
import { Button, Divider, Grid, Paper } from '@mui/material';
import Comments from '../comments/Comments';
import { citizenship, faqSample } from '../assets';
import FAQ from './FAQ';
import { apiGet } from '../API';

export default function JobDetail(props) {
  const job = props.job;

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
                <li key={idx}>{citizenship[item - 1].label}</li>
              ))}
          </ul>
        </div>
        <div className="job-detail-element">
          <Typography variant="subtitle1" color="text.secondary">
            Posted by:
          </Typography>
          <Typography className="jobAuthor" variant="body1">
            James Smith
          </Typography>
        </div>
        <div className="job-detail-element">
          <Typography variant="subtitle1" color="text.secondary">
            Information Sessions
          </Typography>
          {job.meetings?.map((meeting, idx) => (
            <div key={idx}>
              <span className="session-date">{meeting.date}</span>
              <span className="session-time">{meeting.time}:</span>
              <span className="session-link">{meeting.link}</span>
            </div>
          ))}
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
  );
}
