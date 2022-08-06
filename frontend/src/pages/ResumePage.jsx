import React, { useEffect, useState } from 'react';
import './ResumePage.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Education from '../components/resume_component/education';
import WorkExperience from '../components/resume_component/work-experience';
import ProjectExperience from '../components/resume_component/project-experience';
import Skill from '../components/resume_component/skill';
import Awards from '../components/resume_component/awards';
import ProjectDisplay from '../components/resume_component/project-display';
import MyDialog from '../components/resume_component/my-dialog';
import NavBar from '../components/component_NavBar/NavBar';
import { apiGet, apiPost } from '../components/API';
import JobPanel from '../components/component_JobPanel/JobPanel';
import { useParams, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { dummyJobs } from '../components/assets';

// import { getResume, submitResume } from '../../api/resume';

function ResumePage({ socket }) {
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
      {
        label: 'About',
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
        label: 'title',
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
        label: 'title',
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

  const [userInfo, setUserInfo] = useState({});
  const [openUserInfo, setOpenUserInfo] = useState(false);
  const [type, setType] = useState('false');
  // user type
  const [isFollow, setIsFollow] = useState(false);
  const [inUserType, setInUserType] = useState(null);
  const id = sessionStorage.getItem('id');
  // currently logged in user's type
  const userType = sessionStorage.getItem('type');
  const { state } = useLocation();
  const params = useParams();
  const resumeId = params.userId;
  console.log(resumeId, id);

  useEffect(() => {
    apiGet('user/getResume', { resumeId }).then((res) => {
      console.log(res.errormessage);
      setResumeData(res.errormessage);
      setUserInfo(res.errormessage.userInfo);
    });
    apiGet('user/checkfollow', { id, user_id: resumeId }).then((res) => {
      console.log(res.errormessage);
      setInUserType(res.errormessage.type);
      setIsFollow(res.errormessage.flag);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
    setOpenUserInfo(false);
  };

  const edit = (type) => {
    setOpen(true);
    setType(type);
  };

  const handleUserInput = (e, type) => {
    console.log(type);
    let temp = { ...userInfo };
    temp[type] = e.target.value;
    setUserInfo(temp);
  };

  const editUserInfo = (type) => {
    setOpenUserInfo(true);
  };

  const saveUserInfo = () => {
    console.log(userInfo);
    const temp = { ...resumeData };
    temp.userInfo = { thumbnail: '', ...userInfo };
    console.log(temp);
    setResumeData({ ...temp });
    setOpenUserInfo(false);
    setUserInfo({ thumbnail: '', ...userInfo });
  };

  const deleteItem = (index) => {
    const tempData = { ...resumeData };
    tempData[type].splice(index - 1, 1);
    console.log(tempData);
    setResumeData({ ...tempData });
    console.log(tempData);
  };

  const save = (data) => {
    const temp = { ...resumeData };
    temp[type] = data;
    setResumeData({ ...temp });
    setOpen(false);
  };

  const submit = () => {
    console.log(resumeData);
    apiPost('user/submitResume', { resumeid: id, resume: resumeData })
      .then((res) => {
        console.log('success');
      })
      .catch((e) => console.error(e));
  };

  const cancel = () => {
    setOpen(false);
  };

  const uploadAvatar = () => {
    const inputEl = document.createElement('input');
    inputEl.type = 'file';
    inputEl.click();
    inputEl.onchange = (e) => {
      const file = e.target.files[0];
      if (!!file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
          let data = e.target.result;

          let temp = { ...userInfo };
          let temp2 = { ...resumeData };
          temp.thumbnail = data;
          temp2.userInfo = { ...userInfo, thumbnail: data };
          setUserInfo({ ...temp });
          setResumeData({ ...temp2 });
          //           apiPost('user/upload_image', {
          //             user_id: id,
          //             image_base64: data
          //           }).then((res) => {
          //             setUserInfo({ ...temp })
          //           })
        };
      }
    };
  };

  const handleFollow = () => {
    if (isFollow) {
      apiGet('user/following', { userId: id }).then((res) => {
        alert('Unfollow success');
      });
    } else {
      apiGet('user/following', { userId: id }).then((res) => {
        alert('Follow success');
      });
    }
  };

  const student_resume = (
    <div>
      <div className="education resume_item">
        <div className="header">
          <span>Education</span>
          {id === resumeId && (
            <Button variant="contained" size="small" onClick={() => edit('education')}>
              edit
            </Button>
          )}
        </div>
        <div className="content">
          <Education education={resumeData.education} />
        </div>
      </div>
      <div className="work_experience resume_item">
        <div className="header">
          <span>Work Experience</span>
          {id === resumeId && (
            <Button variant="contained" size="small" onClick={() => edit('workExperience')}>
              edit
            </Button>
          )}
        </div>
        <div className="content">
          <WorkExperience workExperience={resumeData.workExperience} />
        </div>
      </div>
      <div className="project_experience resume_item">
        <div className="header">
          <span>Project Experience</span>
          {id === resumeId && (
            <Button variant="contained" size="small" onClick={() => edit('projectExperience')}>
              edit
            </Button>
          )}
        </div>
        <div className="content">
          <ProjectExperience projectExperience={resumeData.projectExperience} />
        </div>
      </div>
      <div className="skill resume_item">
        <div className="header">
          <span>Skills</span>
          {id === resumeId && (
            <Button variant="contained" size="small" onClick={() => edit('skills')}>
              edit
            </Button>
          )}
        </div>
        <div className="content">
          <Skill skill={resumeData.skills} />
        </div>
      </div>
      <div className="Awards resume_item">
        <div className="header">
          <span>Awards</span>
          {id === resumeId && (
            <Button variant="contained" size="small" onClick={() => edit('awards')}>
              edit
            </Button>
          )}
        </div>
        <div className="content">
          <Awards awards={resumeData.awards} />
        </div>
      </div>
      <div className="project_display resume_item">
        <div className="header">
          <span>Project Display</span>
          {id === resumeId && (
            <Button variant="contained" size="small" onClick={() => edit('projectDisplay')}>
              edit
            </Button>
          )}
        </div>
        <div className="content">
          <ProjectDisplay projectDisplay={resumeData.projectDisplay} />
        </div>
      </div>
    </div>
  );

  const hr_detail = (
    <div>
      {/* <div className='header'>
        <span>Introduction</span>
        <Button
          variant='contained'
          size='small'
          onClick={() => edit('projectDisplay')}
        >
          edit
        </Button>
      </div>
      <div className='content'>
        <ProjectDisplay projectDisplay={resumeData.projectDisplay} />
      </div> */}
      <JobPanel jobs={dummyJobs} />
    </div>
  );

  return (
    <>
      <NavBar type={sessionStorage.getItem('type')} />
      <div className="resume">
        <div className="user_info resume_item">
          <div className="header">
            <div>
              {id != resumeId && inUserType == 1 && (
                <Button variant="contained" size="small" onClick={() => handleFollow()}>
                  {isFollow ? 'UnFollow' : 'follow'}
                </Button>
              )}
            </div>
            {id === resumeId && (
              <Button variant="contained" size="small" onClick={() => editUserInfo()}>
                edit
              </Button>
            )}
          </div>
          <div className="content">
            <Avatar
              variant="square"
              alt="profile image"
              src={userInfo?.thumbnail}
              onClick={uploadAvatar}
              className="avatar"
              sx={{ width: 56, height: 56 }}
            />

            <div className="info_wrap">
              <div className="info_item">Full Name: {userInfo?.name || 'n/a'}</div>

              <div className="info_item">
                {sessionStorage.getItem('type') === '0' ? 'University: ' : 'Company: '}
                {userInfo?.university || 'n/a'}
              </div>

              <div className="info_item">Contact Email: {userInfo?.email || 'n/a'}</div>
            </div>
          </div>
          <div className="introduction">{resumeData.userInfo?.introduction}</div>
        </div>
        {inUserType == '1' && id !== resumeId ? hr_detail : inUserType == '0' ? student_resume : null}

        <div className="resume_footer">
          {id === resumeId && inUserType == 0 && (
            <Button className="save" variant="contained" size="small" color="success" onClick={() => submit()}>
              save
            </Button>
          )}
        </div>
      </div>
      <Dialog open={open} onClose={handleClose} scroll="paper" fullWidth maxWidth="md">
        <MyDialog
          config={dialogConfig[type]}
          save={save}
          cancel={cancel}
          deleteItem={deleteItem}
          data={resumeData[type]}
          type={type}
        ></MyDialog>
      </Dialog>
      <Dialog open={openUserInfo} onClose={handleClose} scroll="paper" fullWidth maxWidth="md">
        <div className="user_form">
          <div className="form_item">
            <div className="label">Name:</div>
            <TextField
              className="input"
              size="small"
              onChange={(e) => handleUserInput(e, 'name')}
              fullWidth
              defaultValue={userInfo?.name}
            />
          </div>
          <div className="form_item">
            <div className="label"> {inUserType == '0' ? 'University: ' : 'Company: '}</div>
            <TextField
              className="input"
              size="small"
              onChange={(e) => handleUserInput(e, 'university')}
              fullWidth
              defaultValue={userInfo?.university}
            />
          </div>
          <div className="form_item">
            <div className="label">Contact Email:</div>
            <TextField
              className="input"
              size="small"
              onChange={(e) => handleUserInput(e, 'email')}
              fullWidth
              defaultValue={userInfo?.email}
            />
          </div>
          <div className="footer">
            <Button
              className="cancel"
              variant="contained"
              size="small"
              color="error"
              onClick={() => setOpenUserInfo(false)}
            >
              cancel
            </Button>
            <Button className="save" variant="contained" size="small" onClick={() => saveUserInfo()}>
              save
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ResumePage;
