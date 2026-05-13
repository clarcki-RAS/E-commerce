import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react"
import { Grid, Modal, TextField, ThemeProvider } from "@mui/material"
import { theme_textF_login } from "./ThemeProvide"
import { useEffect, useState } from "react";


const CartModal = ({ open, handleClose, handleCartSubmit, clothesData }) => {

    const [maxSize, setMaxSize] = useState(0);

    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [clothesId, setClothesId] = useState("");
    const [buyerId, setBuyerId] = useState("");

    useEffect(() => {

        setDescription('');
        setPrice('');
        setQuantity(1);
        setMaxSize(0);
        setPrice('');
        setImageUrl('');

        if (clothesData) {
            setDescription(clothesData.description);
            setPrice(clothesData.price);
            setImageUrl(clothesData.imageUrl);
            setQuantity(1);
            setMaxSize(parseInt(clothesData.quantity, 10));
        }
    }, [clothesData]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        handleCartSubmit({ clothesId, buyerId, quantity });

    }

    const handleInputChange = (e, setInput) => {
        const value = e.target.value;
        setInput(value);
    }

    const handleIncrement = (e) => {
        e.preventDefault();
        if (quantity < maxSize) {
            
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    }

    const handleDecrement = (e) => {
        e.preventDefault();
        if (quantity > 1) {
            
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    }

    const total = (price*quantity).toFixed(2);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="rounded-md modalReveal "
        >

            <Card
                className="rounded-lg h-full bg-stone-50 py-0 px-0 shadow-md overflow-hidden"
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    height: 743
                }}
            >
                <Grid container className="ps-3 py-2 bg-stone-50">
                    <img className="w-8 ms-2" src="/assets/images/mailIcon.png" />
                    <span className="ps-4 my-auto text-lg text-dark-1 fw-semibold ">animeClothing@gmail.com</span>
                </Grid>

                <CardHeader className="mx-0  bg-stone-100 shadow-none">
                    <img src={"/assets/uploaded/" + imageUrl} alt="" style={{ height: "500px" }} className=" object-cover w-full px-1 rounded-lg" />
                </CardHeader>

                <form onSubmit={(e) => { handleFormSubmit(e) }}>
                    <CardBody className="w-full pb-4 pt-3 bg-stone-100">
                        <Typography color="gray" className="underline font-semibold text-lg text-center text-stone-600 opacity-75" >
                            {description}
                        </Typography>

                        <Grid container className="ps-4 pt-4">

                            <Grid item xs={6} className="text-start font-semibold text-stone-600 my-auto px-5 pb-2">
                                <span className="font-bold text-4xl pe-1">
                                    $
                                </span>
                                <span className="ps-4 text-2xl">
                                    {total}
                                </span>
                            </Grid>

                            <Grid item xs={6}  >

                                <Grid container>
                                    
                                    <Grid item xs={7}>
                                        <ThemeProvider theme={theme_textF_login}>
                                            <TextField
                                                onChange={(e) => { handleInputChange(e, setQuantity) }}
                                                value={quantity}
                                                style={{ paddingTop: "2px" }}
                                                InputProps={{
                                                    inputProps: {
                                                        readOnly: true,
                                                        style: {
                                                            textAlign: "center",
                                                            fontSize: 19,
                                                            margin: "-3px"
                                                        }
                                                    }
                                                }}
                                            />
                                        </ThemeProvider>
                                    </Grid>
                                    <Grid item xs={5} >
                                        <Grid className="flex justify-center relative">
                                            <button onClick={(e) => {handleIncrement(e)}} className="cart_btn"><span style={{position:"relative", bottom: "9px", left: "0.29px" ,fontWeight: "bolder" }}> + </span></button>
                                        </Grid>
                                        <Grid className="flex justify-center relative top-3">
                                            <button onClick={(e) => {handleDecrement(e)}} className="cart_btn"> <span style={{position:"relative", bottom: "10.8px", left: "0.29px" ,fontSize: "36px" }}> - </span> </button>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>

                        </Grid>

                    </CardBody>

                    <CardFooter className="py-0 bg-stone-100">
                        <Grid container spacing={0} >
                            <Grid item xs={6}>
                                <Button
                                    onClick={handleClose}
                                    ripple={false}
                                    fullWidth={true}
                                    className="text-stone-500 font-extrabold hover:text-stone-50 hover:bg-stone-400 rounded-none bg-stone-50 transition ease-out duration-200"
                                >
                                    C A N C E L
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    type="submit"
                                    ripple={false}
                                    fullWidth={true}
                                    className="text-stone-600 font-extrabold bg-stone-50 hover:bg-stone-600 hover:text-stone-50 rounded-none transition ease-out duration-200"
                                >
                                    P U R C H A S E
                                </Button>
                            </Grid>
                        </Grid>
                    </CardFooter>
                </form>
            </Card>

        </Modal>
    )
}

export default CartModal
