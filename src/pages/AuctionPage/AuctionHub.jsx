import React, { useState, useEffect, useCallback } from "react";
import { Card, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import "./auctionPage.css";
import AuctionHubMyBids from "./AuctionHubCards/AuctionHubMyBids";
import AuctionHubMyAuctions from "./AuctionHubCards/AuctionHubMyAuctions";
import AuctionHubStart from "./AuctionHubCards/AuctionHubStart";
import AuctionHubSearch from "./AuctionHubCards/AuctionHubSearch";

export default function AuctionsHub() {
  const [focusedTile, setFocusedTile] = useState("search");

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowRight" && focusedTile === "search") {
        setFocusedTile("start");
      } else if (event.key === "ArrowLeft" && focusedTile !== "search") {
        setFocusedTile("search");
      } else if (event.key === "ArrowDown") {
        setFocusedTile((prevTile) =>
          prevTile === "start" ? "mybids" : prevTile === "mybids" ? "myauctions" : prevTile === "myauctions" ? "myauctions" : prevTile
        );
      } else if (event.key === "ArrowUp") {
        setFocusedTile((prevTile) =>
          prevTile === "myauctions" ? "mybids" : prevTile === "mybids" ? "start" : prevTile
        );
      }
    },
    [focusedTile]
  );
  
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedTile, handleKeyDown]);

  return (
    <div className="auctionsHub" onKeyDown={handleKeyDown} tabIndex={0}>
      <h3 onClick={() => console.log(focusedTile)}>focused</h3>
      <Row style={{ height: "90vh", margin: "0", padding: "20px", boxSizing: "border-box" }}>
        <AuctionHubSearch focused={focusedTile === "search"} />
        <Col span={12} style={{ height: "100%" }}>
          <AuctionHubStart focused={focusedTile === "start"} />
          <AuctionHubMyBids focused={focusedTile === "mybids"} />
          <AuctionHubMyAuctions focused={focusedTile === "myauctions"} />
        </Col>
      </Row>
    </div>
  );
}