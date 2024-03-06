import { Card, Row, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AuctionHubMyBids({ focused, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link to="/myBids">
      <Row style={{ height: '25%' }}>
        <Card
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: focused ? '2px solid red' : 'none', // Apply red border if focused
          }}
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onClick} // Call the onClick function when clicked
          className={hovered ? "auctionHub__card" : "auctionHub__card auctionHub__card_hovered"}
        >
          <Typography.Text className="auctionHub__cardText_black">
            My bids
          </Typography.Text>
        </Card>
      </Row>
    </Link>
  )
}