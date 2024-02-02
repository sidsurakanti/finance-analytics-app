import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});
const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export { inter, poppins };
