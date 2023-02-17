import { loginWithEmailPassword, logoutFirebase, singInWithGoogle } from "../../../src/firebase/provider";
import { checkingAuthentication, checkingCredentials, login, logout, startGoogleSingnIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/provider');

describe('Pruebas en los thunks', () => {
    
    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('should invocar el checkingCredentials', async() => {

        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
     
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login - exito', async() => {

        const loginData = { ok: true, ...demoUser};

        await singInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSingnIn()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
     
    });

    test('startGoogleSignIn debe de llamar checkingCredentials y logout - error', async() => {

        const loginData = { ok: false, errorMessage: 'Un error en google' };

        await singInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSingnIn()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
     
    });
    
    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - exito', async() => {

        const loginData = { ok: true, ...demoUser };

        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword( formData )( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
     
    });
    
    test('startLogout debe de llamar logoutFirebase, clearNtes y logout', async() => {

        const loginData = { ok: true, ...demoUser };

        const formData = { email: demoUser.email, password: '123456' };
        
        await startLogout()( dispatch );
        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
     
    });

})