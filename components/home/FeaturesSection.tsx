"use client";

import { motion } from "motion/react";

import Image from "next/image";
import incomeSourcesImg from "@/public/incomesources.png";
import transactions from "@/public/transactions.png";
import design from "@/public/Fhome.png";
import { cn } from "@/lib/utils";
import sb from "@/public/sb.png";

export default function FeatureSection() {
  return (
    <section className="flex flex-col gap-8 items-center min-h-[900px] w-[90%] md:w-[85%] 2xl:w-4/5 3xl:w-2/3 mx-auto mt-20">
      <span className="flex flex-col items-center space-y-4">
        <h3 className="cursor-pointer text-rose-800 underline underline-offset-4 text-sm">
          features
        </h3>
        <h1 className="text-3xl font-medium">Finances, Simplified</h1>
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-3/5 gap-2">
        <div className="space-y-2">
          {cardDetails.slice(0, 2).map((item, idx) => (
            <Card key={idx} {...item} />
          ))}
        </div>
        <div className="space-y-2">
          {cardDetails.slice(2).map((item, idx) => (
            <Card key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Card = ({ header, title, description, image }: TCard) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileHover={{
        scale: 1.015
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.25,
        }
      }}
      className="bg-slate-200/65 cursor-pointer p-4 border-2 border-slate-200 rounded-lg shadow-sm flex flex-col gap-5 h-fit"
    >
      <div
        className={cn(
          "rounded-md shadow-md",
          !image ? "h-3/5 bg-neutral-300 animate-pulse" : "",
        )}
      >
        {image && (
          <Image
            alt="card-image"
            src={image}
            quality={100}
            placeholder="blur"
            // className="rounded-md"
          />
        )}
      </div>

      <div className="h-fit flex flex-col items-start gap-2 mt-3">
        <span className="space-y-0.5">
          <h5 className="font-mono text-blue-600 text-sm">{header}</h5>
          <h1 className="font-medium text-lg">{title}</h1>
        </span>

        <p className="text-[13px] text-neutral-900">{description}</p>
      </div>
    </motion.section>
  );
};

interface TCard {
  header: string;
  title: string;
  description: string;
  image?: any;
}

const cardDetails: TCard[] = [
  {
    header: "manage your money, your way",
    title: "Effortless Organization",
    image: transactions,
    description:
      "Add, update, sort, search, and track all your transactions in one intuitive space.",
  },
  {
    header: "simple and beautiful",
    title: "A Design You'll Love",
    image: design,
    description:
      "Sleek, fresh, modern, and easy to navigate, so you can focus on your money, not the interface.",
  },
  {
    header: "real-time balance and spending insights",
    title: "See It All at a Glance",
    image: sb,
    description:
      "Instantly know where you stand financially with real-time updates on your balance and recent transactions.",
  },
  {
    header: "automated income tracking",
    title: "Skip the Hassle",
    image: incomeSourcesImg,
    description:
      "Input your income sources and let the app handle the rest. Automatic payment logging means you'll never miss a payment.",
  },
];
