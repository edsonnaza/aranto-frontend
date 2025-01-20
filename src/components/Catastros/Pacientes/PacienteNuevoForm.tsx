import SelectGenero from "../../Forms/SelectGroup/SelectGenero";
import SelectTipoDocumento from "../../Forms/SelectGroup/SelectTipoDocumento";
import DatePickerFNac from "../../Forms/DatePicker/DatePickerFNac";
import SelectSeguroMedico from "../../Forms/SelectGroup/SelectSeguroMedico";
import { PacienteTypes } from "../../../types/pacientetypes";
import { useNavigate, useParams, Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect, useState } from "react";
import  inputClass  from './getInputClassName'
const URL = import.meta.env.VITE_LOCALURL_BACKEND;
// Valor inicial vacío
const initInput:PacienteTypes = { 'paciente_id':'',
                    'nombres': '', 
                    'apellidos': '', 
                    'genero':'',
                    'tipo_documento':'',
                    'documento_numero':'',
                    'seguromedico_id':'',
                    'fechaNacimiento':'',
                    'foto':'https://avatar.iran.liara.run/public/boy',
                    'descripcion':'',
                    activo: true };
                    
                    

const PacienteNuevoForm = ()=>{
 
    const navigate = useNavigate(); 
    const { id } = useParams();
    const [inputEntry, setInputEntry] = useState<PacienteTypes>(initInput);
    const [inputError, setInputError] = useState<{ [key: string]: string }>({});
    const [editMode, setEditMode] = useState(false); // Estado para determinar si es edición
    const [formIsValid, setFormIsValid] = useState(false);

        // Verifica los inputs
        const handlerInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            const { name, value } = event.target;
            setInputEntry((prev: any) => ({
            ...prev,
            [name]: value,
            }));
            checkInputEntry(name, value);
        }

        // Verifica las entradas para el error a mostrar en el form
        const checkInputEntry = async (name: string, value: string) => {
            
            setInputError((prev) => {
            const newErrors = { ...prev };
            if (name === 'nombres') {
                if (value.length < 3) {
                newErrors.nombres = 'Nombres debe ser mínimo 3 caracteres.';
                } else {
                delete newErrors.nombres;
                }
            }
            if (name === 'apellidos') {
                if (value.length < 3) {
                newErrors.apellidos = 'Apellidos debe ser mínimo 3 caracteres.';
                } else {
                delete newErrors.apellidos;
                }
            }
            if (name === 'tipo_documento') {
                if (value==='' ) {
                newErrors.tipo_documento = 'Seleccionar un tipo de documento.';
                } else {
                delete newErrors.tipo_documento;
                }
            }
            if (name === 'documento_numero') {
                if (value.length < 3) {
                newErrors.documento_numero = 'Numero de documento debe ser mínimo 3 dígitos.';
                } else {
                delete newErrors.documento_numero;
                }
            }
            if (name === 'genero') {
                if (value==='' ) {
                newErrors.genero = 'Debe seleccionar un género.';
                } else {
                delete newErrors.genero;
                }
            }

            if (name === 'fechaNacimiento') {
                console.log({'fechaNacimiento':value})
                if (value.length===0 ) {
                newErrors.fechaNacimiento = 'Debe seleccionar una fecha de nacimiento.';
                } else {
                delete newErrors.fechaNacimiento;
                }
            }
            if (name === 'seguromedico_id') {
                if (value==='' ) {
                
                newErrors.seguromedico_id = 'Debe seleccionar un seguro.';
                } else {
                delete newErrors.seguromedico_id;
                }
            }

              // Si hay errores, no hacer nada
               setFormIsValid(true);
                if (Object.keys(newErrors).length > 0) {
                    setFormIsValid(false)
                    console.log({Error: "Check entry: There is data empty" });
                   // return; // Detener la ejecución sin mostrar alertas ni hacer el POST
                }
      
            return newErrors;
            });
        }
     

       // Cargar datos si es modo edición
        useEffect(() => {
            if (id) {
            setEditMode(true); // Cambiar a modo edición si hay un ID presente
            const getData = async () => {
                try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${URL}/pacientes/${id}`, {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                });
        
                if (response.data) {
                    setInputEntry(response.data);
                }
                } catch (error) {
                console.error('Error al obtener los datos:', error);
                }
            };
            getData();
            }
        }, [id]);

        const saveData = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            console.log({ Saving: "Saving data...", inputEntry });
        
            // Validar inputs de forma secuencial
            for (const [name, value] of Object.entries(inputEntry)) {
                await checkInputEntry(name, value as any); // Asegúrate de que esta función sea asíncrona
            }
        
            // Si hay errores, no hacer nada
            if (Object.keys(inputError).length > 0 || !formIsValid) {
                console.log({ inputError, Error: "There is data empty" });
                return; // Detener la ejecución sin mostrar alertas ni hacer el POST
            }
        
            // Mostrar mensaje de carga
            Swal.fire({
                title: "Enviando datos...",
                html: "Por favor espera mientras guardamos tus datos.",
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
        
            try {
                const token = localStorage.getItem('token');
                const response = editMode
                    ? await axios.put(`${URL}/pacientes/${id}`, inputEntry, {
                          headers: { Authorization: `Bearer ${token}` },
                      })
                    : await axios.post(`${URL}/pacientes`, inputEntry, {
                          headers: { Authorization: `Bearer ${token}` },
                      });
        
                // Manejar respuesta exitosa
                if (response.status === (editMode ? 200 : 201)) {
                    Swal.fire({
                        title: "Datos registrados correctamente",
                        html: "Serás redireccionado en <b></b> segundos.",
                        icon: "success",
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                        },
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            navigate('/pacientes');
                        }
                    });
                }
            } catch (error) {
                // Manejar error del servidor
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un error al registrar los datos. Por favor, intenta nuevamente.",
                    icon: "error",
                });
            }
        };
        

    return <>
       
       <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark   mx-auto">
 
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Registrar Paciente Nuevo
              </h3>
            </div>
            <form onSubmit={saveData}>
              <div className="p-6">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                     Nombres
                    </label>
                    <input
                      name="nombres"
                      type="text"
                      placeholder="Escribir nombres"
                      className={inputError?.nombres ? inputClass(true) : inputClass(false)}                      onChange={handlerInput}
                    />
                       {inputError.nombres && <p className='font-normal text-red-500'>{inputError.nombres}</p>}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                     Apellidos
                    </label>
                    <input
                      name="apellidos"
                      type="text"
                      placeholder="Escribir apellidos"
                      className={inputError?.apellidos ? inputClass(true) : inputClass(false)}
                      onChange={handlerInput}
                  />
                  {inputError.apellidos && <p className='font-normal text-red-500 dark:text-red-200'>{inputError.apellidos}</p>}
                  </div>
                </div>
                <div className="mb-1 flex flex-col xl:flex-row gap-6 w-full">
                    <div className="flex-1">
                        <SelectTipoDocumento 
                        onErrorTipoDocumento={inputError?.tipo_documento? inputError.tipo_documento : ''} 
                        onHandlerInput={handlerInput}
                        onError={inputError?.tipo_documento ? true : false}
                        />
                        
                        {inputError.documento_numero && <p className='font-normal text-red-500 '>{inputError.documento_numero}</p>}
            
                    </div>
                    <div className="flex-1">
                        <SelectGenero 
                        onError={inputError?.genero? true : false} 
                        onHandlerInput={handlerInput} />
                        {inputError.genero && <p className='font-normal text-red-500'>{inputError.genero}</p>}
           
                    </div>
                    <div className="flex-1">
                        <DatePickerFNac 
                        onError={inputError?.fechaNacimiento? true : false} 
                        onHandlerInput={handlerInput} />
                        {inputError.fechaNacimiento && <p className='font-normal text-red-500'>{inputError.fechaNacimiento}</p>}
           
                    </div>
                    <div className="flex-1">
                        <SelectSeguroMedico 
                        onHandlerInput={handlerInput} 
                        onError={inputError?.seguromedico_id? true : false} />
                        {inputError.seguromedico_id && <p className='font-normal text-red-500 '>{inputError.seguromedico_id}</p>}
           
                    </div>
                   
                </div> 
                <div className="flex w-full xl:justify-end gap-2">
                    <Link to="/pacientes">
                     <button className="flex w-full xl:w-24 justify-center rounded bg-slate-600 p-3 font-medium text-white hover:bg-opacity-90">
                        Cancelar
                    </button>
                    </Link>
                    <button className="flex w-full xl:w-24 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                        Guardar
                    </button>
                </div>

              </div>
               
            </form>
        
        </div>
    </>
}

export default PacienteNuevoForm;