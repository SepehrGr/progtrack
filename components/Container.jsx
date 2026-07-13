export default function Container({ children, className }) {
  return (
    <div
      className={`container w-full mx-auto sm:max-w-xl md:max-w-4xl lg:max-w-6xl xl:max-w-[1400px] ${className}`}
    >
      {children}
    </div>
  )
}
