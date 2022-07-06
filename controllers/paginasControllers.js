import { Viaje } from '../models/Viaje.js'
import { Testimonial } from '../models/Testimoniales.js';
const paginaInicio = async (req, res) => {
    //Consultar 3 viajes 
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimonial.findAll({limit: 3}));
    try {
        const [viajes, testimoniales] = await Promise.all(promiseDB);
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: viajes,
            testimoniales: testimoniales
        });
    } catch (error) {
        console.log(error);
    }
    
};

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {
    //Consultar DB
    const viajes = await Viaje.findAll();
    res.render('viajes', {
        pagina: 'Próximos viajes',
        viajes : viajes
    });
}


const paginaTestimoniales = async (req, res) => {
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales: testimoniales
        });
    } catch (error) {
        console.log(error);
    }
    
}

//Muestra pagina por su slug
const paginaDetalleViaje = async (req, res) => {
    const {slug} = req.params;
    console.log(slug);
    try {
        const resultado = await Viaje.findOne(
                                {
                                    where :
                                    {
                                        slug : slug
                                    }
                                });
        res.render('viaje',{
            pagina: 'Informacion Viaje',
            viaje: resultado
        })
    } catch (error) {
        console.log(error);
    }
}
export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}