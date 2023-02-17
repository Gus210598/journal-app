export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authenticatedState = {
    status: 'authenticated',
    uid: '123ABC',
    email: 'prueba@gmail.com',
    displayName: 'Prueba de testing',
    photoURL: 'https://mifoto.jpg',
    errorMessage: null
}

export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    email: 'prueba@gmail.com',
    displayName: 'Prueba de testing',
    photoURL: 'https://mifoto.jpg',
    errorMessage: null
}