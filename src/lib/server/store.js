// @ts-nocheck
// src/lib/server/store.js

/**
 * @type {Map<string, {status: string, email: string, amount: number, currency: string, metadata: {redirect: string}}>}
 */
const paymentStore = new Map();

export const store = {
	/**
	 * @param {string} reference
	 * @param {{email: string, amount: number, currency: string, metadata: {redirect: string}}} data
	 */
	createPayment: (reference, data) => {
		paymentStore.set(reference, { ...data, status: 'pending' });
	},
	/**
	 * @param {string} reference
	 */
	getPayment: (reference) => {
		return paymentStore.get(reference);
	},
	/**
	 * @param {string} reference
	 * @param {string} status
	 */
	updatePaymentStatus: (reference, status) => {
		const payment = paymentStore.get(reference);
		if (payment) {
			payment.status = status;
		}
	}
};