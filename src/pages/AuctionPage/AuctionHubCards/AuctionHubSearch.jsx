import { Card, Col, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BackImage from "../../../assets/images/Forza-Horizon-5-Playlist-Cars.png"

export default function AuctionHubSearch({focused}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Col span={12} style={{ height: '100%' }} className={focused ? "activeCard" : ""} >
      <Link to="/auctions">
        <Card style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url(${BackImage})`, backgroundSize: "cover", objectFit: "cover" }}>
          <Typography.Text className="auctionHub__cardText">
            Search auctions
          </Typography.Text>
        </Card>
      </Link>
    </Col>
  )
}
