import React, { useState } from 'react'
import './PlantCard.css'

/**
 * Component representing an individual plant card with stock toggle functionality.
 */
const PlantCard = ({ plant }) => {
  // Local state to track if the plant is in stock
  const [isInStock, setIsInStock] = useState(true)

  /**
   * Toggles the local isInStock state.
   */
  const toggleStock = () => {
    setIsInStock(prev => !prev)
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {/* Conditional rendering for the stock button */}
      {isInStock ? (
        <button className="primary" onClick={toggleStock}>In Stock</button>
      ) : (
        <button onClick={toggleStock}>Out of Stock</button>
      )}
    </li>
  )
}

export default PlantCard
