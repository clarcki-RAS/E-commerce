import SideBar from "@/components/SideBar"
import { Toast } from "@/components/Toast";
import { Grid } from "@mui/material"
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"

const RootLayout = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const userMail = localStorage.getItem('userMail');

    if (userMail == null) {
      navigate('/sign-in');
      Toast.fire({
        icon: 'info',
        title: 'Please connect yourself'
      });
    }
    console.log(userMail);
    console.log(localStorage.getItem('userId'))
  }, []
  );

  return (
    <>
      <div className=" h-screen w-screen pagination">

        <Grid container className="grid grid-cols-12 bg-white w-screen">

          <Grid item >
            <SideBar />
          </Grid >

          <Grid item className=" py-5 mx-auto" xs={10}>
            <Outlet />
          </Grid>

        </Grid>
      </div>
    </>
  )
}

export default RootLayout
