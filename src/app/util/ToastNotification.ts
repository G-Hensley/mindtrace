import { toast } from 'react-hot-toast';

// Set up the Toast error notification
export const errorToast = (message: string) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-center',
    style: {
      background: '#091728',
      color: '#fff',
      fontSize: '16px',
    },
  });
};

// Set up the Toast success notification
export const successToast = (message: string) => {
  toast.success(message, {
    duration: 4000,
    position: 'top-center',
    style: {
      background: '#22c55e',
      color: '#fff',
      fontSize: '16px',
    },
  });
};
