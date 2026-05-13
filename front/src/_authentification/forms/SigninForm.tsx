import { theme_textF_login } from "@/components/ThemeProvide";
import { Toast } from "@/components/Toast";
import { Box, Container, Paper, TextField, ThemeProvider } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const SigninForm = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [canSubmit, setCanSubmit] = useState(false)

  useEffect(() => {
    localStorage.clear()
    setCanSubmit(email.trim() !== '' && password.trim() !== '');
  }, [email, password]
  );

  const handleInputChange = (e, setInput) => {
    const value = e.target.value;
    setInput(value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/api/user/login", { email: email },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => {
        const data = response.data

        if (data.password != password) {
          Toast.fire({
            icon: "error",
            title: "The password doens't match"
          })
        }
        else {
          Toast.fire({
            icon: "success",
            title: "Welcome user"
          });
          localStorage.setItem('userMail', JSON.stringify({ email: email }));
          localStorage.setItem('userId', data.id);
          localStorage.setItem('Email', data.email)
          navigate('/');
        }
      })
      .catch(error => {
        console.log("Error logging in :", error);
        Toast.fire({
          icon: "error",
          title: "Email doesn't exist"
        })
      });

  };

  return (
    <Box className="pagination">
      <Container maxWidth="sm" className=" mt-6 xl:mt-0 text-center py-10 bx-36 bg-stone-100 rounded" sx={{ borderLeftWidth: 10, borderRightWidth: 10, borderBottomWidth: 10, borderColor: 'rgb(245 245 244)' }} >
        <Paper className=" h-28 w-28 mx-auto mb-32" >

          <img src="/assets/images/Background.png" className="bg-stone-200 w-fit h-fit object-cover border-8 rounded-md border-stone-600" />

        </Paper>

        <div className=" mb-16">

          <h1 className=" font-serif text-4xl"> E n s u r e<span className="mx-10">Y o u r</span>S t y l e</h1>
        </div>

        <form onSubmit={(e) => onSubmit(e)}>
          <ThemeProvider theme={theme_textF_login}>
            <TextField
              id="email"
              label="User Mail"
              fullWidth
              color="primary"
              value={email}
              onChange={(e) => {
                handleInputChange(e, setEmail);
              }}
            />

            <div className="my-20"></div>

            <TextField
              id="password"
              type="password"
              label="Password"
              fullWidth
              color="primary"
              value={password}
              onChange={(e) => {
                handleInputChange(e, setPassword);
              }}
            />

          </ThemeProvider>
          <div className=" mt-14 mb-1"></div>
          <div className="d-grid gap-2 col-6 mx-auto justify-content-center">

            <button disabled={!canSubmit} className="button_" >S I G N<span className="ms-3">I N</span></button>


            <div className="mt-2">Want <span className="ms-1">to</span><span className=" ms-2 "><Link to="/sign-up" className="signin">Sign up ?</Link></span></div>
          </div>
        </form>
      </Container>
    </Box>
  )
}

export default SigninForm
