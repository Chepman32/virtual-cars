import React, { useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import "./auctionPage.css";
import { fetchAuctionCreator, playSwitchSound } from "../../functions";
import { useNavigate } from "react-router-dom";
import AuctionActionsModalRow from "../../components/AuctionActionsModalRow/AuctionActionsModalRow";

const AuctionActionsModal = ({ visible, handleAuctionActionsCancel, selectedAuction, loadingBid, bid, buyCar, loadingBuy }) => {
  const navigate = useNavigate();

  const totalRows = 3;
  const [focusedRow, setFocusedRow] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
  
      if (visible) {
        if (key === "ArrowUp") {
          playSwitchSound();
          setFocusedRow((prevRow) => (prevRow === 0 ? totalRows - 1 : prevRow - 1));
        } else if (key === "ArrowDown") {
          playSwitchSound();
          setFocusedRow((prevRow) => (prevRow === totalRows - 1 ? 0 : prevRow + 1));
        } else if (key === "Enter") {
          switch (focusedRow) {
            case 0:
              bid(selectedAuction);
              break;
            case 1:
              buyCar();
              break;
            case 2:
              const handleOpenProfile = async () => {
                const user = await fetchAuctionCreator(selectedAuction.id);
                const { id } = user;
                navigate(`/userPage/${id}`);
              };
              handleOpenProfile();
              break;
            default:
              break;
          }
        }
      } else {
        setFocusedRow(0);
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, focusedRow, selectedAuction, bid, buyCar, navigate, totalRows]);
  
  return (
    <Modal
      centered
      className="carDetailsModal"
      width={window.innerWidth * 0.5}
      visible={visible}
      title="Car Details"
      onCancel={handleAuctionActionsCancel}
      footer={null}
    >
      <AuctionActionsModalRow text={loadingBid ? <Spin /> : "Make a bid"} handler={() => bid(selectedAuction)} selected={focusedRow === 0} />
      <AuctionActionsModalRow text={loadingBuy ? <Spin /> : "Buy out"} handler={buyCar} selected={focusedRow === 1} />
      <AuctionActionsModalRow
        text={loadingBuy ? <Spin /> : "Open user's profile"}
        handler={async () => {
        const user = await fetchAuctionCreator(selectedAuction.id);
        const { id } = user;
        navigate(`/userPage/${id}`);
      }}
        selected={focusedRow === 2}
      />
    </Modal>
  );
};

export default AuctionActionsModal;
