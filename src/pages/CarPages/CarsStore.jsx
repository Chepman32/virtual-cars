import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button, Modal, Form, Input, message, Select, Typography, Spin } from "antd";
import { generateClient } from 'aws-amplify/api';
import { listCars as listCarsQuery } from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import "./carsPage.css";
import CarDetailsModal from "./CarDetailsModal";
import CarCard from "./CarCard";
import { createNewUserCar, playSwitchSound, playOpeningSound, playClosingSound } from "../../functions";

const { Option } = Select;
const client = generateClient();

const CarsStore = ({ playerInfo, setMoney, money }) => {
 const [cars, setCars] = useState([]);
 const [visible, setVisible] = useState(false);
 const [loadingBuy, setLoadingBuy] = useState(false);
 const [selectedCar, setSelectedCar] = useState(null);
 const [form] = Form.useForm();
 const [carDetailsVisible, setCarDetailsVisible] = useState(false);
 const [selectedCarIndex, setSelectedCarIndex] = useState(0);
 const [carsLoading, setCarsLoading] = useState(true);

 const carsContainerRef = useRef(null);

 const fetchCars = useCallback(async () => {
   try {
     const carData = await client.graphql({ query: listCarsQuery });
     setCars(carData.data.listCars.items);
   } catch (error) {
     console.error("Error fetching cars:", error);
   } finally {
     setCarsLoading(false);
   }
 }, []);

 useEffect(() => {
   async function fetchAllCars() {
     await fetchCars();
   }
   fetchAllCars();
 }, [fetchCars]);

 useEffect(() => {
   const handleKeyDown = (event) => {
     const { key } = event;
     const carsCount = cars.length;
     if (key === "ArrowRight" && !carDetailsVisible) {
       setSelectedCarIndex((prevIndex) => (prevIndex + 1) % carsCount);
     } else if (key === "ArrowLeft" && !carDetailsVisible) {
       setSelectedCarIndex((prevIndex) => (prevIndex - 1 + carsCount) % carsCount);
     } else if (key === "ArrowDown" && !carDetailsVisible) {
       setSelectedCarIndex((prevIndex) => (prevIndex + 5) % carsCount); // Move down by 5 cars
     } else if (key === "ArrowUp" && !carDetailsVisible) {
       setSelectedCarIndex((prevIndex) => (prevIndex - 5 + carsCount) % carsCount); // Move up by 5 cars
     } else if (key === "Enter" && !carDetailsVisible) {
       setSelectedCar(cars[selectedCarIndex]);
       playOpeningSound();
       showCarDetailsModal();
     }
     key !== "Enter" && playSwitchSound();
   };

   document.addEventListener("keydown", handleKeyDown);
   return () => {
     document.removeEventListener("keydown", handleKeyDown);
   };
 }, [cars, selectedCarIndex, carDetailsVisible]);

 const buyCar = async (car) => {
   if (playerInfo && playerInfo.id) {
     playSwitchSound();
     setMoney(money - car.price);
     try {
       setLoadingBuy(true);

       await client.graphql({
         query: mutations.updateUser,
         variables: {
           input: {
             id: playerInfo.id,
             money: money - car.price,
           },
         },
       });

       // Create a new user-car association
       createNewUserCar(playerInfo.id, car.id);

       message.success('Car successfully bought!');
     } catch (err) {
       console.log(err);
       message.error('Error buying car');
     } finally {
       setLoadingBuy(false);
       setSelectedCar(null);
     }
   }
 };

 const showModal = () => {
   playOpeningSound();
   setVisible(true);
 };

 const showCarDetailsModal = () => {
   setCarDetailsVisible(true);
 };

 const handleCancel = () => {
   playClosingSound();
   setVisible(false);
 };

 const handleCarDetailsCancel = () => {
   playClosingSound();
   setCarDetailsVisible(false);
 };

 const createNewCar = async (values) => {
   const newCar = {
     make: values.make,
     model: values.model,
     year: parseInt(values.year),
     price: parseInt(values.price),
     type: values.type,
   };
   await client.graphql({
     query: mutations.createCar,
     variables: { input: newCar },
   });
   await fetchCars();
   setVisible(false);
   form.resetFields();
   message.success('Car created successfully!');
 };

 const getImageSource = (make, model) => {
   const imageName = `${make} ${model}.png`;
   return require(`../../assets/images/${imageName}`);
 };

 return (
   <div style={{ padding: '20px' }}>
     <Button type="primary" onClick={showModal} style={{ marginBottom: '20px' }}>
       Create New Car
     </Button>
     {carsLoading ? (
       <Spin size="large" fullscreen/>
     ) : (
       <div style={{ width: "100%", display: 'flex', flexDirection: 'row', flexWrap: "wrap" }} ref={carsContainerRef}>
         {cars.length && cars.map((car, index) => (
           <CarCard
             key={car.id + Math.random()}
             selectedCar={index === selectedCarIndex ? car : null}
             setSelectedCar={(car) => {
               setSelectedCar(car)
               setSelectedCarIndex(index)
               showCarDetailsModal()
             }}
             showCarDetailsModal={showCarDetailsModal}
             car={car}
             getImageSource={getImageSource}
           />
         ))}
       </div>
     )}

     <Modal
       visible={visible}
       title="Create a New Car"
       okText="Create"
       cancelText="Cancel"
       onCancel={handleCancel}
       onOk={() => {
         form
           .validateFields()
           .then((values) => {
             createNewCar(values);
           })
           .catch((info) => {
             console.log('Validate Failed:', info);
           });
       }}
     >
       <Form
         form={form}
         layout="vertical"
         initialValues={{ remember: true }}
         onFinish={(values) => createNewCar(values)}
       >
         <Form.Item name="make" label="Make" rules={[{ required: true, message: 'Please enter the make!' }]}>
           <Input />
         </Form.Item>
         <Form.Item name="model" label="Model" rules={[{ required: true, message: 'Please enter the model!' }]}>
           <Input />
         </Form.Item>
         <Form.Item name="year" label="Year" rules={[{ required: true, message: 'Please enter the year!' }]}>
           <Input type="number" />
         </Form.Item>
         <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the price!' }]}>
           <Input type="number" />
         </Form.Item>
         <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select the type!' }]}>
           <Select>
             <Option value="regular">Regular</Option>
             <Option value="epic">Epic</Option>
             <Option value="legendary">Legendary</Option>
           </Select>
         </Form.Item>
       </Form>
     </Modal>

     <CarDetailsModal
       visible={carDetailsVisible && selectedCar !== null}
       handleCancel={handleCarDetailsCancel}
       selectedCar={selectedCar}
       buyCar={buyCar}
       loadingBuy={loadingBuy}
     />
   </div>
 );
};

export default CarsStore;
