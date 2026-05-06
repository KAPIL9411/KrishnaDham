import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, CheckCircle } from 'lucide-react'

const Pricing = () => {
  const [loanAmount, setLoanAmount] = useState(800000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(10)

  const calculateEMI = () => {
    const principal = loanAmount
    const rate = interestRate / 12 / 100
    const time = tenure * 12
    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1)
    return emi.toFixed(0)
  }

  const pricingPlans = [
    {
      size: '50 sq yd',
      price: '8.5',
      features: ['East/West Facing', 'Near Main Road', 'Clear Title', 'Immediate Registry'],
      popular: false,
    },
    {
      size: '100 sq yd',
      price: '10',
      features: ['Corner Plot Available', 'Wide Road Access', 'Premium Location', 'Vastu Compliant'],
      popular: true,
    },
    {
      size: '120 sq yd',
      price: '11',
      features: ['Prime Location', 'Park Facing', 'Extra Wide Road', 'Best Investment'],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-charcoal to-charcoal/90">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-ivory mb-4">
            Pricing & Plans
          </h2>
          <p className="text-xl text-ivory/70">
            Flexible payment options and affordable pricing for your dream plot
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-br from-saffron to-gold text-white shadow-2xl scale-105'
                  : 'bg-ivory text-charcoal shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-charcoal text-ivory px-6 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <h3 className="text-3xl font-display font-bold mb-2">{plan.size}</h3>
              <div className="mb-6">
                <span className="text-5xl font-display font-bold">₹{plan.price}</span>
                <span className="text-xl opacity-70"> Lakhs</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle size={20} className={plan.popular ? 'text-white' : 'text-saffron'} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block w-full text-center px-6 py-3 rounded-full font-semibold transition-all ${
                  plan.popular
                    ? 'bg-white text-saffron hover:bg-ivory'
                    : 'bg-saffron text-white hover:bg-gold'
                }`}
              >
                Book Now
              </a>
            </motion.div>
          ))}
        </div>

        {/* EMI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-ivory rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="text-saffron" size={40} />
            <h3 className="text-3xl font-display font-bold text-charcoal">EMI Calculator</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-charcoal font-semibold mb-2">
                  Loan Amount: ₹{(loanAmount / 100000).toFixed(2)} Lakhs
                </label>
                <input
                  type="range"
                  min="500000"
                  max="2000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-saffron/20 rounded-lg appearance-none cursor-pointer accent-saffron"
                />
              </div>

              <div className="mb-6">
                <label className="block text-charcoal font-semibold mb-2">
                  Interest Rate: {interestRate}% per annum
                </label>
                <input
                  type="range"
                  min="7"
                  max="12"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-saffron/20 rounded-lg appearance-none cursor-pointer accent-saffron"
                />
              </div>

              <div className="mb-6">
                <label className="block text-charcoal font-semibold mb-2">
                  Tenure: {tenure} years
                </label>
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-saffron/20 rounded-lg appearance-none cursor-pointer accent-saffron"
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-saffron to-gold rounded-3xl p-8 text-center text-white w-full">
                <p className="text-lg mb-2 opacity-90">Your Monthly EMI</p>
                <p className="text-6xl font-display font-bold mb-4">₹{calculateEMI()}</p>
                <p className="text-sm opacity-80">
                  Total Payment: ₹{((calculateEMI() * tenure * 12) / 100000).toFixed(2)} Lakhs
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-saffron/10 rounded-2xl p-6 text-center">
            <p className="text-charcoal font-semibold">
              ⚡ Limited Time Offer: Book now and get special discounts!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
