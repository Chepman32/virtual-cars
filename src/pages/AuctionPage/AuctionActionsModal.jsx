// AuctionActionsModal.js
import React from "react";
import { Modal, Spin } from "antd";
import "./auctionPage.css";
import { fetchAuctionCreator } from "../../functions";
import { useNavigate } from "react-router-dom";

const AuctionActionsModal = ({ visible, handleAuctionActionsCancel, selectedAuction, loadingBid, bid, buyCar, loadingBuy }) => {
  const navigate = useNavigate()
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
      <div className="auctionActionsModal__row" onClick={async () => {
        const user = await fetchAuctionCreator(selectedAuction.id)
        const { id } = user
        navigate(`/userPage/${id}`)
      }} >Row 4</div>
      <div className="auctionActionsModal__row" onClick={handleAuctionActionsCancel} >Row 5</div>
    </Modal>
  );
};

export default AuctionActionsModal;
