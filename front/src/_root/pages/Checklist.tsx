import CartDeleteModal from "@/components/CartDeleteModal";
import DonutChart from "@/components/DonutChart";
import { Toast } from "@/components/Toast";
import { Button, Typography } from "@material-tailwind/react";
import { Box, Grid, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Checklist = () => {

    const [clothes, setClothes] = useState([]);

    const [clothesData, setClothesData] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCart, setSelectedCart] = useState(null);

    const [chartData, setChartData] = useState([]);

    const fetchCart = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/cart/chartData/${localStorage.getItem('userId')}`);
            setChartData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleModalOpen = (cartId) => {
        setSelectedCart(cartId);
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setSelectedCart(null);
        setModalOpen(false);
    }

    const handleCartCancel = async () => {
        try {

            const cartItem = {
                quantity: selectedCart.quantity
            }

            await axios.put(`http://localhost:8080/api/cart/updateClotheCart/${selectedCart.clothesId.id}`, cartItem)

            await axios.delete(`http://localhost:8080/api/cart/cancel/${selectedCart.id}`)
                .then(() => {
                    Toast.fire({
                        icon: "info",
                        title: "Your cart got cancelled"
                    });
                    handleModalClose();
                })
                .catch((error) => {
                    Toast.fire({
                        icon: "error",
                        title: "Error during deleting"
                    })
                    handleModalClose();
                    console.log(error)
                })

        } catch (error) {
            console.error('Error deleting cart:', error);
        }

        const response = await axios.get(`http://localhost:8080/api/cart/listDate/${parseInt(localStorage.getItem('userId'), 10)}?date=${formaterDate(selectedCart.dateCommande)}`);
        setClothesData(response.data);
        fetchCart();

    }

    useEffect(() => {
        fetchClothes();
        fetchCart();
    }, []);

    const fetchClothes = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/cart/list/${parseInt(localStorage.getItem('userId'), 10)}`);

            setClothes(response.data);
        }
        catch (error) {
            console.log("Error while retrieving your cart", error)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    };

    const dateDay = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}`;
    }

    const dateMonth = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleString('default', { month: 'long' })}`;
    }

    const dateYear = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}`;
    }

    const formaterDate = (date) => {
        const parsedDate = new Date(date);

        const year = parsedDate.getFullYear();
        const month = ('0' + (parsedDate.getMonth() + 1)).slice(-2); // Months are zero-based, so we add 1 and pad with leading zero if necessary
        const day = ('0' + parsedDate.getDate()).slice(-2); // Pad with leading zero if necessary

        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    };

    const handleButtonClick = async (date) => {
        try {

            const formatedDate = formaterDate(date);
            const response = await axios.get(`http://localhost:8080/api/cart/listDate/${parseInt(localStorage.getItem('userId'), 10)}?date=${formatedDate}`);
            setClothesData(response.data);

        } catch (error) {
            console.error('Error while fetching data:', error);
        }
    };

    // const calculateTotal = () => {
    //     let total = 0;
    //     Object.keys(clothes).forEach(date => {
    //         total += Object.keys(clothes[date]).reduce((acc, total) => acc + parseFloat(total), 0);
    //     });
    //     return total;
    // };


    return (
        <>
            <div className="bg-stone-100 rounded-lg pagination h-screen w-full border border-stone-100 overflow-hidden relative" style={{ maxHeight: 'calc(100vh - 90px)' }} >
                <Grid className="w-full h-full " container>

                    <CartDeleteModal open={modalOpen} handleModalSubmit={handleCartCancel} handleClose={handleModalClose} cartQuantity={selectedCart} />

                    <Grid item xs={9} >

                        <Grid container className="ps-4 py-2 bg-white border-e border-stone-100">
                            <img className="w-8 ms-2" src="/assets/images/calendar-3906791_1280.jpg" />

                            {Object.keys(clothesData).map(date => (
                                <span key={date} className="ps-10 my-auto text-lg text-dark-1 fw-semibold ">
                                    {dateDay(date)}
                                    <span className="mx-3">
                                        {dateMonth(date)}
                                    </span>
                                    {dateYear(date)}
                                </span>
                            ))}

                        </Grid>


                        <Grid style={{ maxHeight: 'calc(100vh - 145px)', overflowY: 'auto' }} >

                            <Grid container xs={3} style={{
                                height: "280px",
                                width: "280px"
                            }} className="bg-white rounded-tr-lg mt-2 flex items-center absolute bottom-0 left-0 z-30">
                                <Grid container xs={12} className="relative h-full w-full">

                                    <DonutChart />

                                    <Grid className=" position-absolute bottom-0">
                                        <Grid container className="font-bold text-stone-700 px-3">
                                            <Grid xs={6}></Grid>
                                            <Grid xs={6} className="flex justify-start">
                                                <Grid item xs={2} className="w-full h-full flex items-center"> <Paper className="w-6 h-5 rounded-md" style={{ background: "#776B5D" }}></Paper> </Grid>
                                                <Grid >
                                                    <span className="px-2 text-lg">$</span> {chartData.sum ? (<span>{(chartData.sum).toFixed(2)}</span>) : (<span></span>)}
                                                </Grid>
                                            </Grid>
                                            <Grid xs={6} className="flex justify-start py-3">
                                                <Grid item xs={2} className="w-full h-full flex items-center"> <Paper className="w-6 h-5 rounded-md" style={{ background: "#B0A695" }}></Paper> </Grid>
                                                <Grid >
                                                    <span className="px-2 text-lg">$</span> {chartData.max ? (<span>{(chartData.max).toFixed(2)}</span>) : (<span></span>)}
                                                </Grid>
                                            </Grid>
                                            <Grid xs={6} className="flex justify-start py-3">
                                                <Grid item xs={2} className="w-full h-full flex items-center "> <Paper className="w-6 h-5 rounded-md" style={{ background: "#EBE3D5" }}></Paper> </Grid>
                                                <Grid >
                                                    <span className="px-2 text-lg">$</span> {chartData.min ? (<span>{(chartData.min).toFixed(2)}</span>) : (<span></span>)}
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>

                            <div>
                                {Object.keys(clothesData).map(date => (
                                    <Grid key={date}>
                                        {
                                            clothesData[date].map((cartItem, index) => (
                                                <Box className="mx-4 my-4 h-24 rounded-lg bg-white relative" key={index}>

                                                    <Grid container>
                                                        <Grid item xs={1}></Grid>
                                                        <Grid item xs={1} className=" bg-gray-200 h-12 flex items-center rounded-e border-r border-stone-200 font-bold pe-1 my-auto absolute left-0 right-0 top-0 bottom-0 z-20 shadow-md shadow-gray-300" style={{ "borderStartEndRadius": "40px", "borderEndEndRadius": "40px" }}>
                                                            <span className="ps-1 text-xl text-stone-950 font-semibold opacity-80 mx-auto ">
                                                                {cartItem.quantity}
                                                            </span>
                                                        </Grid>

                                                        <Grid item xs={2} className="h-24 w-full flex items-center ps-4">
                                                            <Paper className=" ms-2 w-full mx-auto overflow-hidden" style={{ height: "88px" }}>
                                                                <img src={"/assets/uploaded/" + cartItem.clothesId.imageUrl} className=" object-cover h-fit w-fit img-fluid" />
                                                            </Paper>
                                                        </Grid>

                                                        <Grid item xs={4} className="h-24 w-full flex items-center border-r border-stone-200">
                                                            <Typography color="gray" className="mx-auto font-semibold text-lg text-center opacity-85" >
                                                                {cartItem.clothesId.description}
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={1} className=" h-24 w-full flex items-center border-r text-stone-600 font-semibold opacity-80 border-stone-200 ">
                                                            <div className="mx-auto">
                                                                <span className="font-bold text-xl ">
                                                                    $
                                                                </span>
                                                                <span className="ps-1 text-lg">
                                                                    {cartItem.price}
                                                                </span>
                                                            </div>
                                                        </Grid>

                                                        <Grid item xs={2} className=" h-24 w-full flex items-center ">
                                                            <div className="mx-auto">
                                                                <span className="font-bold text-2xl ">
                                                                    $
                                                                </span>
                                                                <span className="ps-1 text-stone-950 text-xl">
                                                                    {(cartItem.price * cartItem.quantity).toFixed(2)}
                                                                </span>
                                                            </div>
                                                        </Grid>

                                                        <Grid item xs={2} className=" h-24 w-full flex items-center ">

                                                            <div className="d-grid gap-2 col-11 mx-auto">
                                                                <Button
                                                                    onClick={() => { handleModalOpen(cartItem) }}
                                                                    className="button_cancel text-gray-500 text-sm"
                                                                    ripple={false}
                                                                    fullWidth={true} >
                                                                    C A N C E L
                                                                </Button>
                                                            </div>

                                                        </Grid>

                                                    </Grid>

                                                </Box>
                                            ))}
                                    </Grid>
                                ))
                                }
                            </div>
                        </Grid>

                    </Grid>

                    <Grid item xs={3} className="bg-stone-50 rounded-e-lg">

                        <Grid>
                            <img src="/assets/images/9960440.jpg" />
                        </Grid>

                        <Grid style={{ maxHeight: '450px', overflowY: 'auto' }}>

                            <Grid>
                                <div className="d-grid gap-2 col-11 mx-auto my-6">

                                    {Object.keys(clothes).map(date => {
                                        // Calculate total for current date
                                        const totalForDate = Object.keys(clothes[date]).reduce((acc, total) => acc + parseFloat(total), 0);

                                        return (

                                            <button key={date} className="cart_date px-0" onClick={() => { handleButtonClick(date) }}>
                                                <Grid container>
                                                    <Grid item xs={6} className="font-semibold text-stone-950 opacity-85">{formatDate(date)}</Grid>

                                                    <Grid item xs={6} className="text-stone-600 font-semibold opacity-80">$ {(totalForDate).toFixed(2)}</Grid>
                                                </Grid>
                                            </button>
                                        );
                                    })}

                                </div>
                            </Grid>

                        </Grid>

                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Checklist
