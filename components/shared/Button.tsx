"use client";

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
        className={` bg-blue-600 tracking-wider px-8 py-2 mt-1 rounded-lg cursor-pointer hover:bg-blue-700 text-white slide-in-top duration-300  `}
        // onClick={handleClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
