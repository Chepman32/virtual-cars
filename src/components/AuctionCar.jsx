// Inside the Car component
import { useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { updatePlayer } from '../graphql/mutations';

export const AuctionCar = ({ car, user }) => {
  const [buying, setBuying] = useState(false);

  const handleBuyClick = async (carId, userId) => {
    try {
      setBuying(true);
      // Add the bought car to the user's car list
      const updatedUser = { id: userId, cars: [...user.cars, carId] };
      await API.graphql(graphqlOperation(updatePlayer, { input: updatedUser }));
      // Handle success, e.g., show a success message to the user
    } catch (error) {
      // Handle the error, e.g., display an error message to the user
    } finally {
      setBuying(false);
    }
  };

  return (
    <div>
      {/* Car details */}
      <button onClick={() => handleBuyClick(car.id, user.id)} disabled={buying}>
        {buying ? 'Buying...' : 'Buy'}
      </button>
    </div>
  );
};
