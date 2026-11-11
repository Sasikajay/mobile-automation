export const testData = {
    signup: {
        validEmail: () => `qa.signup.${Date.now()}@example.com`,
        invalidEmail: 'not-an-email',
        password: 'ValidPass123',
        mismatchedPassword: 'DifferentPass123'
    },
    login: {
        invalidEmail: 'not-an-email',
        shortPassword: 'short'
    },
    forms: {
        echoText: 'Native form input verified'
    }
};