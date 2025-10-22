export function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className='text-muted-foreground block'>{label}</span>
      <span className='text-card-foreground block'>{value || '-'}</span>
    </div>
  )
}
