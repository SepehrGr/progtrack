export default function DashboardHeader({ children }) {
  return (
    <h1 className='text-2xl font-bold bg-gradient-to-l text-primary-800 from-gray-300 to-gray-400 p-7'>
      {children}
    </h1>
  )
}
