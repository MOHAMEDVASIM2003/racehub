import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Banner from './Banner'
import OurStory from './OurStory'
import FeaturedEvents from './FeaturedEvents'
import Gallery from './Gallery'
import Community from './Community'
import OurDNA from './OurDNA'
import Plans from './Plans'
import JoinNow from './JoinNow'

function Landing() {
  return (
    <div>
        <Navbar/>
        <div style={{ paddingTop: '60px' }}>
        <Banner/>
        <OurStory/>
        <FeaturedEvents/>
        <Gallery/>
        <Community/>
        <OurDNA/>
        <Plans/>
        <JoinNow/>
        <Footer/>
        </div>
    </div>
  )
}

export default Landing