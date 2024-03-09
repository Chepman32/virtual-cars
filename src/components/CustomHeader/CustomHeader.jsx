import React, { useState } from 'react';
import { Button, Menu, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import "./styles.css"

const { Text } = Typography;

const CustomHeader = ({ username, money, signOut }) => {
  const [signOutBtn, setSignOutBtn] = useState(false)
  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate("/")
    signOut()
  }
  return (
    <Menu theme="dark" mode="horizontal" style={{ width: "100%", lineHeight: '64px', display: 'flex' }}>
      <div style={{ width: "100%", display: 'flex', justifyContent: "space-between", alignItems: "center" }} className='customHeader' >
        <section style={{ display: 'flex', justifyContent: 'flex-start', alignItems: "center" }}>
          <Menu.Item key="carsStore" style={{ backgroundColor: 'transparent' }}>
            <Link to="/carsStore">Cars Store</Link>
          </Menu.Item>
          <Menu.Item key="myCars" style={{ backgroundColor: 'transparent' }}>
            <Link to="/myCars">My Cars</Link>
          </Menu.Item>
          <Menu.Item key="auctionsHub" style={{ backgroundColor: 'transparent' }}>
            <Link to="/auctionsHub">Auctions</Link>
          </Menu.Item>
        </section>
      </div>
      <Menu.Item key="user" onClick={() => setSignOutBtn(!signOutBtn)} onKeyDown={null} >
        <Text style={{ marginRight: 15 }} type="warning">{`$${money}`}</Text>
        <Text style={{ marginRight: "5vw", color: "#fff" }} >{username}</Text>
        {
          signOutBtn && <Button onClick={handleSignOut} className='signOutBtn' >Sign out</Button>
        }
      </Menu.Item>
    </Menu>
  );
};

export default CustomHeader;
