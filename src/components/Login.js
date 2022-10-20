import React, { useState } from "react";
import { useLogin, useNotify, Login } from "react-admin";
import { signup, signInWithGoogle, signInWithFacebook } from "../authProvider";
import {
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { ReactComponent as Logo }  from '../logo.svg';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const login = useLogin();
  const notify = useNotify();
  const [password, setPassword] = useState('');
  const isSubmitting = false;

  const handleSubmit = e => {
    e.preventDefault();
    if (showSignUp) {
      signup({ email, password }).catch(() =>
        notify('Invalid email or password')
      );
    } else {
      login({ email, password }).catch(() => {
        notify('Invalid email or password')
      });
    }
  };

  return (
    <Login sx={{ '.RaLogin-avatar': { visibility: "hidden", margin: 0, height: 0 }, backgroundImage: "linear-gradient(#780F03, #780F03)" }}>
      <Container maxWidth="xs" sx={{ marginTop: 2, marginBottom: 2 }}>
        <Stack direction="column" spacing={3}>
          <Stack direction="row" justifyContent="center">
            <Logo width="50%" height="50%" />
          </Stack>
          <TextField
            fullWidth
            type="email"
            label="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? (<VisibilityIcon />) : (<VisibilityOffIcon />)}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          { !showSignUp && <Typography>Don't have an account? <Link onClick={() => setShowSignUp(true) }>Sign up</Link>.</Typography>}
          { showSignUp && <Typography>Already have an account? <Link onClick={() => setShowSignUp(false) }>Sign in</Link>.</Typography>}
          <LoadingButton size="large" variant="contained" color="secondary" loading={isSubmitting} onClick={handleSubmit}>
            {showSignUp ? "Sign Up" : "Login"}
          </LoadingButton>
          <LoadingButton style={{ backgroundColor: "#DB4437" }} fullWidth startIcon={<GoogleIcon />} size="large" variant="contained" loading={isSubmitting} onClick={() => signInWithGoogle()}>
            Google login
          </LoadingButton>
          <LoadingButton style={{ backgroundColor: "#4267B2" }} fullWidth startIcon={<FacebookIcon />} size="large" variant="contained" loading={isSubmitting} onClick={() => signInWithFacebook()}>
            Facebook login
          </LoadingButton>
        </Stack>
      </Container>
    </Login>
  );
};

export default LoginForm;
