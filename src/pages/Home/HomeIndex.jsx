import React from 'react'
import Nav from '../../components/nav'
import Hero from './Hero'
import HeroT from './HeroT'

function HomeIndex() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Nav />
      <Hero />
      <HeroT />
    </div>
    

  )
}

export default HomeIndex