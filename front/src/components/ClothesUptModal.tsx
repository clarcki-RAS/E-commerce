import { Box, Grid, InputAdornment, Modal, Paper, TextField, ThemeProvider } from "@mui/material"
import { theme_textF_login } from "./ThemeProvide"
import { useEffect, useState } from "react";

const ClothesUptModal = ({ open, handleUpdateSubmit, handleClose, clotheData }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {

        setTitle('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setImageUrl('');

        if (clotheData) {
            setTitle(clotheData.title);
            setDescription(clotheData.description);
            setPrice(clotheData.price);
            setImageUrl(clotheData.imageUrl);
            setQuantity(clotheData.quantity);
        }
    }, [clotheData]);

    const handleInputChange = (e, setInput) => {
        const value = e.target.value;
        setInput(value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        handleUpdateSubmit({ title, description, price, quantity });

        setTitle('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setImageUrl('');
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
                    width: 980,
                    height: 570,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <div className="modal-header flex justify-end pb-2">
                    <button className="btn-close px-3 py-2 rounded-tr-lg rounded-none" onClick={handleClose}></button>
                </div>

                <form className="px-5" onSubmit={(e) => { handleFormSubmit(e) }}>

                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <ThemeProvider theme={theme_textF_login}>
                                <h1
                                    id="modal-title"
                                    className="font-semibold text-stone-900 pb-16 text-center text-xl  "
                                >
                                    M A K E <span className="px-3"> Y O U R</span> U P D A T E S
                                </h1>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    className="mb-2 rounded-md"
                                    value={title}
                                    onChange={(e) => {
                                        handleInputChange(e, setTitle);
                                    }}
                                />
                                <div className="py-4"></div>

                                <TextField
                                    fullWidth
                                    label="Description"
                                    className="mb-2"
                                    value={description}
                                    onChange={(e) => {
                                        handleInputChange(e, setDescription);
                                    }}
                                />
                                <div className="py-4"></div>

                                <Grid container spacing={2}>
                                    <Grid item xs={8}>
                                        <TextField
                                            fullWidth
                                            label="Price"
                                            className="mb-2"
                                            value={price}
                                            InputProps={{
                                                endAdornment:
                                                    <InputAdornment position="end" >
                                                        <span className="pe-1 font-bold text-stone-600 text-lg"> $ </span>
                                                    </InputAdornment>
                                            }}
                                            onChange={(e) => {
                                                handleInputChange(e, setPrice);
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>

                                            <TextField
                                                label="Quantity"
                                                color="primary"
                                                className=" text-start w-full"
                                                value={quantity}
                                                onChange={(e) => {
                                                    handleInputChange(e, setQuantity);
                                                }}
                                            >
                                            </TextField>

                                        </Grid>

                                </Grid>

                                <div className="py-4"></div>

                                <div className='d-grid gap-2 mx-auto'>
                                    <div className="d-grid gap-2 col-8 mx-auto justify-content-center">

                                        <button type="submit" className="button_">U P D A T E</button>

                                    </div>
                                </div>
                            </ThemeProvider>
                        </Grid>
                        <Grid item xs={6} className="my-auto ">
                            <Paper className="mx-auto flex h-96 w-96 overflow-hidden border-2 border-stone-700 rounded-lg">
                                <img src={"/assets/uploaded/" + imageUrl} className="my-auto " />
                            </Paper>
                        </Grid>
                    </Grid>



                </form>

            </Box>

        </Modal>
    )
}

export default ClothesUptModal
