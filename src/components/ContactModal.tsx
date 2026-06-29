import { useEffect, useRef, useState } from 'react'
import IMask from 'imask'
import emailjs from '@emailjs/browser'
import FormMessage from './FormMessage'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  toEmail?: string
}

export default function ContactModal({ isOpen, onClose, toEmail = 'service@vip-trans.su' }: ContactModalProps) {
  const phoneRef = useRef<HTMLInputElement>(null)
  const maskRef = useRef<ReturnType<typeof IMask> | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sending, setSending] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (!isOpen) return

    const timer = setTimeout(() => {
      if (phoneRef.current) {
        maskRef.current?.destroy()
        maskRef.current = IMask(phoneRef.current, { mask: '+{7}(000)000-00-00' })
      }
    }, 0)

    return () => {
      clearTimeout(timer)
      maskRef.current?.destroy()
      maskRef.current = null
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!form.name.trim()) newErrors.name = 'Заполните это поле'
    if (!form.email.trim()) {
      newErrors.email = 'Заполните это поле'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Введите корректный email'
    }

    const phoneValue = phoneRef.current?.value || ''
    const unmasked = maskRef.current?.unmaskedValue || ''
    const phoneEmpty = !phoneValue || phoneValue === '+7()___-__-__'
    const phoneTooShort = unmasked.length > 0 && unmasked.length < 10

    if (phoneEmpty) {
      newErrors.phone = 'Заполните это поле'
    } else if (phoneTooShort) {
      newErrors.phone = 'Минимум 10 цифр'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setSending(true)
    emailjs.send('service_ypoqvcl', 'template_vsd28uc', {
      name: form.name,
      phone: phoneValue,
      email: form.email,
      to_email: toEmail,
    }).then(() => {
      setMsg({ type: 'success', text: 'Сообщение успешно отправлено!' })
      setForm({ name: '', phone: '', email: '' })
      setErrors({})
      if (phoneRef.current) phoneRef.current.value = ''
      if (maskRef.current) maskRef.current.value = ''
    }).catch((error) => {
      setMsg({ type: 'error', text: 'Ошибка при отправке: ' + JSON.stringify(error) })
    }).finally(() => {
      setSending(false)
    })
  }

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  if (!isOpen) return null

  return (
    <>
      <FormMessage
        isOpen={!!msg}
        type={msg?.type || 'success'}
        message={msg?.text || ''}
        onClose={() => { setMsg(null); onClose() }}
      />
      <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="modal">
          <h2>Оставить заявку</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="field-wrapper">
              <input
                type="text"
                placeholder="Ваше имя"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              <span className="field-required">*</span>
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
            <div className="field-wrapper">
              <input
                ref={phoneRef}
                type="tel"
                name="phone"
                placeholder="+7(___)___-__-__"
                onChange={() => {
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }))
                }}
              />
              <span className="field-required">*</span>
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
            <div className="field-wrapper">
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              <span className="field-required">*</span>
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
            <button type="submit" disabled={sending}>
              {sending ? 'Отправка...' : 'Отправить'}
            </button>
          </form>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
      </div>
    </>
  )
}
