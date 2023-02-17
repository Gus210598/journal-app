import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'curso-react-gus',
    api_key: '983829398968667',
    api_secret: 'OuEn2RKNxhOup-aZjTj-vhqdMbU',
    secure: true
})

describe('Pruebas en fileUpload', () => { 

    test('should de subir el archivo correctamente a Claudinary', async () => { 

        const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaeAYf-Rs6kbnVB12gRhji2ZQ6o7MbNvAuMQ&usqp=CAU';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');
        const url= await fileUpload( file );
        expect( typeof url ).toBe('string'); 
        //console.log(url);
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');

        const cloudResp = await cloudinary.api.delete_resources(['journal/' + imageId]);

        //console.log(cloudResp);

    });

    test('should de retornar null', async () => { 

        const file = new File([], 'foto.jpg');

        const url= await fileUpload( file );

        expect( url ).toBe(null);
     });

 })