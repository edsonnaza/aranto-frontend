import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
 
import TablePacientesAdmitidos from '../Tables/TablePacientesAdmitidos';
 

const PacientesAdmitidos = () => {
  return (
    <>
 

      <div className="flex flex-col gap-10">
        <TablePacientesAdmitidos />
         
      </div>
    </>
  );
};

export default PacientesAdmitidos;
