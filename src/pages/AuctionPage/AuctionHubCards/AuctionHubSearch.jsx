import { Card, Col, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BackImage from "../../../assets/images/Forza-Horizon-5-Playlist-Cars.png"

export default function AuctionHubSearch() {
  const [hovered, setHovered] = useState(false)

  return (
    <Col span={12} style={{ height: '100%' }}>
                  <Link to="/auctions">
        <Card style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        src={BackImage}
          onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={hovered ? "auctionHub__card" : "auctionHub__card_hovered"}>
                  <Typography.Text className="auctionHub__cardText">
                  Search auctions
            </Typography.Text>
        </Card>
      </Link>
      </Col>
  )
}
