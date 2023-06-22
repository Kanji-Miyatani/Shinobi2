import { Avatar, 
    Box, 
    Button,
    CssBaseline,
    Grid, 
    Link, 
    Paper, 
    TextField, 
    ThemeProvider, 
    Typography, 
    createTheme} from '@mui/material'
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from "react-router-dom";
import loginApi,{LoginApiRequest} from '../api/login'
import { ValidationOption, useValidation } from '../services/validationService';
const validationOptions:ValidationOption[]=[
    {
        name:"email",
        validationMethods:(value)=>{
            if(value===""){
                return "入力してください。"
            }
            return null;
        }
    },
    {
        name:"password",
        validationMethods:(value)=>{
            if(value===""){
                return "入力してください。"
            }
            return null;
        }
    }
];

/**
 * ログイン画面
 * @returns 
 */
function Login() {
    const {formData, handleChanged,handleValidateAll,addError} =useValidation(validationOptions);
    const navigate = useNavigate();
    //POST
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const passWord = data.get('password')?.toString();
        const email =data.get('email')?.toString();
        console.log(formData)
        if(!handleValidateAll()){
            return;
        };
        const req :LoginApiRequest ={
            email: email as string,
            password: passWord as string,
        } 
        loginApi(req).then((body)=>{
            if(body.result){
                navigate("/");
            } else{
                addError("password",body.message);
            }
        }).catch(()=>{
            alert("不明なエラー");
        });
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
        backgroundImage: 'url(images/tokyo_ninja_3.jpg)',
        backgroundRepeat: 'no-repeat',
        textAlign:'center',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <CssBaseline />
        <Grid item xs={12} sm={8} md={4} component={Paper} 
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
                    error={formData["email"]?.isError ?? false}
                    helperText={formData["email"]?.message}
                    onChange={handleChanged("email",null)}
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
                    error={formData["password"]?.isError ?? false}
                    helperText={formData["password"]?.message}
                    onChange={handleChanged("password",null)}
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