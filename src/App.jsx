import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
// import FlashSale from './components/FlashSale'
import VideoWalkthrough from './components/VideoWalkthrough'
import SVGPlotOverlay from './components/SVGPlotOverlay'
import InvestmentCalculator from './components/InvestmentCalculator'
import Testimonials from './components/Testimonials'
import QuickBooking from './components/QuickBooking'
import About from './components/About'
import Amenities from './components/Amenities'
import Location from './components/Location'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Admin from './components/Admin'
import ErrorBoundary from './components/ErrorBoundary'
import VideoPopup from './components/VideoPopup'
import PlotInquiryForm from './components/PlotInquiryForm'
import CoordinatePicker from './components/CoordinatePicker'

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Route */}
        <Route path="/admin" element={<Admin />} />
        
        {/* Coordinate Picker Tool */}
        <Route path="/coordinate-picker" element={<CoordinatePicker />} />
        
        {/* Main Website */}
        <Route path="/" element={
          <div className="relative bg-white overflow-x-hidden w-full">
            <Navbar />
            <Hero />
            
            {/* Video Popup - Shows on page load */}
            <VideoPopup />
            
            {/* Main Content - Mobile-First Spacing */}
            <div className="space-y-0 pb-20 md:pb-0 w-full overflow-x-hidden">
              <ErrorBoundary>
                <SVGPlotOverlay />
              </ErrorBoundary>
              <ErrorBoundary>
                <VideoWalkthrough />
              </ErrorBoundary>
              <ErrorBoundary>
                <Testimonials/>
              </ErrorBoundary>
              <ErrorBoundary>
                <InvestmentCalculator />
              </ErrorBoundary>
              <ErrorBoundary>
                <QuickBooking />
              </ErrorBoundary>
              <ErrorBoundary>
                <About />
              </ErrorBoundary>
              <ErrorBoundary>
                <Amenities />
              </ErrorBoundary>
              <ErrorBoundary>
                <Location />
              </ErrorBoundary>
              <ErrorBoundary>
                <PlotInquiryForm />
              </ErrorBoundary>
              <ErrorBoundary>
                <ContactForm />
              </ErrorBoundary>
            </div>
            
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App
