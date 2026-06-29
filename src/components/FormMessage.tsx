interface FormMessageProps {
  isOpen: boolean
  type: 'success' | 'error'
  message: string
  onClose: () => void
}

export default function FormMessage({ isOpen, type, message, onClose }: FormMessageProps) {
  if (!isOpen) return null

  return (
    <div className="form-message-overlay" onClick={onClose}>
      <div className={`form-message ${type}`} onClick={(e) => e.stopPropagation()}>
        <div className="form-message-icon">
          {type === 'success' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        <p className="form-message-text">{message}</p>
        <button className="form-message-btn" onClick={onClose}>OK</button>
      </div>
    </div>
  )
}
