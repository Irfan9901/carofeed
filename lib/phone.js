function normalizePhone(phone) {
  const digits = (phone || '').replace(/[^0-9]/g, '');
  if (digits.startsWith('0')) return '62' + digits.slice(1);
  if (digits.startsWith('8')) return '62' + digits;
  return digits;
}

module.exports = { normalizePhone };
