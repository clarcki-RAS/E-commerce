import { Box, Grid, Modal, ThemeProvider } from "@mui/material";
import { theme_textF_login } from "./ThemeProvide";

const ClothesDeleteModal = ({ open, handleDeleteSubmit, handleClose }) => {

    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleDeleteSubmit();

    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="rounded-md modalReveal "
        >
            <Box
                className="rounded-lg h-full bg-stone-50 py-0 px-0"
                sx={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 680,
                    height: 360,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <div className="modal-header flex justify-end pb-2">
                    <button className="btn-close px-3 py-2 rounded-tr-lg rounded-none" onClick={handleClose}></button>
                </div>

                <form className="px-5" onSubmit={(e) => { handleFormSubmit(e) }}>

                    <Grid container spacing={4}>

                        <Grid item xs={6} className="my-auto ">
                            <div className="mx-auto flex h-72 w-64 overflow-hidden border-0 ">
                                <img src={"/assets/images/delete.png"} className="my-auto" />
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <ThemeProvider theme={theme_textF_login}>
                                <h1
                                    id="modal-title"
                                    className="font-semibold text-stone-900 py-16 text-center text-2xl  "
                                >
                                    Are you sure you want to delete it ?
                                </h1>
                                

                                <div className='d-grid gap-2 mx-auto'>
                                    <div className="d-grid gap-2 col-12 pt-1 mx-auto justify-content-center">

                                        <button type="submit" className="buttonDel">D E L E T E</button>

                                    </div>
                                </div>
                            </ThemeProvider>
                        </Grid>

                    </Grid>



                </form>

            </Box>

        </Modal>
    )
}

export default ClothesDeleteModal
