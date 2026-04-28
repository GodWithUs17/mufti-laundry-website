/**
 * Format a number as Nigerian Naira
 * @param {number} amount
 * @returns {string} e.g. "₦3,500"
 */
export const formatNaira = (amount) => {
  return `₦${amount.toLocaleString('en-NG')}`
}

/**
 * Smooth scroll to a CSS selector
 * @param {string} selector - e.g. '#booking'
 */
export const smoothScroll = (selector) => {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}