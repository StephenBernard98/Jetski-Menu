"use client";
import { Inter, Mooli } from "next/font/google";

const mooli = Mooli({ subsets: ["latin"], weight: "400" });

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

interface ButtonProps {
  children?: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  const load = () => {
    // Your load function implementation
  };

  return (
    <div>
      <button
        className={`${mooli.className} ${inter.className} bg-blue-600 tracking-wider px-8 py-2 mt-1 rounded-lg cursor-pointer hover:bg-blue-700 text-white slide-in-top duration-300  `}
        // onClick={handleClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
