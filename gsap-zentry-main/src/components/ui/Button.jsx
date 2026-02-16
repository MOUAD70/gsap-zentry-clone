const Button = ({ title, id, rightIcon, leftIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon}

      <span className="relative inline-flex items-center h-[1em] overflow-hidden font-general text-xs uppercase leading-none align-middle">
        <span className="block translate-y-0 transition-transform duration-1125 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
          {title}
        </span>
        <span className="absolute left-0 top-full block transition-transform duration-1125 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
          {title}
        </span>
      </span>

      {rightIcon}
    </button>
  );
};

export default Button;
