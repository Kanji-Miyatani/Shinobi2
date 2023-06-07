import { Avatar, 
    Box, 
    Button,
     Card,
      Checkbox, 
      CssBaseline,
       FormControlLabel, 
       Grid, 
       Link, 
       Paper, 
       TextField, 
       ThemeProvider, 
       Typography, 
       createTheme, 
       makeStyles,
    Theme } from '@mui/material'
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import loginApi,{LoginApiRequest} from '../api/login'

function Login() {
    const [passInputError, setPassInputError] = useState(false);
    const [emailInputError, setEmailInputError] = useState(false);
    //POST
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const passWord = data.get('email')?.toString();
        const email =data.get('email')?.toString();
        if(passWord===null || passWord===undefined){
            setPassInputError(true);
        }
        if(email===null || email===undefined){
            setEmailInputError(true);
        }
        console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
        if(emailInputError || passInputError){
            return;
        }
        const req :LoginApiRequest ={
            email: email as string,
            password: passWord as string,
        } 
        loginApi(req);
      };
    const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
    <Grid container  
        justifyContent="center"
        alignContent="center"
             component="main"
      xs={12}
      sm={12}
      md={12}
      sx={{
        height: '100vh',
        backgroundImage: 'url(images/tokyo_ninja_2.jpg)',
        backgroundRepeat: 'no-repeat',
        textAlign:'center',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} 
        sx={{
            backgroundColor:"transparent",
        }}
         
        elevation={1}>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Typography component="h1" variant="h5">
                    <img width={230} src="images/font_logo_w.png"></img>
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    sx={{
                        backgroundColor:'white'
                    }}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    variant="filled"
                    error={emailInputError}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    sx={{
                        backgroundColor:'white'
                    }}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    variant="filled"
                    error={passInputError}
                    />
                    <Button
                    type="submit"
                    fullWidth 
                    startIcon={<CheckIcon />}
                    sx={{ mt: 3, mb: 2 }}
                    variant="contained"
                    >
                    Login
                    </Button>
                    <Grid container>
                    <Grid item>
                        <Link href="#" variant="body2" sx={{color:"#FFFFFF"}}>
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
            </Box>
        </Grid>
     
    </Grid>
  </ThemeProvider>
  )
}

export default Login