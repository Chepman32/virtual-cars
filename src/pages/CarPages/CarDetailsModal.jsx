import React, { useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import "./carsPage.css";
import CarDetailsModalRow from "./CarDetailsModalRow";

const CarDetailsModal = ({
  visible,
  handleCancel,
  selectedCar,
  buyCar,
  loadingNewAuction,
  loadingBuy,
  forAuction,
  showNewAuction,
}) => {
  const totalRows = 4
  const [focusedRow, setFocusedRow] = useState(0); // Initial focus is on the first row

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (visible) {
        if (key === "ArrowUp") {
          setFocusedRow((prevRow) => (prevRow === 0 ? totalRows - 1 : prevRow - 1)); // Adjust the logic for ArrowUp key
        } else if (key === "ArrowDown") {
          setFocusedRow((prevRow) => (prevRow === totalRows - 1 ? 0 : prevRow + 1)); // Adjust the logic for ArrowDown key
        } else if (key === "Enter") {
          switch (focusedRow) {
            case 0:
              if (!forAuction) {
                buyCar(selectedCar);
              }
              break;
            case 1:
              if (forAuction) {
                showNewAuction();
              } else {
                // Add to favorites functionality goes here
              }
              break;
            case 2:
              // Row 2 functionality goes here
              break;
            case 3:
              // Row 3 functionality goes here
              break;
            case 4:
              // Last row functionality goes here
              break;
            default:
              break;
          }
        }
      } else {
        // Reset focusedRow when the modal is closed
        setFocusedRow(0);
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, focusedRow, selectedCar, buyCar, showNewAuction, forAuction, totalRows]);
  
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
      <h3 onClick={() => console.log("focusedRow", focusedRow)}>focusedRow</h3>
      {!forAuction && (
        <CarDetailsModalRow
          handler={() => buyCar(selectedCar)}
          text={loadingBuy ? <Spin /> : "Buy"}
          selected={focusedRow === 0}
        />
      )}
      {forAuction && (
        <CarDetailsModalRow
          handler={showNewAuction}
          text={loadingNewAuction ? <Spin /> : "Sell on auction"}
          selected={focusedRow === 0}
        />
      )}
      <CarDetailsModalRow text="Add to favorites" selected={focusedRow === 1} />
      <CarDetailsModalRow text="Row 2" selected={focusedRow === 2} />
      <CarDetailsModalRow text="Row 3" selected={focusedRow === 3} />
    </Modal>
  );
};

export default CarDetailsModal;
