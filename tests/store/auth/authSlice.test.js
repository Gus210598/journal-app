import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Prueba del authSlice', () => { 

    test('should de regresar el estado inicial y llamarse "auth"', () => {
        
        const state = authSlice.reducer( initialState, {});
        
        expect( authSlice.name ).toBe('auth');
        expect( state ).toEqual( initialState );
    });

    test('should de realizar la autenticación', () => { 

        const state = authSlice.reducer( initialState, login( demoUser ));
        //console.log(state);
        expect( state ).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        });
     })

    test('should de realizar el logout sin argumentos', () => { 

        const state = authSlice.reducer( authenticatedState, logout());
        //console.log(state);
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
     })

    test('should de realizar el logout y mostrar mensaje de error', () => { 

        const errorMessage = 'Credenciales no son correctas';
        const state = authSlice.reducer( authenticatedState, logout({errorMessage}));
        //console.log(state);
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        });
     })

     test('should de cambiar el estado a checking', () => { 

        const state = authSlice.reducer( authenticatedState, checkingCredentials() );
        expect( state.status ).toBe('checking');


     })

 })