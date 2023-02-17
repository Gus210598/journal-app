
import { registerUserWhithEmailPassword, singInWithGoogle, loginWithEmailPassword, logoutFirebase } from '../../firebase/provider';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, login, logout } from './'

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

    }
}

export const startGoogleSingnIn = () =>{
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await singInWithGoogle();

        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );
        dispatch( login( result ) );

    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWhithEmailPassword({ email, password, displayName });
        //console.log(resp);
        if ( !ok ) return dispatch( logout({errorMessage}));

        dispatch( login({  uid, displayName, email, photoURL }) );

    }
}


export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        

        const result = await loginWithEmailPassword({ email, password });
        //console.log(result);
        if ( !result.ok ) return dispatch( logout(result));

        dispatch( login( result ) );

    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();
        dispatch( clearNotesLogout() );
        dispatch( logout() );
    }
}