import * as React from 'react'
import JobCard from './JobCard'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'
import './JobPanel.css'
import usePagination from './usePagination'
import { Dialog, Button } from '@mui/material'
import JobDetail from '../compopnent_JobDetail/JobDetail'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

function getJobDetail(jobs, id) {
  const job = jobs.find((job) => job.id == id)
  return job
}

export default function JobPanel(props) {
  const [page, setPage] = React.useState(1)
  const PER_PAGE = 10
  const jobs = props.jobs || []
  const count = Math.ceil(jobs?.length / PER_PAGE)
  const handleData = usePagination(jobs, PER_PAGE)

  const handlePageChange = (e, p) => {
    setPage(p)
    handleData.jump(p)
    window.scrollTo({ top: 0 })
  }

  const [open, setOpen] = React.useState(false)
  const [openApply, setOpenApply] = React.useState(false)
  const [jobId, setJobId] = React.useState(null)

  const handleClickOpen = (e) => {
    console.log('open detail')
    setOpen(true)
    setJobId(e.currentTarget.id)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleApplyClose = () => {
    setOpenApply(false)
  }

  const handleApply = (e) => {
    // TODO Apply for the job
    e.stopPropagation()
    const jobId = e.currentTarget.parentNode.parentNode.id
    setJobId(jobId)
    console.log('apply ' + jobId)
    setOpenApply(true)
    // TODO display apply method
  }

  const applyDialog = (jobId) => {
    return (
      <Dialog
        open={openApply}
        onClose={handleApplyClose}
        aria-labelledby='apply-dialog-title'
        aria-describedby='apply-dialog-description'
      >
        <DialogTitle id='apply-dialog-title'>
          {'The apply method for the job is:'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='apply-dialog-description'>
            APPLY METHOD GOES HERE
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApplyClose} autoFocus>
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <>
      <div className='job-panel'>
        <Grid container spacing={3}>
          {handleData.currentData().map((job, idx) => (
            <Grid
              item
              xs={props.type === 'home' ? 12 : 12}
              sm={props.type === 'home' ? 12 : 8}
              md={props.type === 'home' ? 12 : 6}
              lg={props.type === 'home' ? 12 : 4}
              key={idx}
            >
              <JobCard
                className='job-card'
                type={props.type}
                jobID={job.id}
                key={idx}
                title={job.title}
                company={job.company}
                location={{
                  country: job.location,
                  state: job.state,
                  city: job.city
                }}
                briefing={job.description}
                hanldeClickOpen={handleClickOpen}
                handleApply={handleApply}
                socket={props.socket}
              />
            </Grid>
          ))}
        </Grid>

        <Box className='pagination'>
          <Pagination
            count={count}
            page={page}
            onChange={handlePageChange}
            shape='rounded'
          />
        </Box>
      </div>
      <Dialog open={open} onClose={handleClose} scroll='paper' maxWidth='lg'>
        <JobDetail handleClose={handleClose} job={getJobDetail(jobs, jobId)} />
      </Dialog>
      {applyDialog(jobId)}
    </>
  )
}
