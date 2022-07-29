import * as React from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, Divider, Paper, Button, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import './JobDetail.css';

export default function FAQ({ data }) {
  return (
    <Paper className="faq">
      {/* // <div> */}
      <h3>FAQ</h3>

      <Divider sx={{ margin: '20px 0' }} />
      {data.map((accordion, idx) => (
        <Accordion key={idx}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="faq-content">
            <Typography>{accordion.summary}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{accordion.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      {/* </div> */}
    </Paper>
  );
}
