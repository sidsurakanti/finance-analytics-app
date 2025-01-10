import { Geist_Mono, Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const mono = Geist_Mono({
  weight: ["200", "400", "500", "600"],
  subsets: ["latin"]
});

export { inter, poppins, mono };
