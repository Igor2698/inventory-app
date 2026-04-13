'use client'

import { useI18n } from '../i18n/I18nProvider'

const DeleteOrderModal = ({ order, onClose, onConfirm }) => {
  const { t } = useI18n()
  if (!order) return null

  return (
    <div className="delete-modal animate__animated animate__fadeIn">
      <div className="delete-modal__overlay" onClick={onClose} />
      <div className="delete-modal__content">
        <h3>{t('confirmDeleteOrder')}</h3>
        <p>{order.title}</p>
        <div className="delete-modal__actions">
          <button className="btn btn-light" onClick={onClose}>{t('cancel')}</button>
          <button className="btn btn-danger" onClick={onConfirm}>{t('delete')}</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteOrderModal
