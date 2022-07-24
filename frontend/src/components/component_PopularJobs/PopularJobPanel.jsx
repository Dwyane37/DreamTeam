import * as React from 'react';
import SimpleJobCard from '../component_SimpleJobCard/SimpleJobCard';
import { apiGet } from '../API';
import { jobs } from '../assets';
import './PopularJobPanel.css';
export default function PopularJobPanel(props) {
  return (
    <div className="popular-panel">
      <div>Popular Internships</div>
      {jobs.map((job, idx) => (
        <SimpleJobCard
          key={idx}
          title={job.title}
          company={job.company}
          location={job.region}
          hanldeClickOpen={props.openDialog}
        />
      ))}
    </div>
  );
}
