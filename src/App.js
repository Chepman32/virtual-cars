import React, { useCallback, useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import AuctionPage from "./pages/AuctionPage/AuctionPage";
import CustomHeader from "./components/CustomHeader/CustomHeader";  
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import { Hub } from "aws-amplify/utils";
import { generateClient } from "aws-amplify/api";
import { listUsers } from "./graphql/queries";
import { createUser } from "./graphql/mutations";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import CarsStore from "./pages/CarPages/CarsStore";
import MyCars from "./pages/CarPages/MyCars";
import { Spin, message } from "antd";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import AuctionsHub from "./pages/AuctionPage/AuctionHub";
import MyBids from "./pages/AuctionPage/MyBids";
import MyAuctions from "./pages/AuctionPage/MyAuctions";

const client = generateClient(); 
Amplify.configure(awsExports);

export default function App() {
  const [nickname, setNickname] = useState();
  const [isNewUser, setIsNewUser] = useState(false)
  const [money, setMoney] = useState();
  const [playerInfo, setPlayerInfo] = useState(null);
  const [creatingUser, setCreatingUser] = useState(false);

  const createNewPlayer = useCallback((username) => {
    setCreatingUser(true);
    const data = {  
      nickname: username,
      money: 1000,
    };
    setTimeout(async () => {
      isNewUser ? await client.graphql({
        query: createUser,
        variables: { input: data }
      }) : message.warning("User already exists");
      setCreatingUser(false);
    })
    message.success("User successfully created");
  }, [isNewUser])

  const currentAuthenticatedUser = useCallback(async () => {
    try {
      const { username, userId } = await getCurrentUser();
      const playersData = await client.graphql({
        query: listUsers,
      });
      const playersList = playersData.data.listUsers.items;
      const user = playersList.filter((u) => u.nickname === username)
      const isNewUser = !playersList.some((pl) => pl.nickname === username)
      setIsNewUser(isNewUser)
      setTimeout(() => {
        !playerInfo && createNewPlayer(username)
      }, 1000)
      console.log("playersList", playersList)
      console.log("userId", userId)
      console.log("user", user[0].id)
      setPlayerInfo(user[0]);
      setMoney(user[0].money)
    } catch (err) {
      console.log(err);
    }
  } ,[createNewPlayer, playerInfo])
  

  useEffect(() => {
    !playerInfo && currentAuthenticatedUser()
  }, [currentAuthenticatedUser, playerInfo, money])

  return (
    <BrowserRouter>
      {!creatingUser && ( 
        <Authenticator>
          {({ signOut, user }) => (  
            <>
              {nickname !== null && (
                <main >
                  <h3 onClick={() => console.log(playerInfo)}>Console</h3>
                  {playerInfo ? (
                    <CustomHeader  
                      money={money}
                      username={playerInfo.nickname}
                      signOut={signOut}
                    />
                  ) : null}
                  {
                    playerInfo
                      ?
                      <Routes>
                    <Route 
                      path="/carsStore"  
                      element={
                        <CarsStore
                          playerInfo={playerInfo}
                          money={money}
                          setMoney={setMoney}  
                        />
                      }
                    />

                    <Route
                      path="/auctions"
                      element={
                        <AuctionPage
                          playerInfo={playerInfo}
                          money={money} 
                          setMoney={setMoney}
                        />
                        
                      }  
                        />
                        <Route
                      path="/myCars"
                      element={
                        <MyCars
                          playerInfo={playerInfo}
                          money={money} 
                          setMoney={setMoney}
                        />
                        
                      }  
                        />
                        <Route
                      path="/auctionsHub"
                      element={
                        <AuctionsHub/>
                      }  
                        />
                        <Route
                      path="/auctions"
                      element={
                        <AuctionPage
                          playerInfo={playerInfo}
                          money={money} 
                          setMoney={setMoney}
                        />
                      }
                        />
                        <Route
                      path="/myBids"
                      element={
                        <MyBids
                          playerInfo={playerInfo}
                          money={money} 
                          setMoney={setMoney}
                        />
                      }  
                        />
                        <Route
                      path="/myAuctions"
                      element={
                        <MyAuctions
                          playerInfo={playerInfo}
                          money={money} 
                          setMoney={setMoney}
                        />
                      }  
                        />
                      </Routes>
                      :
                      <Spin />
                  }

                </main>
              )}

              <button onClick={signOut}>Sign out</button>   
            </>
          )}
        </Authenticator>
      )}

      {creatingUser && <Spin />}

    </BrowserRouter>
  );

}