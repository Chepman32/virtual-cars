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
          }}
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onClick} // Call the onClick function when clicked
          className={focused ? "activeCard" : "hubCard"}
        >
          <Typography.Text className="auctionHub__cardText">
            Start auction
          </Typography.Text>
        </Card>
      </Row>
    </Link>
  )
}