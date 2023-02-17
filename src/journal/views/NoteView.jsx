import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from "../../hooks/useForm"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import { ImageGallery } from "../components"

export const NoteView = () => {

    const dispatch = useDispatch()

    //La nota activa se va llamar ahora note
    const { active:note, messageSaved, isSaving  } = useSelector( state => state.journal );
    
    const { body, title, date, onInputChange, formState } = useForm( note );

    const dateString = useMemo(() =>{
        const newDate = new Date( date );
        return newDate.toUTCString(); 
    },[date])

    const fileInputRef = useRef();

    useEffect(() => {
      dispatch( setActiveNote( formState ));
    }, [ formState ])
    
    useEffect(() => {
      if ( messageSaved.length > 0 ) {
        Swal.fire({
            title: 'Nota actualizada',
            text: messageSaved,
            icon: 'success',
            confirmButtonText: 'Buena!!!'
          })
      }
    }, [messageSaved])
    
    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({ target }) => {
        if ( target.files === 0 ) return;

        dispatch( startUploadingFiles( target.files ));
        //console.log('subiendo archivos');
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
        Swal.fire({
            title: 'Nota Borrada',
            text: messageSaved,
            icon: 'success',
            confirmButtonText: 'Buena!!!'
          })
    }

  return (
    <Grid 
        container 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' sx={{ mb:1 }}
        className="animate__animated animate__fadeIn animate__faster"
    >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='ligth'>{ dateString }</Typography>
        </Grid>
        <Grid item>

            <input 
                type= "file"
                multiple
                ref= { fileInputRef }
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />

            <IconButton
                color="primary"
                disabled= { isSaving }
                onClick= { () => fileInputRef.current.click() }
            >
                <UploadOutlined />
            </IconButton>

            <Button
                disabled = { isSaving } 
                onClick={ onSaveNote }
                color="primary" 
                sx={{ padding: 2 }}
            >
                <SaveOutlined sx={{ fontSize:30, mr:1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un Título"
                label="Título"
                sx={{ border:'none', mb:1 }}
                name= "title"
                value={ title }
                onChange={ onInputChange }

            />
          
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="Qué sucedió el día de hoy"
                minRows={5}
                name= "body"
                value={ body }
                onChange={ onInputChange }
            />
          
        </Grid>

        <Grid container justifyContent='end'>
            <Button
                onClick={ onDelete }
                sx={{ mt:2 }}
                color="error"
            >
                <DeleteOutline />
                Borrar
            </Button>

        </Grid>

        <ImageGallery images={ note.imageUrls }/>

    </Grid>
  )
}
