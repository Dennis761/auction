import React from 'react'
import { useParams } from 'react-router-dom'
import AuctionMembersList from './AuctionMembersList.jsx'
import PriceAdjuster from './PriceAdjuster.jsx'

export default function AttendAuctionProduct() {
  const { id } = useParams()
  return (
    <div style={styles.container}>
    <div>
       AttendAuctionProduct
       <PriceAdjuster initialPrice={1000}/>
      </div>
      <AuctionMembersList sessionId={id}/>
      </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#000',
  },
}
