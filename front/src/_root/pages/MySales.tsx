import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import ClothesUptModal from "@/components/ClothesUptModal";
import { Toast } from "@/components/Toast";
import ClothesDeleteModal from "@/components/ClothesDeleteModal";

const MySales = () => {

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [selectedClothe, setSelectedClothe] = useState(null);

    const [clothes, setClothes] = useState([]);

    function handleUpdateOpen(clothe) {
        setSelectedClothe(clothe);
        setUpdateOpen(true);
    }

    const handleUpdateClose = () => {
        setSelectedClothe(null);
        setUpdateOpen(false);
    }

    function handleDeleteOpen(clotheId) {
        setSelectedClothe(clotheId);
        setDeleteOpen(true);
    }

    const handleDeleteClose = () => {
        setSelectedClothe(null);
        setDeleteOpen(false);
    }

    const handleDeleteSubmit = async () => {
        await axios.put(`http://localhost:8080/api/clothes/delete/${selectedClothe}`)
            .then(() => {
                Toast.fire({
                    icon: "info",
                    title: "Your clothe was deleted"
                });
                handleDeleteClose();
                fetchClothes();
            })
            .catch((error) => {
                Toast.fire({
                    icon: "error",
                    title: "Error during deleting"
                })
                handleDeleteClose();
                console.log(error)
            })
    }

    const handleUpdateSubmit = async (updatedClotheData) => {
        try {
            const updatedClothe = {
                clotheId: selectedClothe.id,
                title: updatedClotheData.title,
                description: updatedClotheData.description,
                price: updatedClotheData.price,
                quantity: updatedClotheData.quantity
            }

            await axios.put(`http://localhost:8080/api/clothes/update/${selectedClothe.id}`, updatedClothe)
                .then(() => {
                    Toast.fire({
                        icon: "info",
                        title: "Your clothe was updated"
                    });
                    handleUpdateClose();
                    fetchClothes();
                })
                .catch((error) => {
                    Toast.fire({
                        icon: "error",
                        title: "Error while updating"
                    });
                    handleUpdateClose();
                    console.log(error)
                })

        }
        catch (error) {
            console.error('Error updating clothe:', error);
        }
    };

    useEffect(() => {
        fetchClothes();
    }, []);

    const fetchClothes = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/clothes/list/${localStorage.getItem('userId')}`);
            setClothes(response.data)
        }
        catch (error) {
            console.log("Error while retrieving clothes list", error);
        }
    }


    return (
        <>
            <div className="bg-stone-100 rounded-lg pagination" >
                <Grid className="w-full">
                    <div>
                        <Grid container className="ps-4 py-2 bg-white">
                            <img className="w-8 ms-2" src="/assets/images/mailIcon.png" />
                            <span className="ps-4 my-auto text-lg text-dark-1 fw-semibold ">{localStorage.getItem('Email')}</span>
                        </Grid>
                    </div>
                    <Grid container spacing={2} className="px-4 mt-2 " style={{ maxHeight: 'calc(100vh - 145px)', overflowY: 'auto' }}>

                        <ClothesDeleteModal open={deleteOpen} handleClose={handleDeleteClose} handleDeleteSubmit={handleDeleteSubmit} />
                        <ClothesUptModal open={updateOpen} handleClose={handleUpdateClose} handleUpdateSubmit={handleUpdateSubmit} clotheData={selectedClothe} />

                        {clothes.map((clothe) => (
                            <Grid item xs={3} key={clothe.id} className="py-3 my-auto relative" >
                                <Card className=" w-full mx-auto rounded-lg ">
                                    <CardHeader shadow={false} floated={false} className="h-96">
                                        <img
                                            src={"/assets/uploaded/" + clothe.imageUrl}
                                            alt={clothe.imageUrl}
                                            className="h-full w-full object-cover rounded"
                                        />
                                    </CardHeader>
                                    <CardBody className="px-4 pb-2">
                                        <div className="pt-2 pb-3 flex items-center justify-between">
                                            <Typography color="blue-gray" className="font-semibold text-lg">
                                                {clothe.title}
                                            </Typography>
                                            <Typography color="blue-gray" className="font-medium">
                                                $ {clothe.price}
                                            </Typography>
                                        </div>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="font-normal opacity-75"
                                        >
                                            {clothe.description}
                                        </Typography>
                                    </CardBody>
                                    <CardFooter className="pt-0 overflow-hidden rounded-b-lg">
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Button
                                                    onClick={() => handleUpdateOpen(clothe)}
                                                    ripple={false}
                                                    fullWidth={true}
                                                    className="text-indigo-900 font-extrabold hover:text-indigo-50 hover:bg-indigo-300 rounded-none transition ease-out duration-200"
                                                >
                                                    E D I T
                                                </Button>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button
                                                    onClick={() => handleDeleteOpen(clothe.id)}
                                                    ripple={false}
                                                    fullWidth={true}
                                                    className="text-pink-900 font-extrabold hover:text-indigo-50 hover:bg-pink-700 rounded-none transition ease-out duration-200"
                                                >
                                                    D E L E T E
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </CardFooter>
                                </Card>
                                <div className="bg-gray-200 text-stone-950 font-semibold rounded-bl-3xl mt-2 absolute right-0 top-2 pt-1 pb-2 ">
                                    <span className="px-4 ">{
                                        clothe.quantity === 1 ? (
                                            <span>Unique</span>
                                        ) : (
                                            <span>{clothe.quantity}</span>
                                        )
                                    }</span>
                                </div>
                            </Grid>
                        ))}


                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default MySales
