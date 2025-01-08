import { useEffect, useState } from "react";
import { SegurosMedicosType } from "../../../types/segurosmedicostypes";
import Swal from 'sweetalert2';
import axios from 'axios'; 
import { useNavigate, useParams } from 'react-router-dom'
 
const URL = import.meta.env.VITE_LOCALURL_BACKEND;

// Valor inicial vacío
const initInput: SegurosMedicosType = {
  seguromedico_id: '',
  seguromedico_nombre: '',
  descripcion: '',
  activo: true,
};

const SeguroMedico: React.FC = () => {
  const [inputEntry, setInputEntry] = useState<SegurosMedicosType>(initInput);
  const [inputError, setInputError] = useState<{ [key: string]: string }>({});
  const [editMode, setEditMode] = useState(false); // Estado para determinar si es edición
  const navigate = useNavigate(); 
  const { id } = useParams();

  const handlerInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setInputEntry((prev: any) => ({
      ...prev,
      [name]: value,
    }));
    checkInputEntry(name, value);
  }

  const checkInputEntry = (name: string, value: string) => {
    setInputError((prev) => {
      const newErrors = { ...prev };
      if (name === 'seguromedico_nombre') {
        if (value.length < 3) {
          newErrors.seguromedico_nombre = 'Nombre del seguro debe ser mínimo 3 caracteres.';
        } else {
          delete newErrors.seguromedico_nombre;
        }
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
          const response = await axios.get(`${URL}/seguro-medico/${id}`, {
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

    Object.entries(inputEntry).forEach(([name, value]) => {
      checkInputEntry(name, value as any);
    });

    if (Object.keys(inputError).length > 0) {
      return;
    }

    Swal.fire({
      title: "Enviando datos...",
      html: "Por favor espera mientras procesamos tu solicitud.",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const token = localStorage.getItem('token');
      const response = editMode
        ? await axios.put(`${URL}/seguro-medico/${id}`, inputEntry, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : await axios.post(`${URL}/seguro-medico`, inputEntry, {
            headers: { Authorization: `Bearer ${token}` },
          });

      if (response.status === (editMode ? 200 : 201)) {
        Swal.fire({
          title: "Datos registrados correctamente",
          html: "Serás redireccionado en <b></b> segundos.",
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            navigate('/seguromedico');
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al registrar los datos. Por favor, intenta nuevamente.",
        icon: "error"
      });
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-6/12 max-w-md mx-auto">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            {editMode ? "Editar Seguro Médico" : "Nuevo Seguro Médico"}
          </h3>
        </div>
        <form onSubmit={saveData}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-2/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Nombre del seguro médico"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={inputEntry.seguromedico_nombre}
                  onChange={handlerInput}
                  name="seguromedico_nombre"
                />
                {inputError.seguromedico_nombre && <p className='font-semibold text-red-500'>{inputError.seguromedico_nombre}</p>}
              </div>
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={inputEntry.descripcion}
                onChange={handlerInput}
                rows={6}
                placeholder="Escribe alguna descripción"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>
            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              {editMode ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SeguroMedico;
