'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // Functions
  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);

    // Delaying the onClose function for an animation that will take 300 ms
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
        <div className='relative w-full md:w-4/6 lg:w-3/6 xl:2/5 my-6 mx-auto h-full md:h-auto'>
          {/* Content */}
          <div
            className={`translate duration-300 h-full ${
              showModal
                ? 'translate-y-0 opacity-100'
                : 'translate-y-full opacity-0'
            }`}
          >
            <div className='flex flex-col w-full relative translate h-full md:h-auto bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none'>
              {/* Header */}
              <div className='flex relative justify-center items-center p-6 rounded-t border-b-[1px]'>
                <button
                  className='absolute left-9 p-1 border-0 hover:opacity-70 transition'
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>

                <div className='text-lg font-semibold'>{title}</div>
              </div>

              {/* Body */}
              <div className='flex-auto relative p-6'>{body}</div>

              {/* Footer */}
              <div className='flex flex-col gap-2 p-6'>
                <div className='flex items-center gap-4 w-full'>
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}

                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
