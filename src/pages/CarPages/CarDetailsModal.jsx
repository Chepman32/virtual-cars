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
  const [focusedRow, setFocusedRow] = useState(1); // Track the focused row index

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      const numRows = forAuction ? 5 : 4; // Adjust the number of rows based on the condition
      if (key === "ArrowUp") {
        setFocusedRow((prevRow) => (prevRow === 0 ? numRows - 1 : prevRow - 1)); // Move focus up
      } else if (key === "ArrowDown") {
        setFocusedRow((prevRow) => (prevRow === numRows - 1 ? 0 : prevRow + 1)); // Move focus down
      } else if (key === "Enter") {
        // Call handler function for selected row on Enter press
        switch (focusedRow) {
          case 0:
            !forAuction ? buyCar(selectedCar) : console.log("")
            break;
          case 2:
            showNewAuction();
            break;
          default:
            break;
        }
      }
    };
    !visible && setFocusedRow(1)
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedRow, selectedCar, buyCar, showNewAuction, forAuction, visible]);
  
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
      {!forAuction && (
        <CarDetailsModalRow
          handler={() => buyCar(selectedCar)}
          text={loadingBuy ? <Spin /> : "Buy"}
          selected={focusedRow === 0}
        />
      )}

      <CarDetailsModalRow
        text="Add to favorites"
        selected={focusedRow === 1}
      />

      {forAuction && (
        <CarDetailsModalRow
          handler={showNewAuction}
          text={loadingNewAuction ? <Spin /> : "Sell on auction"}
          selected={focusedRow === 2}
        />
      )}

      <CarDetailsModalRow text="Row 4" selected={focusedRow === 3} />
      <CarDetailsModalRow text="Row 5" selected={focusedRow === 4} />
    </Modal>
  );
};

export default CarDetailsModal;
