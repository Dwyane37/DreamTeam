import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignUpForm from '../components/component_Register/SignUpForm';
import ProfileInfo from '../components/component_Register/UserInfoForm';
import SelectAccount from '../components/component_Register/SelectAccount';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../components/API';

const steps = ['Select account type', 'Register your account', 'Enter your details'];

function getStepContent(step, [state1, state2, state3], accType) {
  switch (step) {
    case 0:
      return <SelectAccount state={state1} />;
    case 1:
      return <SignUpForm state={state2} />;
    case 2:
      return <ProfileInfo state={state3} label={accType === 'student' ? 'University' : 'Company'} />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const navSignIn = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const [accType, setType] = React.useState('');
  const [signupInfo, setSignupInfo] = React.useState({ username: '', email: '', password: '' });
  const [profileInfo, setProfileInfo] = React.useState({ firstname: '', lastname: '', name: '', organisation: '' });

  const handleNext = (e) => {
    if (activeStep === 2) {
      apiPost('user/register', {
        ...signupInfo,
        type: accType,
        nickname: profileInfo.name,
        organisation: profileInfo.organisation,
      })
        .then((body) => {
          setActiveStep(activeStep + 1);
          // console.log(body);
        })
        .catch((e) => alert(e));
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            I-Student
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Sign Up Account
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Congrats! You've just created your account.
                </Typography>
                <Typography variant="subtitle1">
                  You can click{' '}
                  <span style={{ color: 'blue', textDecoration: 'underline' }} onClick={navSignIn}>
                    here
                  </span>{' '}
                  to login.
                </Typography>
                <Typography variant="subtitle1"></Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(
                  activeStep,
                  [
                    [accType, setType],
                    [signupInfo, setSignupInfo],
                    [profileInfo, setProfileInfo],
                  ],
                  accType
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                    {activeStep === steps.length - 1 ? 'Sign Up' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        {activeStep === 0 && (
          <Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" onClick={navSignIn}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* <Copyright /> */}
      </Container>
    </ThemeProvider>
  );
}
