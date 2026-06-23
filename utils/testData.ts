// Generates unique, deterministic-enough test data so each run is isolated
// and never collides with a previous run's account.
export function uniqueUser() {
  const stamp = Date.now();
  return {
    name: `Test User`,
    email: `flakehunter_${stamp}@example.com`,
    password: 'Test1234!',
    firstName: 'Test',
    lastName: 'User',
    address: '123 Test Street',
    country: 'Canada',
    state: 'Alberta',
    city: 'Edmonton',
    zipcode: 'T5J0N3',
    mobile: '7805551234',
    card: {
      name: 'Test User',
      number: '4242424242424242',
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2030',
    },
  };
}