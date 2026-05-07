import React from 'react'
import PlantCard from './PlantCard'
import './PlantList.css'

const PlantList = ({ plants }) => {
  return (
    <ul className="cards">
      {plants.map(plant => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </ul>
  )
}

export default PlantList
