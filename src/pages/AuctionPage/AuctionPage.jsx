import React, { useState, useEffect, useCallback } from "react";
import { Hub } from 'aws-amplify/utils';
import "@aws-amplify/ui-react/styles.css";
import { List, Form, Input, Button, Card, Col, Row, Typography, Flex, Select, message, Spin, Space } from "antd";
import { generateClient } from 'aws-amplify/api';
import * as mutations from '../../graphql/mutations';
import { listAuctions as listAuctionsQuery } from '../../graphql/queries';
import { addUserToAuction, calculateTimeDifference, fetchUserBiddedList, fetchAuctionUser, fetchUserCarsRequest } from "../../functions";
import AuctionPageItem from "./AuctionPageItem";
import { SelectedAuctionDetails } from "./SelectedAuctionDetails";
import AuctionActionsModal from "./AuctionActionsModal";
import NewAuctionModal from "./NewAuctionModal";

const { Option } = Select;
const client = generateClient();

export default function AuctionPage({ playerInfo, setMoney, money }) {
  const [auctions, setAuctions] = useState([]);
  const [userCars, setUserCars] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [auctionDuration, setAuctionDuration] = useState(1);
  const [player, setPlayer] = useState("");
  const [loadingBid, setLoadingBid] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [form] = Form.useForm();
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [auctionActionsVisible, setAuctionActionsVisible] = useState(false);

  const handleAuctionActionsShow = () => {
    setAuctionActionsVisible(true);
  };

  const handleAuctionActionsCancel = () => {
    setAuctionActionsVisible(false);
  };

  useEffect(() => {
    async function fetchUserCars() {
      setUserCars(await fetchUserCarsRequest(playerInfo.id))
    }
    fetchUserCars()
  }, [playerInfo.id]);

  const handleCancel = () => {
    setVisible(false);
  };

  const listAuctions = useCallback(async () => {
    try {
      const auctionData = await client.graphql({ query: listAuctionsQuery });
      const auctions = auctionData.data.listAuctions.items.map(auction => {
        const endTime = new Date(parseInt(auction.endTime) * 1000);
        const timeLeft = calculateTimeDifference(endTime);

        return {
          ...auction,
          endTime,
          timeLeft
        };
      });
      const filtered = auctions.filter(auction => auction.player !== playerInfo.nickname)

      setAuctions(filtered);
      filtered.length > 0 && !selectedAuction && setSelectedAuction(filtered[0]);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  }, []);

  const increaseBid = async (auction) => {
    try {
      const userBidded = await fetchUserBiddedList(playerInfo.id);
      const isBidded = userBidded.some((ub) => ub.auctionId === auction.id);
  
      setLoadingBid(true);
      let increasedBidValue = Math.floor(auction.currentBid * 1.1) || Math.round(auction.minBid * 1.1);
  
      if (increasedBidValue >= auction.buy) {
        buyItem();
        return;
      }
  
      // Determine the last bid value for this auction
      let lastBidValue = 0;
      const lastBid = userBidded.find((ub) => ub.auctionId === auction.id);
      if (lastBid) {
        lastBidValue = lastBid.bidValue;
      }
  
      // Calculate money decrease based on the last bid value
      let moneyDecrease = increasedBidValue - lastBidValue;
  
      if (auction.lastBidPlayer === playerInfo.nickname) {
        moneyDecrease = increasedBidValue - auction.currentBid;
      }
  
      if (moneyDecrease > money) {
        // Handle insufficient funds
        console.log('Insufficient funds');
        return;
      }
  
      // Update user's money
      setMoney(money - moneyDecrease);
  
      // Create a bid object with auction ID and bid value
      const bidObject = {
        auctionId: auction.id,
        bidValue: increasedBidValue,
      };
  
      // Update the user's bidded list by adding the new bid object
      const updatedBiddedList = [...userBidded, bidObject];
  
      // Transform the updatedBiddedList into the format expected by the updateUser mutation
      const bidInputs = updatedBiddedList.map(({ auctionId, bidValue }) => ({ auctionId, bidValue }));
  
      // Update the user data
      const updatedUser = {
        id: playerInfo.id,
        money: money - moneyDecrease, // Deduct the money decrease
        bidded: bidInputs,
      };
  
      // Update the user data including the new bid object
      await client.graphql({
        query: mutations.updateUser,
        variables: {
          input: updatedUser,
        },
      });
  
      // Update the auction data
      const updatedAuction = {
        id: auction.id,
        carName: auction.carName,
        player: auction.player,
        buy: auction.buy,
        minBid: auction.minBid,
        currentBid: increasedBidValue,
        endTime: auction.endTime,
        lastBidPlayer: playerInfo.nickname,
        status: increasedBidValue < auction.buy ? "active" : "finished",
      };
  
      await client.graphql({
        query: mutations.updateAuction,
        variables: { input: updatedAuction },
      });
  
      handleCancel();
      message.success('Bid successfully increased!');
      listAuctions();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingBid(false);
      setAuctionActionsVisible(false);
    }
  };
  
  const buyItem = async () => {
    try {
      setLoadingBuy(true);
      const updatedBiddedList = selectedAuction.bidded ? [...selectedAuction.bidded, playerInfo.nickname] : [playerInfo.nickname];
      const increasedBidValue = Math.round(selectedAuction.currentBid * 1.1) || Math.round(selectedAuction.minBid * 1.1);
      // Update the auction item to reflect the purchase
      const updatedAuctionInput = {
        id: selectedAuction.id,
        make: selectedAuction.make,
        model: selectedAuction.model,
        year: selectedAuction.year,
        carId: selectedAuction.carId,
        currentBid: selectedAuction.buy, // Set currentBid to the buy value
        endTime: selectedAuction.endTime,
        status: "Finished",
        bidded: updatedBiddedList,
        lastBidPlayer: playerInfo.nickname,
        player: selectedAuction.player,
        buy: selectedAuction.buy, // Set buy to the same buy value
        minBid: selectedAuction.minBid,
        type: selectedAuction.type
      };
      // Fetch auction user
      const auctionUser = await fetchAuctionUser(selectedAuction.id); // Corrected here
      console.log("auctionUser", auctionUser)
      // Decrease the buyer's money
      setMoney(money - selectedAuction.buy); // Corrected here
  
      // Increase the seller's money
      await client.graphql({
        query: mutations.updateUser,
        variables: {
          input: {
            id: auctionUser.id,
            money: auctionUser.money + selectedAuction.buy,
          },
        },
      });
  
      // Update the auction item and perform other necessary actions
      await Promise.all([
        client.graphql({
          query: mutations.updateUser,
          variables: {
            input: {
              id: playerInfo.id,
              money: money - selectedAuction.buy,
            },
          },
        }),
        client.graphql({
          query: mutations.updateAuction,
          variables: { input: updatedAuctionInput },
        }),
      ]);
  
      // Inform the user about the successful purchase
      message.success('Car successfully bought!');
      
      // Refresh the auction list
      listAuctions();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingBuy(false);
      setAuctionActionsVisible(false)
    }
  };
  
  const listener = async (data) => {
    const { nickname } = data?.payload?.data;
    setPlayer(nickname);
  };

  useEffect(() => {
    listAuctions();
    Hub.listen('auth', listener);
  }, [listAuctions]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      setSelectedAuction((prevAuction) => {
        const newIndex = auctions.indexOf(prevAuction) - 1;
        return newIndex >= 0 ? auctions[newIndex] : prevAuction;
      });
    } else if (e.key === "ArrowDown") {
      setSelectedAuction((prevAuction) => {
        const newIndex = auctions.indexOf(prevAuction) + 1;
        return newIndex < auctions.length ? auctions[newIndex] : prevAuction;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [auctions]);

  const handleItemClick = (clickedAuction) => {
    setSelectedAuction(clickedAuction);
    handleAuctionActionsShow();
  };

  return (
    <div className="auctionPage" >
      <div style={{ flex: 1 }}>
        <div className="auction-items-container">
          {auctions.map((auction) => (
            <AuctionPageItem
              key={auction.id}
              setSelectedAuction={setSelectedAuction}
              auction={auction}
              index={auctions.indexOf(auction)}
              increaseBid={increaseBid}
              isSelected={auction === selectedAuction}
              handleAuctionActionsShow={handleAuctionActionsShow}
              handleItemClick={handleItemClick}
            />
          ))}
        </div>
      </div>
      <SelectedAuctionDetails selectedAuction={selectedAuction} />
      <AuctionActionsModal
        visible={auctionActionsVisible}
        handleAuctionActionsCancel={handleAuctionActionsCancel}
        selectedAuction={selectedAuction}
        bid={increaseBid}
        loadingBid={loadingBid}
        buyCar={buyItem}
        loadingBuy={loadingBuy}
      />
    </div>
  );
}
