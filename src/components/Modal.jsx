import { XCircleIcon } from '@heroicons/react/24/outline';

export default function Modal({
  children,
  isOpen,
  onClose,
  title = 'Modal Title',
  empty = 'There is nothing...',
}) {
  if (!isOpen) return null;
  return (
    <div>
      <div className="backdrop" onClick={onClose}></div>
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__header__title">{title}</h2>
          <XCircleIcon className="modal__icon" onClick={onClose} />
        </div>
        <div className="modal__body">
          {children.length !== 0 ? (
            children
          ) : (
            <p className="modal__body--empty">{empty}</p>
          )}
        </div>
      </div>
    </div>
  );
}
