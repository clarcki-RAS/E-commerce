import FileUploader from "@/components/FileUploader"
import { theme_textF_login } from "@/components/ThemeProvide"
import { Toast } from "@/components/Toast";
import { Container, Grid, InputAdornment, MenuItem, Paper, TextField, ThemeProvider } from "@mui/material"
import axios from "axios";
import { useState } from "react";

const Clothes_form = () => {

    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");


    const [mediaUrl, setMediaUrl] = useState<string>("");

    // const [clothesData, setClothesData] = useState({
    //     type: "",
    //     description: "",
    //     price: ""
    // });

    const handleMediaUrlChange = (url: string) => {
        console.log("New media URL:", url);
    };


    const formData = new FormData();

    const handleFileChange = (files: File[]) => {
        formData.append('image', files[0]);
        localStorage.setItem('imageUrl', files[0].name);
    };


    const handleInputChange = (e, setInput) => {
        const value = e.target.value;
        setInput(value);
    }

    // const handleTypeChange = (e) => {
    //     setClothesData({...clothesData, type: e.target.value});
    // };

    // const handleDescriptionChange = (e) => {
    //     setClothesData({...clothesData, description: e.target.value})
    // };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        console.log(localStorage.getItem('imageUrl'));
        await axios.post("http://localhost:8080/api/clothes/uploadImage", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        )
            .then(async () => {

                await axios.post("http://localhost:8080/api/clothes/add", {
                    title: title,
                    price: price,
                    description: description,
                    quantity: quantity,
                    imageUrl: localStorage.getItem('imageUrl'),
                    userId: localStorage.getItem('userId')
                },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                    .then(() => {
                        Toast.fire({
                            icon: "success",
                            title: "New clothe(s) imported"
                        })
                    })
                    .catch((error) => {
                        Toast.fire({
                            icon: "error",
                            title: "Error during exportation"
                        });
                        console.log(error)
                    })
            })
            .catch(() => {
                Toast.fire({
                    icon: "error",
                    title: "Please import a picture"
                })
            })
    }

    return (
        <>
            <div className=" h-full w-full xl:grid xl:grid-cols-12 rounded-lg overflow-hidden bg-[url('/assets/images/rack-vetements-magasin.jpg')] bg-no-repeat bg-cover pagination">

                <div className="xl:col-span-6 xl:bg-stone-100 ">
                    <div >

                        <Container maxWidth="sm" className="h-full xl:mt-8 text-center bx-36 bg-stone-100 rounded py-5 mt-20  " sx={{ borderLeftWidth: 10, borderRightWidth: 10, borderBottomWidth: 10, borderColor: 'rgb(245 245 244)' }} >
                            <Paper className=" h-28 w-28 mx-auto mb-20 my-auto" >

                                <img src="/assets/images/Background.png" className="bg-stone-200 w-fit h-fit object-cover border-8 rounded-md border-stone-600" />

                            </Paper>

                            <form className="grid" onSubmit={(e) => {
                                onSubmit(e)
                            }}>
                                <ThemeProvider theme={theme_textF_login}>

                                    <div className="my-5"></div>

                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="T i t l e"
                                                color="primary"
                                                className=" text-start w-full"
                                                value={title}
                                                onChange={(e) => {
                                                    handleInputChange(e, setTitle);
                                                }}
                                            />

                                        </Grid>

                                        <Grid item xs={4}>

                                            <TextField
                                                label="P r i c e"
                                                color="primary"
                                                InputProps={{
                                                    endAdornment:
                                                        <InputAdornment position="end" >
                                                            <span className="pe-1 font-bold text-stone-600 text-lg"> $ </span>
                                                        </InputAdornment>
                                                }}
                                                className=" text-start w-full"
                                                value={price}
                                                onChange={(e) => {
                                                    handleInputChange(e, setPrice);
                                                }}
                                            >
                                            </TextField>

                                        </Grid>

                                        <Grid item xs={2}>

                                            <TextField
                                                label="Qty*"
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


                                    <div className="my-4"></div>
                                    <TextField
                                        label="D e s c r i p t i o n"
                                        fullWidth
                                        color="primary"
                                        multiline
                                        value={description}
                                        // onChange={(e) => {
                                        //     handleDescriptionChange(e)
                                        // }}
                                        onChange={(e) => {
                                            handleInputChange(e, setDescription);
                                        }}
                                    />

                                    <div className="my-3"></div>

                                    <FileUploader
                                        fieldChange={handleFileChange}
                                        mediaUrl={mediaUrl}
                                        setMediaUrl={handleMediaUrlChange}
                                    />

                                </ThemeProvider>

                                <div className=" mt-14 mb-1"></div>

                                <div className="d-grid gap-2 col-6 mx-auto justify-content-center">

                                    <button type="submit" className="button_">I M P O R T</button>

                                </div>

                            </form>

                        </Container>

                    </div>
                </div>

                <div className="xl:col-span-6 ">
                    <div className="h-full hidden xl:flex xl:flex-1">

                        <img
                            src="/assets/images/rack-vetements-magasin.jpg"
                            alt="logo"
                            className=" bg-no-repeat w-full h-full object-cover " />

                    </div>
                </div>

            </div>
        </>
    )
}

export default Clothes_form
