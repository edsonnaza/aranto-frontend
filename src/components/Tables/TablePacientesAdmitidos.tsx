 
import {Reception } from '../../types/reception'
 

 
const receptionData: Reception[] = [
  {
    
    name: 'Juan González',
    DateTimeIn: new Date(),
    seguro: 'Particular',
    price: 50,
    status: 'Pendiente'
  },
  {
    name: 'Hugo González',
    DateTimeIn: new Date(),
    seguro: 'Particular',
    price: 110,
    status: 'Cobrado'
  },
  {
    name: 'Ramón Benítez ',
    DateTimeIn: new Date(),
    seguro: 'Particular',
    price: 300,
    status: 'Cancelado'
  },
  {
    name: 'Carlos González',
    DateTimeIn: new Date(),
    seguro: 'Particular',
    price: 200,
    status: 'Cobrado'
  },
  {
    name: 'Ada Brizuela',
    DateTimeIn: new Date(),
    seguro: 'Particular',
    price: 150,
    status: 'Pendiente'
  },
];

const TablePacientesAdmitidos = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Pacientes Admitidos en Recepción
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Pacientes
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Fecha/Hora
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Seguro Médico
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Precio
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Estado
            </h5>
          </div>
        </div>

        {receptionData.map((item, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === receptionData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
               
              <p className="hidden text-black dark:text-white sm:block">
                {item.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.DateTimeIn.toDateString()}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3"> {item.seguro}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{item.price}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
             
              <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      item.status === 'Cobrado'
                        ? 'bg-success text-success'
                        : item.status === 'Cancelado'
                        ? 'bg-danger text-danger'
                        : 'bg-warning text-warning'
                    }`}
                  >
                    {item.status}
                  </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablePacientesAdmitidos;
