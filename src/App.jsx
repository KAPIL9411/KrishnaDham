import { useState } from 'react'
import Hero from './components/Hero'
import VideoWalkthrough from './components/VideoWalkthrough'
import LiveAvailability from './components/LiveAvailability'
import SVGPlotOverlay from './components/SVGPlotOverlay'
import ComparePlots from './components/ComparePlots'
import EMICalculator from './components/EMICalculator'
import InvestmentCalculator from './components/InvestmentCalculator'
import About from './components/About'
import Amenities from './components/Amenities'
import Location from './components/Location'
import Pricing from './components/Pricing'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import QuickActions from './components/QuickActions'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="relative bg-white">
      <Navbar />
      <Hero />
      
      {/* Main Content - Better Spacing */}
      <div className="space-y-0">
        <LiveAvailability />
        <SVGPlotOverlay />
        <VideoWalkthrough />
        <ComparePlots />
        <EMICalculator />
        <InvestmentCalculator />
        <About />
        <Amenities />
        <Location />
        <ContactForm />
      </div>
      
      <Footer />
      <WhatsAppButton />
      <QuickActions />
    </div>
  )
}

export default App
