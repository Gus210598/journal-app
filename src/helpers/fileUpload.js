

export const fileUpload = async( file ) => {

    //if ( !file ) throw new Error('No existe ningún archivo para subir');

    if ( !file ) return null;

    const cloudUrl = 'https://api.cloudinary.com/v1_1/curso-react-gus/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file );

    try {
        
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

  
        if ( !resp.ok ) throw new Error('No se pudo subir imagen');
        
        const cloudResp = await resp.json();
  
        return cloudResp.secure_url;

    } catch (error) {
        // Se comentan para realizar las pruebas
        // console.log(error);
        // throw new Error( error.message );
        return null;
    }

}
