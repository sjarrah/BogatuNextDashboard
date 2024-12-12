"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { maskinerSchema, MaskinerSchema } from "@/lib/formValidationSchemas";
import { createMaskin, updateMaskin } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";

const MaskinerForm = ({
  type,
  data,
  relatedData,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  relatedData?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MaskinerSchema>({
    resolver: zodResolver(maskinerSchema),
  });

  const [state, formAction] = useFormState(type==="create" ?  createMaskin : updateMaskin, {
    success:false, 
    error:false 
});

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction(data);
   // createMaskin(data);
  });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Maskinkortet har ${type === "create" ? "skapats" : "uppdaterats"}!`);
    //  setOpen(false)
      router.refresh(); 
    }
  }, [state]);
  
 // Add a check for relatedData
 if (!relatedData) {
  return <div>Loading...</div>;
}

  const { typer } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type==="create" ? "Lägg in en ny maskin" : "Ändra i  maskinkortet"}</h1>
      <span className="text-xs text-gray-400 font-medium">
        Maskininfo
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Namn på maskin"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
     { data && <InputField
          label="Id"
          name="id"
          defaultValue={data?.id}
          register={register}
          error={errors?.id}
          hidden
        />}
        <InputField
          label="Reg. nr"
          name="regNo"
          defaultValue={data?.regNo}
          register={register}
          error={errors?.regNo}
        />
      </div>
     
      <div className="flex justify-between flex-wrap gap-4">
      
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Maskintyp</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("typer")}
            defaultValue={data?.typer}
            >
            {typer.map(
                (maskinTyp: { id: number; name: string }) => (
                    <option key={maskinTyp.id} value={maskinTyp.id}>
                    {maskinTyp.name}
                    </option>
                )
            )}
          </select>
        </div>
{/*         <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
            </p>
          )}
        </div>  */}
      </div>
      {state.error && (
        <span className="text-red-500 text-sm">Något blev fel!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default MaskinerForm;
import { toast as showToast } from "react-toastify";

function toast(message: string) {
    showToast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
import { useState } from "react";

function setOpen(arg0: boolean) {
    const [isOpen, setIsOpen] = useState(false);
    setIsOpen(arg0);
}

