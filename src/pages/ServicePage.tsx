import { useState } from 'react'
import ContactModal from '../components/ContactModal'

const services = [
  { title: 'Ремонт грузовых автомобилей любой сложности', image: '/WhatsApp Image 2025-07-14 at 18.40.10 (9).jpeg' },
  { title: 'Регулировка развал-схождения лазерным оборудованием', image: '/WhatsApp Image 2025-07-14 at 18.40.10 (6).jpeg' },
  { title: 'Автомойка для грузовых автомобилей', image: '/WhatsApp Image 2025-07-14 at 18.40.09 (11).jpeg' },
  { title: 'Подбор и закупка запчастей', image: '/WhatsApp Image 2025-07-14 at 18.40.10 (1).jpeg' },
]

export default function ServicePage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="service container">
        <div className="service__first-title title-text"></div>
        <div className="service__container-first">
          {services.map((s, i) => (
            <div className="service__card" key={i}>
              <img src={s.image} className="service__card__img" alt="услуга" />
              <div className="service__card__title title-text">{s.title}</div>
              <div className="service__card__subtitle subtitle-text"></div>
              <button className="service__card__button text-block_button-red open-modal-btn" onClick={() => setModalOpen(true)}>
                Заказать услугу
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
