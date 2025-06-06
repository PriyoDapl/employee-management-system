'use client';

import Button from './Button';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  confirmVariant = "danger"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-6">
            {message}
          </p>
          
          <div className="flex gap-3 justify-end">
            <Button
              onClick={onClose}
              variant="primary"
              size="small"
            >
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              variant={confirmVariant}
              size="small"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;