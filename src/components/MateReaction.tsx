type MateReactionProps = {
  message: string | null
}

export function MateReaction({ message }: MateReactionProps) {
  return (
    <div className={`reaction-bubble${message ? ' is-visible' : ''}`} aria-live="polite">
      {message ?? '想和班友说点什么吗？'}
    </div>
  )
}
