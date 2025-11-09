export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

export const formatTimeForInput = (date: Date | null): string => {
    if (!date) return '';
    const dateObj = new Date(date);
    return dateObj.toTimeString().slice(0, 5);
  };