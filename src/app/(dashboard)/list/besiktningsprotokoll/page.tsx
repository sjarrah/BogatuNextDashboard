
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, studentsData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { BesiktningsPunkt, BesiktningsResultat, Maskin, MaskinTyp, Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { parse } from "path";

type besiktning = BesiktningsResultat & {besiktningsPunkter:BesiktningsPunkt};

const columns = [
  {
    header: "Protokoll",
    accessor: "info",
  },
  {
    header: "punkt",
    accessor: "besiktningspunkt",
    className: "hidden",
  },
  {
    header: "resultat",
    accessor: "resultat",
    className: " md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "hidden",
  },
];

const renderRow = (item: besiktning) => (
   
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">
  
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.besiktningsPunkter.name}</h3>
          <p className="text-xs text-gray-500">{item.besiktningsPunkter.description || ""}</p>
        </div>
      </td>

      <td className="hidden">{item.BesiktningsPunktId}</td>
      <td className="md:table-cell">{item.resultat}</td>
      <td>
        <div className="flex items-center gap-2">
      
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            //   <Image src="/delete.png" alt="" width={16} height={16} />
            // </button>
            <FormModal table="maskin" type="delete" id={item.id}/>
          )}
        </div>
      </td> 
    </tr>
  );

const Besiktningsprotokoll = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const [data, count] = await prisma.$transaction([ 
  prisma.besiktningsResultat.findMany({
  where: {maskinId: queryParams.maskinId ? parseInt(queryParams.maskinId) : undefined},
    include: {
        besiktningsPunkter: true as any,
       
       
    },
    take: ITEM_PER_PAGE,
    skip: ITEM_PER_PAGE* (p-1),
  }),

  prisma.besiktningsResultat.count(),
  ]);



  console.log(count)

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Besiktning</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              //   <Image src="/plus.png" alt="" width={14} height={14} />
              // </button>
              <FormModal table="maskin" type="create"/>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} data={data} renderRow={renderRow} />
      {/* PAGINATION */}
      <Pagination page={p} count={count}/>
    </div>
  );
};


export default Besiktningsprotokoll;