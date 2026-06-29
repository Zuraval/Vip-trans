import { useState } from 'react'
import ContactModal from '../components/ContactModal'

const autoTransport = [
  { title: 'Перевозка щеповозом', image: '/щеповозprime.jpg' },
  { title: 'Перевозка лесовозом', image: '/лесовозprime.jpg' },
  { title: 'Перевозка евро фурой', image: '/WhatsApp Image 2025-07-14 at 18.40.10 (12).jpeg' },
  { title: 'Перевозка контейнеровозом', image: '/контейнеровоз.jpg' },
]

const railTransport = [
  { title: 'Перевозка контейнерным поездом', image: '/WhatsApp Image 2025-07-14 at 18.40.10 (3).jpeg' },
  { title: 'Предоставление подвижного состава', image: '/WhatsApp Image 2025-07-14 at 18.40.10 (8).jpeg' },
  { title: 'Оплата ЖД тарифов по СНГ', image: '/WhatsApp Image 2025-07-14 at 18.40.10 (2).jpeg' },
]

export default function TransportPage() {
  const [autoModalOpen, setAutoModalOpen] = useState(false)
  const [railModalOpen, setRailModalOpen] = useState(false)

  return (
    <>
      <ContactModal isOpen={autoModalOpen} onClose={() => setAutoModalOpen(false)} toEmail="iz.ekb@vip-trans.su" />
      <ContactModal isOpen={railModalOpen} onClose={() => setRailModalOpen(false)} toEmail="andrey@vip-trans.su" />
      <div className="service container">
        <div className="service__first-title title-text">Перевозка грузовым автотранспортом</div>
        <div className="service__container-first">
          {autoTransport.map((s, i) => (
            <div className="service__card" key={i}>
              <img src={s.image} className="service__card__img" alt="услуга" />
              <div className="service__card__title title-text">{s.title}</div>
              <div className="service__card__subtitle subtitle-text"></div>
              <button className="service__card__button text-block_button-red open-modal-btn" onClick={() => setAutoModalOpen(true)}>
                Заказать услугу
              </button>
            </div>
          ))}
        </div>

        <div className="service__second-title title-text">Железнодорожные перевозки</div>
        <div className="service__container-second">
          {railTransport.map((s, i) => (
            <div className="service__card" key={i}>
              <img src={s.image} className="service__card__img" alt="услуга" />
              <div className="service__card__title title-text">{s.title}</div>
              <div className="service__card__subtitle subtitle-text"></div>
              <button className="service__card__button text-block_button-red open-modal-btn" onClick={() => setRailModalOpen(true)}>
                Заказать услугу
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
