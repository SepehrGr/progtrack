export default function InfoItem({ title, value }) {
  return (
    <div className='flex gap-6'>
      <p className='text-lg font-semibold text-neutral-600'>{title}:</p>
      <p className='text-lg font-semibold'>{value}</p>
    </div>
  )
}
