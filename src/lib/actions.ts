"use server"

import { revalidatePath } from "next/cache";
import { MaskinerSchema } from "./formValidationSchemas"
import prisma from "./prisma"

type CurrentState = {
    success: boolean;
    error: boolean;
}


export const createMaskin = async (
    currentState: CurrentState,
    data: MaskinerSchema
) => {
 try {
    await prisma.maskin.create({
        data: {
            name: data.name,
            regNo: data.regNo,
            maskinTyp: {
                connect: { id: data.typer }
            },
            
        
    }});
  //  revalidatePath("/list/maskiner");
    return {success: true, error: false}
} catch (error) {
    console.log(error)
return {success: false, error: true}
}
    };


export const updateMaskin = async (
        currentState: CurrentState,
        data: MaskinerSchema
    ) => {
     try {
        await prisma.maskin.update({
            where: {
                id:data.id
            },
            data: {
                name: data.name,
                regNo: data.regNo,
                maskinTyp: {
                    connect: { id: data.typer }
                },
            },
        });
    
        //revalidatePath("/list/maskiner");
        return {success: true, error: false}
    } catch (error) {
        console.log(error)
    return {success: false, error: true}
}
    };

    export const deleteMaskin = async (
        currentState: CurrentState,
        data: FormData
    ) => {
        const id = data.get("id") as string ;
     try {
        await prisma.maskin.delete({
            where: {
                id: parseInt(id),
            },
            
        });
    
       // revalidatePath("/list/maskiner");
        return {success: true, error: false}
    } catch (error) {
        console.log(error)
    return {success: false, error: true}
}
    };