import { useState } from 'react'
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
      size: '50 वर्ग गज',
      price: '8.5',
      features: ['पूर्व/पश्चिम मुखी', 'मुख्य सड़क के पास', 'क्लियर टाइटल', 'तुरंत रजिस्ट्री'],
      popular: false,
    },
    {
      size: '100 वर्ग गज',
      price: '10',
      features: ['कॉर्नर प्लॉट उपलब्ध', 'चौड़ी सड़क पहुंच', 'प्रीमियम स्थान', 'वास्तु अनुकूल'],
      popular: true,
    },
    {
      size: '120 वर्ग गज',
      price: '11',
      features: ['प्राइम लोकेशन', 'पार्क के सामने', 'अतिरिक्त चौड़ी सड़क', 'सर्वोत्तम निवेश'],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-12 md:py-20 bg-gradient-to-b from-charcoal to-charcoal/90 w-full overflow-x-hidden">
      <div className="container mx-auto px-4 w-full max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ivory mb-3 md:mb-4">
            मूल्य निर्धारण और योजनाएं
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-ivory/70 px-2">
            आपके सपनों के प्लॉट के लिए लचीले भुगतान विकल्प और किफायती मूल्य निर्धारण
          </p>
        </motion.div>

        {/* Mobile-First Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-2xl md:rounded-3xl p-6 md:p-8 ${
                plan.popular
                  ? 'bg-gradient-to-br from-saffron to-gold text-white shadow-2xl md:scale-105'
                  : 'bg-ivory text-charcoal shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-charcoal text-ivory px-4 py-1 rounded-full text-xs md:text-sm font-semibold">
                  सबसे लोकप्रिय
                </div>
              )}

              <h3 className="text-xl md:text-3xl font-display font-bold mb-2">{plan.size}</h3>
              <div className="mb-4 md:mb-6">
                <span className="text-3xl md:text-5xl font-display font-bold">₹{plan.price}</span>
                <span className="text-lg md:text-xl opacity-70"> लाख</span>
              </div>

              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm md:text-base">
                    <CheckCircle size={16} className={plan.popular ? 'text-white' : 'text-saffron'} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block w-full text-center px-4 md:px-6 py-3 rounded-full font-semibold transition-all text-sm md:text-base ${
                  plan.popular
                    ? 'bg-white text-saffron hover:bg-ivory'
                    : 'bg-saffron text-white hover:bg-gold'
                }`}
              >
                अभी बुक करें
              </a>
            </motion.div>
          ))}
        </div>

        {/* Mobile-First EMI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-ivory rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <Calculator className="text-saffron" size={32} />
            <h3 className="text-2xl md:text-3xl font-display font-bold text-charcoal">EMI कैलकुलेटर</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-charcoal font-semibold mb-2 text-sm md:text-base">
                  लोन राशि: ₹{(loanAmount / 100000).toFixed(2)} लाख
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

              <div>
                <label className="block text-charcoal font-semibold mb-2 text-sm md:text-base">
                  ब्याज दर: {interestRate}% प्रति वर्ष
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

              <div>
                <label className="block text-charcoal font-semibold mb-2 text-sm md:text-base">
                  अवधि: {tenure} साल
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
              <div className="bg-gradient-to-br from-saffron to-gold rounded-2xl md:rounded-3xl p-6 md:p-8 text-center text-white w-full">
                <p className="text-sm md:text-lg mb-2 opacity-90">आपकी मासिक EMI</p>
                <p className="text-4xl md:text-6xl font-display font-bold mb-2 md:mb-4">₹{calculateEMI()}</p>
                <p className="text-xs md:text-sm opacity-80">
                  कुल भुगतान: ₹{((calculateEMI() * tenure * 12) / 100000).toFixed(2)} लाख
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-8 bg-saffron/10 rounded-xl md:rounded-2xl p-4 md:p-6 text-center">
            <p className="text-charcoal font-semibold text-sm md:text-base">
              ⚡ सीमित समय का ऑफर: अभी बुक करें और विशेष छूट पाएं!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
