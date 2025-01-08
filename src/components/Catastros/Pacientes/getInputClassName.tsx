 

  
  const inputClass = (errorInput: boolean): string => {
    return `w-full rounded border-[1.5px] mb-1 bg-transparent py-3 px-5 text-black outline-none transition 
      ${errorInput ? 'border-danger dark:border-red-200' : 'border-stroke dark:border-form-strokedark'} 
      focus:border-primary active:border-primary 
      disabled:cursor-default disabled:bg-whiter 
      dark:bg-form-input dark:text-white dark:focus:border-primary`;
  };
  export default inputClass;
  