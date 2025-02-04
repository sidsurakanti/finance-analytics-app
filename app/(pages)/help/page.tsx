"use client";
import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

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
      question: "Can I use the app on multiple devices?",
      answer:
        "Yes! If you sign in, your data syncs across all devices automatically.",
    },
  ];

  return (
    <main className="w-[90%] md:w-[85%] 2xl:w-4/5 3xl:w-2/3 mx-auto">
      <h1 className="text-5xl font-medium my-7">Help & Support</h1>
      <section className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border rounded-lg">
            <button
              className="w-full p-4 text-left font-medium bg-gray-100 hover:bg-gray-200 flex justify-between"
              onClick={() => toggleSection(index)}
            >
              {item.question}
              <ChevronsUpDown />
            </button>
            {openSection === index && (
              <div className="p-4 bg-white border-t">{item.answer}</div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
