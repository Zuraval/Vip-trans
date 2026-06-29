import { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import IMask from 'imask'
import emailjs from '@emailjs/browser'
import ContactModal from '../components/ContactModal'
import FormMessage from '../components/FormMessage'
import 'swiper/css'
import 'swiper/css/navigation'

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [transportType, setTransportType] = useState('Авто перевозка')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sending, setSending] = useState(false)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const priceFormRef = useRef<HTMLFormElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const phoneMaskRef = useRef<ReturnType<typeof IMask> | null>(null)
  const dateMaskRef = useRef<ReturnType<typeof IMask> | null>(null)

  useEffect(() => {
    if (phoneRef.current && !phoneMaskRef.current) {
      phoneMaskRef.current = IMask(phoneRef.current, { mask: '+{7}(000)000-00-00' })
    }
    if (dateRef.current && !dateMaskRef.current) {
      dateMaskRef.current = IMask(dateRef.current, {
        mask: 'd.m.0000',
        blocks: {
          d: { mask: IMask.MaskedRange, from: 1, to: 31 },
          m: { mask: IMask.MaskedRange, from: 1, to: 12 },
        },
      })
    }
    return () => {
      phoneMaskRef.current?.destroy()
      phoneMaskRef.current = null
      dateMaskRef.current?.destroy()
      dateMaskRef.current = null
    }
  }, [])

  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = priceFormRef.current
    if (!form) return

    const newErrors: Record<string, string> = {}

    const name = (form.querySelector('input[name="name"]') as HTMLInputElement)?.value.trim()
    const phone = (form.querySelector('input[name="phone"]') as HTMLInputElement)?.value
    const email = (form.querySelector('input[name="email"]') as HTMLInputElement)?.value.trim()
    const weight = (form.querySelector('input[name="weight"]') as HTMLInputElement)?.value.trim()
    const date = (form.querySelector('input[name="date"]') as HTMLInputElement)?.value.trim()

    if (!name) newErrors.name = 'Заполните это поле'
    if (!phone || phone === '+7()___-__-__') newErrors.phone = 'Заполните это поле'
    if (!email) newErrors.email = 'Заполните это поле'

    if (phoneMaskRef.current && phone && phone !== '+7()___-__-__') {
      const unmasked = phoneMaskRef.current.unmaskedValue
      if (unmasked && unmasked.length < 10) {
        newErrors.phone = 'Минимум 10 цифр'
      }
    }

    if (weight && !/^\d+([.,]\d+)?$/.test(weight)) {
      newErrors.weight = 'Только цифры'
    }

    if (date && !/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
      newErrors.date = 'Формат: ДД.ММ.ГГГГ'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    const toEmail = transportType.includes('Авто') ? 'iz.ekb@vip-trans.su' : 'andrey@vip-trans.su'

    setSending(true)
    emailjs.send('service_ypoqvcl', 'template_vsd28uc', {
      name: (form.querySelector('input[name="name"]') as HTMLInputElement)?.value || '',
      departure: (form.querySelector('input[name="departure"]') as HTMLInputElement)?.value || '',
      arrival: (form.querySelector('input[name="arrival"]') as HTMLInputElement)?.value || '',
      weight: (form.querySelector('input[name="weight"]') as HTMLInputElement)?.value || '',
      cargo_name: (form.querySelector('input[name="cargo_name"]') as HTMLInputElement)?.value || '',
      date: (form.querySelector('input[name="date"]') as HTMLInputElement)?.value || '',
      phone: (form.querySelector('input[name="phone"]') as HTMLInputElement)?.value || '',
      email: (form.querySelector('input[name="email"]') as HTMLInputElement)?.value || '',
      transport_type: transportType,
      to_email: toEmail,
    }).then(() => {
      setMsg({ type: 'success', text: 'Сообщение успешно отправлено!' })
      form.reset()
      setTransportType('Авто перевозка')
      if (phoneMaskRef.current) phoneMaskRef.current.value = ''
      if (dateMaskRef.current) dateMaskRef.current.value = ''
    }).catch((error) => {
      setMsg({ type: 'error', text: 'Ошибка при отправке: ' + JSON.stringify(error) })
    }).finally(() => {
      setSending(false)
    })
  }

  const arrowSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <path fill="currentColor" d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z" />
    </svg>
  )

  return (
    <>
      <FormMessage
        isOpen={!!msg}
        type={msg?.type || 'success'}
        message={msg?.text || ''}
        onClose={() => setMsg(null)}
      />
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section className="hero-homepage">
        <div className="hero-homepage-container">
          <Swiper modules={[Navigation]} navigation loop className="swiper">
            <SwiperSlide>
              <div className="swiper-slide_container-1">
                <span className="title-text-slide">КОМПАНИЯ КОТОРОЙ МОЖНО ДОВЕРЯТЬ</span>
                <span className="subtitle-text-slide"></span>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-slide_container-2">
                <span className="title-text-slide">КОМПАНИЯ КОТОРОЙ МОЖНО ДОВЕРЯТЬ</span>
                <span className="subtitle-text-slide"></span>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-slide_container-3">
                <span className="title-text-slide">КОМПАНИЯ КОТОРОЙ МОЖНО ДОВЕРЯТЬ</span>
                <span className="subtitle-text-slide"></span>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section className="scroll-image">
        <div className="scroll-image_sticky">
          <img src="/шаман.jpg" alt="" />
        </div>
        <form ref={priceFormRef} className="scroll-image_text-block" id="price-count" onSubmit={handlePriceSubmit} noValidate>
          <div className="scroll-image_text-block__title title-text">Рассчитайте стоимость</div>
          <div className="scroll-image_text-block__buttons">
            <div
              className={`text-block_button_white ${transportType === 'Авто перевозка' ? 'active' : ''}`}
              onClick={() => setTransportType('Авто перевозка')}
            >
              Авто перевозка
            </div>
            <div
              className={`text-block_button_white ${transportType === 'ЖД перевозка' ? 'active' : ''}`}
              onClick={() => setTransportType('ЖД перевозка')}
            >
              ЖД перевозка
            </div>
          </div>
          <div className="scroll-image_text-block__inputs">
            <div className="scroll-image_text-block__inputs-left">
              {[
                { name: 'name', placeholder: 'Имя', required: true },
                { name: 'phone', placeholder: 'Телефон', ref: phoneRef, required: true },
                { name: 'email', placeholder: 'Email', required: true },
                { name: 'cargo_name', placeholder: 'Наименование груза' },
              ].map((field) => (
                <div key={field.name} className="field-wrapper">
                  <input
                    ref={'ref' in field ? field.ref : undefined}
                    placeholder={field.placeholder}
                    name={field.name}
                    onChange={() => {
                      if (errors[field.name]) setErrors((prev) => ({ ...prev, [field.name]: '' }))
                    }}
                  />
                  {field.required && <span className="field-required">*</span>}
                  {errors[field.name] && (
                    <span className="field-error">{errors[field.name]}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="scroll-image_text-block__inputs-right">
              {[
                { name: 'departure', placeholder: 'Город отправления' },
                { name: 'arrival', placeholder: 'Город получения' },
                { name: 'weight', placeholder: 'Вес (кг)', inputMode: 'decimal' as const },
                { name: 'date', placeholder: 'ДД.ММ.ГГГГ', ref: dateRef },
              ].map((field) => (
                <div key={field.name} className="field-wrapper">
                  <input
                    ref={'ref' in field ? field.ref : undefined}
                    placeholder={field.placeholder}
                    name={field.name}
                    inputMode={'inputMode' in field ? field.inputMode : undefined}
                    onChange={() => {
                      if (errors[field.name]) setErrors((prev) => ({ ...prev, [field.name]: '' }))
                    }}
                  />
                  {errors[field.name] && (
                    <span className="field-error">{errors[field.name]}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button type="submit" id="submit" className="text-block_button_white" disabled={sending}>
            {sending ? 'Отправка...' : 'Узнать стоимость'}
          </button>
        </form>
      </section>

      <section className="contacts-block">
        <div className="contacts-block__card">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A6aa8097d9e1dfaa7b3af09744b666eeb06da338be0d33c655e7a5d21777e2cd7&amp;source=constructor"
            width="100%"
            height="100%"
            frameBorder="0"
          />
        </div>
        <div className="contacts-block__info">
          <div className="contacts-block__info__container">
            <div className="contacts-block__info__title__arrow-top">
              {arrowSvg}
              ОФИС
            </div>
            <div className="contacts-block__info__title title-text">КОНТАКТЫ</div>
            <div className="contacts-block__info__subtitle subtitle-text">+7 (343) 237 21 21 (офис)<br />+7 (963) 068 88 33 (сервис)</div>
            <div className="contacts-block__info__title description-text">Адрес: г. Екатеринбург, ул. Бебеля 17, офис 407, компания «Вип-Транс»</div>
            <div className="contacts-block__info__buttons">
              <div className="contacts-block__info__buttons__vk">
                <a href="https://vk.ru/vip_trans" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2m3.08 14.27h-1.46c-.55 0-.72-.45-1.69-1.44c-.88-.83-1.26-.95-1.47-.95c-.29 0-.38.08-.38.5v1.31c0 .35-.11.57-1.04.57c-1.54 0-3.25-.94-4.45-2.67c-1.81-2.54-2.3-4.46-2.3-4.84c0-.21.07-.41.49-.41h1.47c.37 0 .51.16.65.56c.72 2.1 1.92 3.9 2.41 3.9c.19 0 .27-.09.27-.55V10.1c-.05-.98-.58-1.07-.58-1.42c0-.18.14-.34.37-.34h2.29c.31 0 .42.16.42.54v2.89c0 .31.13.42.23.42c.18 0 .34-.11.67-.45c1.05-1.17 1.8-2.98 1.8-2.98c.1-.21.26-.41.65-.41h1.43c.44 0 .54.23.44.54c-.18.85-1.96 3.36-1.94 3.36c-.16.25-.22.36 0 .65c.15.21.66.65 1 1.04c.62.71 1.1 1.3 1.23 1.71c.11.41-.09.62-.51.62z" fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="contacts-block__info__title__arrow-bottom">
              СЕРВИС
              {arrowSvg}
            </div>
          </div>
        </div>
        <div className="contacts-block__card">
          <a href="https://yandex.ru/maps/org/vip_trans/111118655355/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}>Вип-Транс</a>
          <a href="https://yandex.ru/maps/11190/sovetsky/category/car_service_auto_repair/184105246/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}>Автосервис, автотехцентр в Советском</a>
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=63.595617%2C61.359046&mode=search&oid=111118655355&ol=biz&z=16.64"
            width="100%"
            height="100%"
            frameBorder="1"
            allowFullScreen
            style={{ position: 'relative' }}
          />
        </div>
      </section>
    </>
  )
}
