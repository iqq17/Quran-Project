import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const SubscriptionPage: React.FC = () => {
  const plans = [
    {
      id: 1,
      name: "Basic",
      price: "$9.99/month",
      features: [
        "Access to all Qira'at modes",
        "Basic AI feedback",
        "Community forum access",
      ],
    },
    {
      id: 2,
      name: "Premium",
      price: "$19.99/month",
      features: [
        "All Basic features",
        "Advanced AI feedback",
        "One-on-one coaching sessions",
        "Exclusive workshops",
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center text-[#365b6d]"
      >
        Subscription Plans
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <Card key={plan.id}>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-3xl font-bold text-[#365b6d] mb-4">{plan.price}</p>
              <ul className="mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-[#365b6d] text-white">Subscribe Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
