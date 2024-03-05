import { Flex } from 'antd'
import React from 'react'
import "./carsPage.css";
import { getCarTypeColor } from '../../functions';

export default function CarCard({ selectedCar, setSelectedCar, showCarDetailsModal, car, getImageSource }) {
  return (
    <div
            onClick={() => {
              setSelectedCar(car)
              showCarDetailsModal()
            }}
            className={selectedCar && selectedCar.id === car.id ? "carsPage__item carsPage__item_selected" : "carsPage__item"}
          >
            <Flex style={{ textAlign: 'center' }} align="center">
              <h3 className="carsPage__model">{car.model} &nbsp;</h3>
              <h3 className="carsPage__year">{car.year}</h3>
            </Flex>
            <p className="carsPage__make">{car.make}</p>
            <img
              src={getImageSource(car.make, car.model)}
              alt={`${car.make} ${car.model}`}
              style={{ maxWidth: '100%', maxHeight: '50%', borderRadius: '10px' }}
            />
            <p>{car.price}</p>
            <div className="carsPage__type" style={{background: getCarTypeColor(car.type)}} >
                <p>{car.type.toUpperCase()}</p>
              </div>
          </div>
  )
}
