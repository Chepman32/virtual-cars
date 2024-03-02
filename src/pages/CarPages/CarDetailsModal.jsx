import React from "react";
import { Modal, Spin } from "antd";
import "./carsPage.css";

const CarDetailsModal = ({ visible, handleCancel, selectedCar, buyCar, loadingNewAuction, loadingBuy, forAuction, showNewAuction }) => {
  const rowStyle = {
    height: '10vh', // Set height to 10% of the viewport height
    backgroundColor: 'green', // Set green background color
    marginBottom: '1px', // Add margin between rows
  };

  return (
      <Modal
          centered
          className="carDetailsModal"
          width={window.innerWidth * 0.5}
      visible={visible}
      title="Car Details"
      onCancel={handleCancel}
      footer={null}
    >
      {
        !forAuction && <div className="carDetailsModal__row" onClick={() => {
          buyCar(selectedCar)
  }} >{loadingBuy ? <Spin/> : "Buy"} </div>
          }
      <div className="carDetailsModal__row">Add to favorites</div>
      {
        forAuction && <div className="carDetailsModal__row" onClick={showNewAuction} >{loadingNewAuction ? <Spin/> : "Sell on auction"} </div>
      }
      <div className="carDetailsModal__row">Row 4</div>
      <div className="carDetailsModal__row">Row 5</div>
    </Modal>
  );
};

export default CarDetailsModal;
