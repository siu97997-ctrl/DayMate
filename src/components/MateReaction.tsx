type MateReactionProps = {
  message: string | null
  isPopping: boolean
}

export function MateReaction({ message, isPopping }: MateReactionProps) {
  if (!message) return null

  return (
    <div className={`reaction-bubble is-visible${isPopping ? ' is-popping' : ''}`} aria-live="polite">
      <span className="reaction-quote" aria-hidden="true">
        “
      </span>
      {message}
    </div>
  )
}
