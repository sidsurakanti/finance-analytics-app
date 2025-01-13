"use client";

import home from "@/public/home.png";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const rotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, 0]);

  return (
    <section className="w-[90%] md:w-[85%] 2xl:w-4/5 3xl:w-2/3 mx-auto mt-20">
      <div className="relative p-10 flex flex-col justify-center items-center gap-12">
        <svg
          width="701"
          height="274"
          viewBox="0 0 701 274"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute lg:-inset-2 top-10 mx-auto -z-10"
        >
          <motion.path
            initial={{
              pathLength: 0.001,
            }}
            animate={{
              pathLength: 1,
            }}
            transition={{
              duration: 0.5,
              stiffness: 90,
              mass: 3,
            }}
            stroke="#f472b6"
            strokeWidth={4}
            strokeLinecap="round"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M297.372 118.04C264.478 119.357 231.969 120.976 200.269 122.746C155.392 125.25 110.534 127.84 65.9454 131.941C51.9099 133.236 37.6568 134.056 23.7091 135.675C14.9537 136.689 3.34411 138.135 1.82051 138.438C1.0236 138.61 0.675935 138.87 0.563595 138.956C-0.226293 139.56 -0.0821673 140.143 0.363681 140.596C0.542722 140.79 0.995464 141.265 2.25226 141.33C86.3034 145.755 172.25 137.121 256.403 136.215C402.339 134.661 552.699 140.834 697.477 154.302C698.74 154.41 699.969 153.871 700.145 153.072C700.355 152.295 699.443 151.539 698.179 151.432C553.156 137.941 402.55 131.746 256.333 133.322C177.906 134.164 97.9305 141.74 19.3946 139.15C21.199 138.934 22.9685 138.718 24.5834 138.524C38.4749 136.905 52.6683 136.107 66.6475 134.812C111.141 130.71 155.908 128.12 200.725 125.638C256.333 122.53 314.363 119.853 372.85 118.602C393.773 118.796 414.626 118.99 435.479 119.228C480.591 119.746 525.913 121.257 570.919 123.285C584.47 123.911 598.021 124.559 611.572 125.12C616.066 125.314 627.651 125.875 629.266 125.832C631.267 125.789 631.653 124.753 631.688 124.581C631.793 124.192 631.723 123.652 630.74 123.199C630.634 123.134 630.003 122.918 628.598 122.789C546.766 115.148 459.387 113.875 372.921 115.709C281.715 114.911 190.158 114.565 99.1839 114.198C97.8815 114.198 96.8177 114.846 96.8072 115.644C96.8002 116.443 97.8498 117.091 99.1522 117.112C165.025 117.371 231.232 117.63 297.372 118.04Z"
            fill="transparent"
          />
        </svg>

        <h1 className={cn("text-6xl font-bold tracking-tighter")}>
          Take control of your money.
        </h1>

        <Link href="/login">
          <motion.button
            animate={{}}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="inline-flex items-center text-sm justify-center h-9 px-4 py-2 bg-fuchsia-200 text-fuchsia-800 border border-fuchsia-400 rounded-xl shadow-md hover:bg-fuchsia-300 hover:text-fuchsia-950"
          >
            let&apos;s go
          </motion.button>
        </Link>
      </div>

      <div className="w-5/6 mx-auto">
        <motion.div
          className="py-2 mt-16"
          animate={{
            y: 0,
          }}
          initial={{
            y: 300,
          }}
          transition={{
            type: "spring",
            duration: 0.75,
          }}
          style={{
            rotateZ: rotateZ,
          }}
          whileHover={{
            scale: 1.1,
          }}
        >
          <Image alt="hero" src={home} quality={100} />
        </motion.div>
      </div>
    </section>
  );
}
