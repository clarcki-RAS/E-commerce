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
import { Link } from "react-router-dom";
import CartModal from "@/components/CartModal";
import { Toast } from "@/components/Toast";

const Home = () => {

  const [selectedClothe, setSelectedClothe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [clothes, setClothes] = useState([]);

  const handleModalClose = () => {
    setSelectedClothe(null);
    setModalOpen(false);
  }

  function handleModalOpen(clothes) {
    setSelectedClothe(clothes);
    setModalOpen(true);
  }

  const handleCartSubmit = async (cartClothe) => {
    
    try {
      const cart = {
        clotheId: selectedClothe.id,
        buyerId: parseInt(localStorage.getItem('userId'), 10),
        quantity: cartClothe.quantity
      }

      await axios.put(`http://localhost:8080/api/cart/updateClothe/${parseInt(selectedClothe.id, 10)}`, {quantity:parseInt(cart.quantity, 10)});

      await axios.post("http://localhost:8080/api/cart/add", cart)
        .then(() => {

          handleModalClose();
          Toast.fire({
            icon: "success",
            title: "Clothe(s) added to cart"
          });
          fetchClothes();
        })

      console.log(cart);

    }
    catch (error) {
      Toast.fire({
        icon: "error",
        title: "Error while adding in your cart"
      });
      console.error('Error making cart', error);
      handleModalClose();
    }
  }

  useEffect(() => {
    fetchClothes();
  }, []);

  const fetchClothes = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/clothes/home/${localStorage.getItem('userId')}`);
      setClothes(response.data)
    }
    catch (error) {
      console.log("Error while retrieving clothes list", error);
    }
  }


  return (
    <>
      <div className="bg-stone-100 rounded-lg pagination" style={{ maxHeight: 'calc(100vh - 90px)', overflowY: 'auto' }}>

        <CartModal open={modalOpen} handleClose={handleModalClose} handleCartSubmit={handleCartSubmit} clothesData={selectedClothe} />

        <Grid container spacing={2} className="px-4 mt-2">

          {clothes.map((clothe) => (
            <Grid item xs={3} key={clothe.id} className="py-3 my-auto relative">
              <Card className=" w-full mx-auto rounded-lg " children={undefined} placeholder={undefined}>

                <CardHeader shadow={false} floated={false} className="h-96" children={undefined} placeholder={undefined}>
                  <img
                    src={"/assets/uploaded/" + clothe.imageUrl}
                    alt={clothe.imageUrl}
                    className="h-full w-full object-cover rounded"
                  />
                </CardHeader>

                <CardBody className="px-4 pb-2" children={undefined} placeholder={undefined}>
                  <div className="pt-2 pb-3 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-semibold text-lg" children={undefined} placeholder={undefined}>
                      {clothe.title}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium" children={undefined} placeholder={undefined}>
                      $ {clothe.price}
                    </Typography>
                  </div>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal opacity-75" children={undefined} placeholder={undefined}                  >
                    {clothe.description}
                  </Typography>
                  <Link to="/mail_clothes" onClick={() => {
                    localStorage.setItem('mailId', clothe.user.id);
                    localStorage.setItem('mailName', clothe.user.email);
                  }}>
                    <Grid container className="py-2 my-2 border hover:bg-stone-100 transition ease-out duration-200">
                      <img className="w-6 ms-2" src="/assets/images/mailIcon.png" />
                      <span className="ps-3 my-auto">{clothe.user.email}</span>
                    </Grid>
                  </Link>
                </CardBody>

                <CardFooter className="pt-0 overflow-hidden rounded-b-lg" children={undefined} placeholder={undefined}>
                  <Button
                    onClick={() => handleModalOpen(clothe)}
                    ripple={false}
                    fullWidth={true}
                    className="bg-stone-50 hover:bg-stone-600 text-stone-950 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 hover:text-stone-50 transition ease-in duration-150" children={undefined} placeholder={undefined}                  >
                    A d d <span className="px-2"> t o </span>C a r t
                  </Button>
                </CardFooter>

              </Card>
              <div className=" bg-gray-200 text-stone-950 font-semibold rounded-bl-3xl mt-2 absolute right-0 top-2 pt-1 pb-2 ">
                <span className="ps-4 pe-4 ">{
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
      </div>
    </>
  )
}

export default Home
