export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1">
        {/* Инициалы */}
        <span className="text-2xl font-bold text-primary">КК</span>
        {/* Brand text */}
        <span className="text-xl font-semibold tracking-tight ml-1">ВебМастер</span>
      </div>
    </div>
  )
}