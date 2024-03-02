import React from 'react';
import { Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Text } = Typography;

const CustomHeader = ({ username, money }) => {
  return (
    <Menu theme="dark" mode="horizontal" style={{ width: "100%", lineHeight: '64px', display: 'flex' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Menu.Item key="carsStore" style={{ backgroundColor: 'transparent' }}>
            <Link to="/carsStore">Cars Store</Link>
          </Menu.Item>
          <Menu.Item key="myCars" style={{ backgroundColor: 'transparent' }}>
            <Link to="/myCars">My Cars</Link>
          </Menu.Item>
          <Menu.Item key="auctionsHub" style={{ backgroundColor: 'transparent' }}>
            <Link to="/auctionsHub">Auctions</Link>
          </Menu.Item>
        </div>
      </div>
      <Menu.Item key="user">
        <Text style={{ marginRight: 15 }} type="warning">{`$${money}`}</Text>
        <Text style={{color: "#fff"}} >{username}</Text>
      </Menu.Item>
    </Menu>
  );
};

export default CustomHeader;
