import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Calendar, Award } from 'lucide-react'

const InvestmentCalculator = () => {
  const [investmentAmount, setInvestmentAmount] = useState(850000) // 8.5 lakhs
  const [years, setYears] = useState(3)
  
  // Historical appreciation rate for Bareilly region (conservative estimate)
  const appreciationRate = 12 // 12% per year

  const calculateReturns = () => {
    const futureValue = investmentAmount * Math.pow(1 + appreciationRate / 100, years)
    const totalGain = futureValue - investmentAmount
    const roi = ((totalGain / investmentAmount) * 100).toFixed(1)
    
    return {
      futureValue: Math.round(futureValue),
      totalGain: Math.round(totalGain),
      roi
    }
  }

  const returns = calculateReturns()

  // FD Comparison
  const fdRate = 6.5 // Average FD rate
  const fdReturns = investmentAmount * Math.pow(1 + fdRate / 100, years)
  const fdGain = fdReturns - investmentAmount

  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`
    return `₹${amount.toLocaleString('en-IN')}`
  }

  return (
    <section id="investment" className="py-20 bg-gradient-to-b from-ivory to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-charcoal mb-4">
            📈 Investment Calculator
          </h2>
          <p className="text-xl text-charcoal/70">
            देखें आपका निवेश कितना बढ़ सकता है
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="text-green-600" size={28} />
              </div>
              <h3 className="text-2xl font-display font-bold text-charcoal">
                Calculate Returns
              </h3>
            </div>

            <div className="space-y-6">
              {/* Investment Amount */}
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="text-charcoal font-semibold">निवेश राशि</span>
                  <span className="text-green-600 font-bold">{formatCurrency(investmentAmount)}</span>
                </label>
                <input
                  type="range"
                  min="500000"
                  max="2000000"
                  step="50000"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div className="flex justify-between text-xs text-charcoal/60 mt-1">
                  <span>₹5L</span>
                  <span>₹20L</span>
                </div>
              </div>

              {/* Time Period */}
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="text-charcoal font-semibold">समय अवधि</span>
                  <span className="text-green-600 font-bold">{years} Years</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div className="flex justify-between text-xs text-charcoal/60 mt-1">
                  <span>1 Year</span>
                  <span>10 Years</span>
                </div>
              </div>

              {/* Appreciation Rate Info */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-charcoal mb-1">
                  📊 Historical Data
                </p>
                <p className="text-xs text-charcoal/70">
                  Bareilly region में property की कीमत औसतन <strong className="text-green-600">{appreciationRate}% प्रति वर्ष</strong> बढ़ी है।
                  यह conservative estimate है।
                </p>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Future Value Card */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Award size={32} />
                <div>
                  <p className="text-sm opacity-90">भविष्य में मूल्य</p>
                  <h3 className="text-5xl font-display font-bold">
                    {formatCurrency(returns.futureValue)}
                  </h3>
                  <p className="text-sm opacity-90 mt-1">after {years} years</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span>कुल लाभ</span>
                  <span className="text-2xl font-bold">{formatCurrency(returns.totalGain)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ROI</span>
                  <span className="text-2xl font-bold">{returns.roi}%</span>
                </div>
              </div>
            </div>

            {/* Comparison with FD */}
            <div className="bg-white rounded-3xl p-6 shadow-2xl">
              <h4 className="text-xl font-display font-bold text-charcoal mb-4 flex items-center gap-2">
                <DollarSign className="text-saffron" size={24} />
                FD से तुलना
              </h4>

              <div className="space-y-4">
                {/* Real Estate */}
                <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-charcoal">🏡 Real Estate</span>
                    <span className="text-green-600 font-bold">{appreciationRate}% p.a.</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-green-600">
                    {formatCurrency(returns.futureValue)}
                  </div>
                  <p className="text-xs text-charcoal/60 mt-1">
                    Gain: {formatCurrency(returns.totalGain)}
                  </p>
                </div>

                {/* Fixed Deposit */}
                <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-charcoal">🏦 Fixed Deposit</span>
                    <span className="text-gray-600 font-bold">{fdRate}% p.a.</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-gray-600">
                    {formatCurrency(fdReturns)}
                  </div>
                  <p className="text-xs text-charcoal/60 mt-1">
                    Gain: {formatCurrency(fdGain)}
                  </p>
                </div>

                {/* Difference */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-4">
                  <p className="text-sm font-semibold text-charcoal mb-2">
                    💰 Extra Profit in Real Estate
                  </p>
                  <div className="text-3xl font-display font-bold text-orange-600">
                    {formatCurrency(returns.totalGain - fdGain)}
                  </div>
                  <p className="text-xs text-charcoal/70 mt-1">
                    Real estate में <strong>{((returns.totalGain - fdGain) / fdGain * 100).toFixed(0)}% ज्यादा</strong> फायदा!
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Benefits */}
            <div className="bg-gradient-to-r from-saffron/10 to-gold/10 border-2 border-saffron rounded-xl p-6">
              <h4 className="font-display font-bold text-charcoal mb-3">
                ➕ अतिरिक्त लाभ
              </h4>
              <ul className="space-y-2 text-sm text-charcoal/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>अपना घर बनाने का मौका</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>किराया बचाएं (₹{((investmentAmount * 0.005) * 12 * years / 100000).toFixed(1)}L in {years} years)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Tax benefits (Section 80C, 24B)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Inflation hedge - property value बढ़ती रहती है</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Family के लिए asset</span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <a
              href="https://wa.me/919876543210?text=नमस्ते, मैंने Investment Calculator देखा है। मुझे investment के बारे में और जानकारी चाहिए।"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-saffron to-gold hover:from-gold hover:to-saffron text-white text-center px-6 py-4 rounded-full font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Calendar size={20} />
              अभी निवेश शुरू करें
            </a>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-8 text-center"
        >
          <p className="text-xs text-charcoal/50">
            * यह calculator historical data पर आधारित है। Actual returns market conditions पर निर्भर करते हैं।
            Past performance future results की guarantee नहीं है।
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default InvestmentCalculator
