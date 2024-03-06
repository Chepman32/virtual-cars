import { Card, Col, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BackImage from "../../../assets/images/Forza-Horizon-5-Playlist-Cars.png"

export default function AuctionHubSearch({focused}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Col span={12} style={{ height: '100%', border: focused ? "1px solid red" : "none" }}>
                  <Link to="/auctions">
                  <Card style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: "url(https://www.gtplanet.net/wp-content/uploads/2023/12/Forza-Horizon-5-Playlist-Cars.jpg)", backgroundRepeat: "no-repeat", objectFit: "cover" }}>
                  <Typography.Text className="auctionHub__cardText">
                  Search auctions
            </Typography.Text>
        </Card>
      </Link>
      </Col>
  )
}
