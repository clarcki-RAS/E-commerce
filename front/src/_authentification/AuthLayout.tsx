import { Container, Paper} from '@mui/material';
import { Outlet, Navigate } from 'react-router-dom'

function AuthLayout() {
  const isAuthenticated = false;
  
  return (

    <>
      {isAuthenticated ? (
        <Navigate to={"/"}></Navigate>
      ) : (
        <>

    <div className="h-screen xl:grid xl:grid-cols-12 bg-[url('/assets/images/md.jpg')] xl:bg-gradient-to-br from-stone-400 via-stone-300 to-dark-700 from-10% to-80% via-100% ">
            <div className='flex flex-1 justify-center items-center flex-col py-10 xl:col-span-6 '>
              
              <Container>
                
                <Outlet />
                
              </Container>
                
            </div>
            <div className='xl:col-span-6 rounded '>
              <div className='xl:flex-1 rounded-l-lg overflow-hidden hidden xl:flex '>
                <Paper className="mt-16" style={{"height":"825px"}}>
                <img
                  src="/assets/images/shirt-mockup-concept-with-plain-clothing.jpg"
                  alt="logo"
                  className=" bg-no-repeat bg-stone-500 w-full h-screen object-cover rounded-md  " />
                  </Paper>
              </div>
            </div>
          </div>

        </>
      )}
    </>
  );
}

export default AuthLayout
