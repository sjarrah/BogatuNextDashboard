import FormModal from "./FormModal";
import { PrismaClient } from '@prisma/client'
import prisma from '@/lib/prisma'

export type FormContainerProps = {
    table:
   /*    | "besiktningspunkt"
      | "besiktningsprotokoll" */
      | "maskin"
    
    type: "create" | "update" | "delete";
    data?: any;
    id?: number;
  }


const FormContainer = async ({table,type,data,id}: FormContainerProps ) => {

    let relatedData = {}

if(type !== "delete"){
    switch (table) {
        case "maskin":
            const maskintyper = await prisma.maskinTyp.findMany({
                select:{id:true, name:true}
            });
            relatedData = {typer:maskintyper} ;
            break;
        default:
            break;
    }
}



    
  return (
    <div className=''>
        <FormModal table={table} type={type} data={data} id={id} relatedData={relatedData}/>
    </div>
  )
}

export default FormContainer