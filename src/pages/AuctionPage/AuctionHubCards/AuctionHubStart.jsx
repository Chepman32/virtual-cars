import { Card, Row, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AuctionHubStart({ focused, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link to="/myCars">
      <Row style={{ height: '50%' }}>
        <Card
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: "#2d24b3",
            color: "#fff",
            border: focused ? '3px solid red' : 'none', // Apply red border if focused
          }}
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onClick} // Call the onClick function when clicked
          className={hovered ? "auctionHub__card" : "auctionHub__card auctionHub__card_hovered"}
        >
          <Typography.Text className="auctionHub__cardText">
            Start auction
          </Typography.Text>
        </Card>
      </Row>
    </Link>
  )
}