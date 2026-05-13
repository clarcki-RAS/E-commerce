import { theme_textF_login } from "@/components/ThemeProvide"
import { Toast } from "@/components/Toast"
import { Box, Container, Grid, Paper, TextField, ThemeProvider } from "@mui/material"
import axios from "axios"
import { FormEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const SignupFrom = () => {

  const navigate = useNavigate()
  const [fname,setFname]=useState('')
  const [lname,setLname]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [cPassword,setCpassword]=useState('')

  const [canSubmit, setCanSubmit] = useState(false)

  useEffect(()=>{

    setCanSubmit(fname.trim()!=='' && lname.trim()!=='' && email.trim()!=='' && password.trim()!=='' && cPassword.trim()!=='');
  },[fname,lname,email,password,cPassword]
  );

  const onSubmit=async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const user={fname,lname,email,password,cPassword}

    await axios.post("http://localhost:8080/api/user/login", {email:email} ,{
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(() => {
      
      Toast.fire({
        icon:"error",
        title:"Email already exist"

      })
    })
    .catch(() => {

      if (password===cPassword){
      
        axios.post("http://localhost:8080/api/user/add", user)
        .then(() =>{
          navigate('/sign-in')
          Toast.fire({
            icon:"success",
            title:"User added successfully"
          })
        });

        console.log("success");
      }
      else{
        Toast.fire({
          icon:"error",
          title:"The passwords don't match"
        })
      }
    })

  };

  const handleInputChange = (e, setInput) =>{
      const value = e.target.value;
      setInput(value);
  }


  return (

    <Box className="pagination">
      <Container maxWidth="sm" className=" mt-6 xl:mt-0 text-center py-10 bx-36 bg-stone-100 rounded" sx={{borderLeftWidth:10, borderRightWidth:10,borderBottomWidth:10, borderColor:'rgb(245 245 244)'}} >
        <Paper className=" h-28 w-28 mx-auto mb-20" >
        
          <img src="/assets/images/Background.png" className="bg-stone-200 w-fit h-fit object-cover border-8 rounded-md border-stone-600" />
        
        </Paper>

        <div className=" mb-16">

          <   h1 className=" font-serif text-4xl"> E n s u r e<span className="mx-10">Y o u r</span>S t y l e</h1>

        </div>

      <form onSubmit={(e)=>onSubmit(e)}>
        <ThemeProvider theme={theme_textF_login}>
          <Grid container spacing={5} className="flex justify-around items-center">

            <Grid item xl={6} className="mx-auto md:mx-0">
              <TextField 
              label="First Name" 
              fullWidth 
              color="primary"
              value={fname}
              onChange={(e)=>{
                handleInputChange(e, setFname);
              }}
              required
              />

            </Grid>

              <div className="my-10"></div>

            <Grid item xl={6} className="mx-auto md:mx-0">
              <TextField 
              label="Last Name" 
              fullWidth 
              color="primary"
              value={lname}
              onChange={(e)=>{
                handleInputChange(e, setLname);
              }}
              required
              />
            </Grid>

            <Grid item xl={12} md={12} sm={12} xs={6} className="ms-2 pe-2 mx-auto">
              <TextField 
              label="User Mail" 
              fullWidth 
              color="primary"
              value={email}
              onChange={(e)=>{
                handleInputChange(e, setEmail);
              }}
              required
              />
            </Grid>

              <div className="my-10"></div>

            <Grid item xl={6} className="mx-auto md:mx-0">
              <TextField 
              type="password" 
              label="Password" 
              fullWidth 
              color="primary"
              value={password}
              onChange={(e)=>{
                handleInputChange(e, setPassword);
              }}
              required
              />
            </Grid>

            <Grid item xl={6} className="mx-auto md:mx-0">
              <TextField 
              id="c-password" 
              type="password" 
              label="Confirm Password" 
              fullWidth 
              color='primary'
              value={cPassword}
              onChange={(e)=>{
                handleInputChange(e, setCpassword);
              }}
              required
              />
            </Grid>

            </Grid>

        </ThemeProvider>

          <div className=" mt-14 mb-1"></div>

        <div className="d-grid gap-2 col-6 mx-auto justify-content-center">
          
          <button type="submit" disabled={!canSubmit} className="button_">S I G N<span className="ms-3">U P</span></button>

          <div className="mt-2">Want <span className="ms-1">to</span><span className=" ms-2 "><Link to="/sign-in" className="signin">Sign in ?</Link></span></div>

        </div>

    </form>

      </Container>
    </Box>
  )
}

export default SignupFrom
