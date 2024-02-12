import React from 'react';

const entity = {
    activity : "Skipping meals",
    consequences : "Fatigue, weakness, impaired concentration",
    spoilRate : 5
}

const Entity = () => {
  return (
    <>
      <div className='container'>
        <h3>Activity : {entity.activity}</h3>
        <h3>Consequences ? {entity.consequences}</h3>
        <h3>Spoil Rate: {entity.spoilRate}</h3>
      </div>
    </>
  )
}

export default Entity
