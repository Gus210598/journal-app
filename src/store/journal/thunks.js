
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";

import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./";


export const startNewNote = () => {
    return async( dispatch, getState  ) => {

        dispatch( savingNewNote() )

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }
    
        //Crea el nuevo registro
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) )
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        //Manda a llamar el journalSlice.js y agregar al store la información
        //Para que quede la información deponible para toda la aplicación
        dispatch( addNewEmptyNote( newNote ));
        dispatch( setActiveNote( newNote ));
    }
}

export const starLoadingNotes = () => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;
        
        if ( !uid ) throw new error('El UID del usuario no existe');
        
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ));

    }
}

export const startSaveNote = () =>{
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };

        //Elimina la propiedad del objeto note quedando guardado en noteToFireStore
        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await setDoc( docRef, noteToFireStore, { merge: true });

        dispatch( updateNote( note ) );

    };
};

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );

        const fileUploadPromises = [];

        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ));
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote( photosUrls ));
    }

}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );

        await deleteDoc( docRef );
        dispatch( deleteNoteById( note.id ));
        
    }
}