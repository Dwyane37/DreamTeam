import React, { useEffect, useState } from 'react';
import './ResumePage.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import Education from '../components/resume_component/education';
import WorkExperience from '../components/resume_component/work-experience';
import ProjectExperience from '../components/resume_component/project-experience';
import Skill from '../components/resume_component/skill';
import Awards from '../components/resume_component/awards';
import ProjectDisplay from '../components/resume_component/project-display';
import MyDialog from '../components/resume_component/my-dialog';
import NavBar from '../components/component_NavBar/NavBar';
import { apiGet, apiPost } from '../components/API';
// import { getResume, submitResume } from '../../api/resume';

function ResumePage() {
  const [resumeData, setResumeData] = useState({
    userInfo: [],
    education: [],
    workExperience: [],
    projectExperience: [],
    skills: [],
    awards: [],
    projectDisplay: [],
  });

  const [dialogConfig, setDialogConfig] = useState({
    userInfo: [
      {
        label: 'name',
        required: true,
        type: 'text',
      },
      {
        label: 'university',
        required: true,
        type: 'text',
      },
      {
        label: 'email',
        required: false,
        type: 'text',
      },
    ],
    education: [
      {
        label: 'university',
        required: true,
        type: 'text',
      },
      {
        label: 'start',
        required: true,
        type: 'date',
      },
      {
        label: 'end',
        required: true,
        type: 'date',
      },
      {
        label: 'faculty',
        required: true,
        type: 'text',
      },
      {
        label: 'major',
        required: true,
        type: 'text',
      },
      {
        label: 'grades',
        required: true,
        type: 'text',
      },
    ],
    workExperience: [
      {
        label: 'company',
        required: true,
        type: 'text',
      },
      {
        label: 'position',
        required: true,
        type: 'text',
      },
      {
        label: 'start',
        required: true,
        type: 'date',
      },
      {
        label: 'end',
        required: true,
        type: 'date',
      },
      {
        label: 'description',
        required: true,
        type: 'text',
      },
    ],
    projectExperience: [
      {
        label: 'name',
        required: true,
        type: 'text',
      },
      {
        label: 'start',
        required: true,
        type: 'date',
      },
      {
        label: 'end',
        required: true,
        type: 'date',
      },
      {
        label: 'description',
        required: true,
        type: 'text',
      },
    ],
    skills: [
      {
        label: 'skill',
        required: true,
        type: 'text',
      },
    ],
    awards: [
      {
        label: 'title',
        required: true,
        type: 'text',
      },
      {
        label: 'description',
        required: true,
        type: 'text',
      },
    ],
    projectDisplay: [
      {
        label: 'name',
        required: true,
        type: 'text',
      },
      {
        label: 'link',
        required: true,
        type: 'text',
      },
    ],
  });
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('false');

  useEffect(() => {
    apiGet('user/getResume?resumeId=' + 1, {}).then((res) => {
      setResumeData(res.data.data);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const edit = (type) => {
    setOpen(true);
    setType(type);
  };

  const save = (data) => {
    const temp = { ...resumeData };
    temp[type] = data;
    setResumeData({ ...temp });
    setOpen(false);
  };

  const submit = () => {
    apiPost('user/submitResume', resumeData).then((res) => {
      console.log('提交成功');
    });
  };

  const cancel = () => {
    setOpen(false);
  };

  const student_resume = (
    <div>
      <div className="education resume_item">
        <div className="header">
          <span>Education</span>
          <Button variant="contained" size="small" onClick={() => edit('education')}>
            edit
          </Button>
        </div>
        <div className="content">
          <Education education={resumeData.education} />
        </div>
      </div>
      <div className="work_experience resume_item">
        <div className="header">
          <span>Work Experience</span>
          <Button variant="contained" size="small" onClick={() => edit('workExperience')}>
            edit
          </Button>
        </div>
        <div className="content">
          <WorkExperience workExperience={resumeData.workExperience} />
        </div>
      </div>
      <div className="project_experience resume_item">
        <div className="header">
          <span>Project Experience</span>
          <Button variant="contained" size="small" onClick={() => edit('projectExperience')}>
            edit
          </Button>
        </div>
        <div className="content">
          <ProjectExperience projectExperience={resumeData.projectExperience} />
        </div>
      </div>
      <div className="skill resume_item">
        <div className="header">
          <span>Skills</span>
          <Button variant="contained" size="small" onClick={() => edit('skills')}>
            edit
          </Button>
        </div>
        <div className="content">
          <Skill skill={resumeData.skills} />
        </div>
      </div>
      <div className="Awards resume_item">
        <div className="header">
          <span>awards</span>
          <Button variant="contained" size="small" onClick={() => edit('awards')}>
            edit
          </Button>
        </div>
        <div className="content">
          <Awards awards={resumeData.awards} />
        </div>
      </div>
      <div className="project_display resume_item">
        <div className="header">
          <span>Project Display</span>
          <Button variant="contained" size="small" onClick={() => edit('projectDisplay')}>
            edit
          </Button>
        </div>
        <div className="content">
          <ProjectDisplay projectDisplay={resumeData.projectDisplay} />
        </div>
      </div>
    </div>
  );

  const hr_detail = (
    <div className="resume_item">
      <div className="header">
        <span>Introduction</span>
        <Button variant="contained" size="small" onClick={() => edit('projectDisplay')}>
          edit
        </Button>
      </div>
      <div className="content">
        <ProjectDisplay projectDisplay={resumeData.projectDisplay} />
      </div>
    </div>
  );

  return (
    <>
      <NavBar type={localStorage.getItem('type')} />
      <div className="resume">
        <div className="user_info resume_item">
          <div className="header">
            <span></span>
            <Button variant="contained" size="small" onClick={() => edit('userInfo')}>
              edit
            </Button>
          </div>

          <div className="content">
            <img src="https://www.yh31.com/uploadfile/ql/202104152042540827.jpg" alt="" className="avatar" />
            <div className="info_wrap">
              <div className="info_item">name: {resumeData.userInfo[0]?.name || '-'}</div>

              <div className="info_item">
                {localStorage.getItem('type') === '0' ? 'Unversity: ' : 'Company: '}
                {resumeData.userInfo[0]?.organisation || '-'}
              </div>

              <div className="info_item">email: {resumeData.userInfo[0]?.email || '-'}</div>
            </div>
          </div>
        </div>
        {localStorage.getItem('type') === '0' ? student_resume : hr_detail}

        <div className="resume_footer">
          <Button className="save" variant="contained" size="small" color="success" onClick={() => submit()}>
            save
          </Button>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose} scroll="paper" fullWidth maxWidth="md">
        <MyDialog config={dialogConfig[type]} save={save} cancel={cancel} data={resumeData[type]}></MyDialog>
      </Dialog>
    </>
  );
}

export default ResumePage;
