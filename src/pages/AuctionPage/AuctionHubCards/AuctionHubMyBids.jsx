import { Card, Row, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AuctionHubMyBids() {
    const [hovered, setHovered] = useState(false)

  return (
    
<Link to="/myBids">
                  <Row style={{ height: '25%' }}>
              <Card style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onMouseOver={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className={hovered ? "auctionHub__card" : "auctionHub__card auctionHub__card_hovered"}>
          <Typography.Text className=" auctionHub__cardText_black">
          My bids
            </Typography.Text>
          </Card>
        </Row>
      </Link>
  )
}
