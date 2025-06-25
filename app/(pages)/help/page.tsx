"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HelpPage() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  const faqItems = [
    {
      question: "Is the app accessible?",
      answer:
        "Yes! We follow accessibility guidelines to ensure the app is usable with screen readers and keyboard navigation.",
    },
    {
      question: "Does the app sell my data?",
      answer:
        "No. Your data is never sold or shared with third parties. We only store what's necessary to improve your experience.",
    },
    {
      question: "Is my information secure?",
      answer:
        "Yes. We use encryption to protect your data and follow industry best practices for security.",
    },
    {
      question: "Can I sync across web and mobile?",
      answer:
        "Yes! If you sign in, your data syncs across all devices automatically.",
    },
    {
      question: "How do I see monthly spending trends?",
      answer:
        "You can utilize the two analytics charts on the dashboard to view monthly, yearly, and weekly spending and cashflow trends.",
    },
    {
      question: "Can I edit or delete a transaction?",
      answer:
        "Yup, you can edit or delete a transaction by hovering over the transaction in the transactions page!",
    },
    {
      question:
        "Do I have to add my paycheck through a transaction every payday?",
      answer:
        "Our system auto-adds paychecks to your balance. You just need to enter the income source(s) once, and we'll handle the rest. No manual entry every payday.",
    },
  ];

  return (
    <main className="w-[90%] md:w-[85%] 2xl:w-4/5 h-[600px] 3xl:w-2/3 mx-auto">
      <h1 className="text-5xl font-medium tracking-tighter mt-8 mb-6">Help & Support</h1>
      <section className="space-y-3">
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{scale: 1.007}}
            className="rounded-xl border bg-accent shadow-sm hover:dark:bg-neutral-900/60 hover:bg-gray-200/70 transition-colors"
          >
            <button
              className={cn(
                openSection !== null
                  ? "rounded-b-none rounded-xl"
                  : "rounded-xl",
                "w-full p-4 text-left flex justify-between",
              )}
              onClick={() => toggleSection(index)}
            >
              {item.question}
              <ChevronsUpDown strokeWidth={1.5}/>
            </button>
            {openSection === index && (
              <div className="p-4 dark:bg-neutral-800 bg-neutral-100 border-t rounded-xl rounded-t-none">
                {item.answer}
              </div>
            )}
          </motion.div>
        ))}
      </section>
    </main>
  );
}
