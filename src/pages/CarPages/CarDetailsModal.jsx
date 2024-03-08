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
  const [focusedRow, setFocusedRow] = useState(0); // Initial focus is on the first row

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      const numRows = forAuction ? 5 : 4;

      if (visible) {
        if (key === "ArrowUp") {
          setFocusedRow((prevRow) => (prevRow === 0 ? numRows - 1 : prevRow - 1)); // When on the first row and up key is pressed, focus goes to the last row
        } else if (key === "ArrowDown") {
          setFocusedRow((prevRow) => (prevRow === numRows - 1 ? 0 : prevRow + 1));
        } else if (key === "Enter") {
          switch (focusedRow) {
            case 0:
              !forAuction && buyCar(selectedCar);
              break;
            case 2:
              showNewAuction();
              break;
            default:
              break;
          }
        }
      } else {
        // Reset focusedRow when the modal is closed
        setFocusedRow(0); // Focus is set to the first row when the modal is closed
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, focusedRow, selectedCar, buyCar, showNewAuction, forAuction]);

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
      <CarDetailsModalRow text="Add to favorites" selected={focusedRow === 0} />
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