// AuctionActionsModal.js
import React from "react";
import { Modal, Spin } from "antd";
import "./auctionPage.css";

const AuctionActionsModal = ({ visible, handleAuctionActionsCancel, selectedAuction, loadingBid, bid, buyCar, loadingBuy }) => {
  return (
    <Modal
      centered
      className="carDetailsModal"
      width={window.innerWidth * 0.5}
      visible={visible}  // Change 'open' to 'visible'
      title="Car Details"
      onCancel={handleAuctionActionsCancel}
      footer={null}
    >
      <div className="auctionActionsModal__row" onClick={buyCar}>
        {loadingBuy ? <Spin /> : "Buy"}
      </div>
      <div className="auctionActionsModal__row" onClick={() => bid(selectedAuction)}>
        {loadingBid ? <Spin /> : "Make a bid"}
      </div>
      <div className="auctionActionsModal__row">Row 4</div>
      <div className="auctionActionsModal__row" onClick={handleAuctionActionsCancel} >Row 5</div>
    </Modal>
  );
};

export default AuctionActionsModal;
