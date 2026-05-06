import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, Home, Percent } from 'lucide-react'

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(600000) // 6 lakhs
  const [downPayment, setDownPayment] = useState(200000) // 2 lakhs
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(10) // years
  const [monthlyIncome, setMonthlyIncome] = useState(30000)
  
  const [emi, setEmi] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [affordability, setAffordability] = useState('')

  useEffect(() => {
    calculateEMI()
  }, [loanAmount, downPayment, interestRate, tenure, monthlyIncome])

  const calculateEMI = () => {
    const principal = loanAmount - downPayment
    const monthlyRate = interestRate / 12 / 100
    const months = tenure * 12

    if (principal <= 0) {
      setEmi(0)
      setTotalPayment(downPayment)
      setTotalInterest(0)
      setAffordability('✅ No loan needed!')
      return
    }

    const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                     (Math.pow(1 + monthlyRate, months) - 1)
    
    const totalPay = emiValue * months + downPayment
    const totalInt = totalPay - loanAmount

    setEmi(Math.round(emiValue))
    setTotalPayment(Math.round(totalPay))
    setTotalInterest(Math.round(totalInt))

    // Affordability check
    const emiPercentage = (emiValue / monthlyIncome) * 100
    if (emiPercentage < 30) {
      setAffordability('✅ आसानी से भर सकते हैं')
    } else if (emiPercentage < 40) {
      setAffordability('⚠️ थोड़ा टाइट होगा')
    } else {
      setAffordability('❌ Income बढ़ाएं या Down Payment बढ़ाएं')
    }
  }

  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`
    return `₹${amount.toLocaleString('en-IN')}`
  }

  return (
    <section id="emi-calculator" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-3">
            EMI Calculator
          </h2>
          <p className="text-lg text-charcoal/70">
            Calculate your monthly payment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-saffron/10 p-2 rounded-lg">
                <Calculator className="text-saffron" size={24} />
              </div>
              <h3 className="text-xl font-display font-bold text-charcoal">
                Calculate EMI
              </h3>
            </div>

            <div className="space-y-6">
              {/* Plot Price */}
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="text-charcoal font-semibold">प्लॉट की कीमत</span>
                  <span className="text-saffron font-bold">{formatCurrency(loanAmount)}</span>
                </label>
                <input
                  type="range"
                  min="500000"
                  max="2000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-saffron"
                />
                <div className="flex justify-between text-xs text-charcoal/60 mt-1">
                  <span>₹5L</span>
                  <span>₹20L</span>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="text-charcoal font-semibold">Down Payment</span>
                  <span className="text-saffron font-bold">{formatCurrency(downPayment)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max={loanAmount}
                  step="50000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-saffron"
                />
                <div className="flex justify-between text-xs text-charcoal/60 mt-1">
                  <span>₹0</span>
                  <span>{formatCurrency(loanAmount)}</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="text-charcoal font-semibold">ब्याज दर (वार्षिक)</span>
                  <span className="text-saffron font-bold">{interestRate}%</span>
                </label>
                <input
                  type="range"
                  min="7"
                  max="12"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-saffron"
                />
                <div className="flex justify-between text-xs text-charcoal/60 mt-1">
                  <span>7%</span>
                  <span>12%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="text-charcoal font-semibold">अवधि (वर्ष)</span>
                  <span className="text-saffron font-bold">{tenure} Years</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-saffron"
                />
                <div className="flex justify-between text-xs text-charcoal/60 mt-1">
                  <span>5 Years</span>
                  <span>20 Years</span>
                </div>
              </div>

              {/* Monthly Income */}
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="text-charcoal font-semibold">मासिक आय</span>
                  <span className="text-saffron font-bold">{formatCurrency(monthlyIncome)}</span>
                </label>
                <input
                  type="range"
                  min="15000"
                  max="100000"
                  step="5000"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-saffron"
                />
                <div className="flex justify-between text-xs text-charcoal/60 mt-1">
                  <span>₹15K</span>
                  <span>₹1L</span>
                </div>
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
            {/* EMI Card */}
            <div className="bg-gradient-to-br from-saffron to-gold rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Home size={32} />
                <div>
                  <p className="text-sm opacity-90">आपकी मासिक EMI</p>
                  <h3 className="text-5xl font-display font-bold">
                    {formatCurrency(emi)}
                  </h3>
                  <p className="text-sm opacity-90 mt-1">/महीना</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 mt-4">
                <p className="text-lg font-semibold mb-2">{affordability}</p>
                <div className="space-y-1">
                  <p className="text-sm opacity-90">
                    EMI आपकी आय का {((emi / monthlyIncome) * 100).toFixed(1)}% है
                  </p>
                  <p className="text-xs opacity-80">
                    💡 रोज़ाना सिर्फ ₹{Math.round(emi/30)} - एक चाय के दाम में अपना घर!
                  </p>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h4 className="text-xl font-display font-bold text-charcoal mb-6">
                विस्तृत जानकारी
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <TrendingUp className="text-blue-600" size={20} />
                    </div>
                    <span className="text-charcoal font-semibold">Loan Amount</span>
                  </div>
                  <span className="text-charcoal font-bold">
                    {formatCurrency(loanAmount - downPayment)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Percent className="text-green-600" size={20} />
                    </div>
                    <span className="text-charcoal font-semibold">कुल ब्याज</span>
                  </div>
                  <span className="text-charcoal font-bold">
                    {formatCurrency(totalInterest)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-saffron/10 rounded-xl border-2 border-saffron">
                  <div className="flex items-center gap-3">
                    <div className="bg-saffron/20 p-2 rounded-lg">
                      <Home className="text-saffron" size={20} />
                    </div>
                    <span className="text-charcoal font-semibold">कुल भुगतान</span>
                  </div>
                  <span className="text-saffron font-bold text-xl">
                    {formatCurrency(totalPayment)}
                  </span>
                </div>
              </div>

              {/* Comparison with Rent */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
                <p className="text-sm font-semibold text-charcoal mb-2">
                  💡 किराए से तुलना
                </p>
                <p className="text-xs text-charcoal/70">
                  अगर आप ₹{(emi * 0.7).toLocaleString('en-IN')} किराया देते हैं, तो {tenure} साल में 
                  <strong className="text-red-600"> ₹{((emi * 0.7 * 12 * tenure) / 100000).toFixed(1)}L</strong> बर्बाद होंगे।
                  <br />
                  <strong className="text-green-600">EMI में वही पैसा लगाकर अपना घर बनाएं!</strong>
                </p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://wa.me/919876543210?text=नमस्ते, मैंने EMI Calculator देखा है। मुझे loan के बारे में जानकारी चाहिए।"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white text-center px-6 py-4 rounded-full font-semibold transition-all shadow-lg"
            >
              💬 Loan के लिए WhatsApp करें
            </a>
          </motion.div>
        </div>

        {/* Bank Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-charcoal/70 mb-4">हमारे बैंक पार्टनर्स</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['SBI', 'HDFC', 'ICICI', 'PNB', 'Bank of Baroda'].map((bank) => (
              <div key={bank} className="bg-white px-6 py-3 rounded-xl shadow-md font-semibold text-charcoal">
                {bank}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default EMICalculator
