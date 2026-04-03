import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCrown } from '@fortawesome/free-solid-svg-icons';
import './Style.css'

function Plans() {
  const plans = [
    {
      name: 'Starter',
      price: '$9.99',
      link: '/checkout/starter',
      features: [
        'Event Registration',
        'Basic Stats',
        'Community Access',
        'Monthly Newsletter'
      ]
    },
    {
      name: 'Pro Racer',
      price: '$19.99',
      link: '/checkout/pro',
      features: [
        'Priority Registration',
        'Advanced Stats',
        'Pro Badge',
        'Live Timing'
      ],
      isPopular: true
    },
    {
      name: 'Elite',
      price: '$39.99',
      link: '/checkout/elite',
      features: [
        'VIP Registration',
        'Full Analytics',
        'Elite Badge',
        'Personal Coach'
      ]
    }
  ];

  return (
    <div className="plans-section">
      <div className="plans-header">
        <h1 className="plans-title">Membership Plans</h1>
        <p className="plans-subtitle">Choose the perfect plan for your racing journey</p>
      </div>
      
      <div className="plans-container">
        {plans.map((plan, index) => (
          <div key={index} className={`plan-card ${plan.isPopular ? 'plan-card--popular' : ''}`}>
            {plan.isPopular && <div className="plan-badge"><FontAwesomeIcon icon={faCrown} /> Most Popular</div>}
            
            <div className="plan-content">
              <h2 className="plan-name">{plan.name}</h2>
              
              <div className="plan-price">
                <span className="price-amount">{plan.price}</span>
                <span className="price-period">/month</span>
              </div>
              
              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Link to={plan.link} className="plan-button">
              CHOOSE PLAN
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Plans
