export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getStatusColor = (status) => {
  const colors = {
    PENDING: '#FFD166',
    CONFIRMED: '#4CC9F0',
    PREPARING: '#FF6B35',
    OUT_FOR_DELIVERY: '#FF8C5A',
    DELIVERED: '#06D6A0',
    CANCELLED: '#EF476F',
  };
  return colors[status] || '#999';
};

export const getStatusLabel = (status) => {
  const labels = {
    PENDING: 'Pending',
    CONFIRMED: 'Confirmed',
    PREPARING: 'Preparing',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
  };
  return labels[status] || status;
};

export const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

export const truncateText = (text, maxLength = 80) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export const getPaymentLabel = (method) => {
  const labels = {
    CASH_ON_DELIVERY: '💵 Cash on Delivery',
    UPI: '📱 UPI',
    CREDIT_CARD: '💳 Credit Card',
    DEBIT_CARD: '💳 Debit Card',
  };
  return labels[method] || method;
};

export const generateOrderId = (id) => `FE-${String(id).padStart(5, '0')}`;
