import React from "react";
import { Card, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import "./auctionPage.css"
import AuctionHubMyBids from "./AuctionHubCards/AuctionHubMyBids";
import AuctionHubMyAuctions from "./AuctionHubCards/AuctionHubMyAuctions";
import AuctionHubStart from "./AuctionHubCards/AuctionHubStart";

export default function AuctionsHub() {

  return (
      <div className="auctionsHub">
          <Row style={{ height: '85vh', margin: '0', padding: '20px', boxSizing: 'border-box' }}>
      <Col span={12} style={{ height: '100%' }}>
                  <Link to="/auctions">
                  <Card style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: "url(https://www.gtplanet.net/wp-content/uploads/2023/12/Forza-Horizon-5-Playlist-Cars.jpg)" }}>
                  <Typography.Text className="auctionHub__cardText">
                  Search auctions
            </Typography.Text>
        </Card>
      </Link>
      </Col>
      <Col span={12} style={{ height: '100%' }}>
                  <AuctionHubStart/>
                  <AuctionHubMyBids/>
                  <AuctionHubMyAuctions/>
        
      </Col>
    </Row>
    </div>
  );
}
