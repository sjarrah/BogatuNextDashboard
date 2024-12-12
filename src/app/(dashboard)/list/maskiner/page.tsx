import FormContainer from "@/components/FormContainer";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, studentsData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Maskin, MaskinTyp, Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type MaskinLista = Maskin & {maskinTyp :MaskinTyp};

const columns = [
  {
    header: "maskiner",
    accessor: "info",
  },
 
  {
    header: "Maskintyp",
    accessor: "maskinTyp",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "hidden",
  },
];

const renderRow = (item: MaskinLista) => (
   
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/no-image.svg"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.regNo || ""}</p>
        </div>
      </td>

      <td className="hidden md:table-cell">{item.maskinTyp.name ? item.maskinTyp.name : " - "}</td> 
      <td className="hidden md:table-cell">{}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/maskiner/${item.id}?maskinTyp=${item.maskintypId}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          <FormContainer table="maskin" type="update" data={item} />
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            //   <Image src="/delete.png" alt="" width={16} height={16} />
            // </button>
            <FormContainer table="maskin" type="delete" id={item.id}/>
          )}
        </div>
      </td> 
    </tr>
  );

const MaskinListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  const [MaskinerData, count] = await prisma.$transaction([ 
  prisma.maskin.findMany({
    include: {
      maskinTyp: true,
    },
    take: ITEM_PER_PAGE,
    skip: ITEM_PER_PAGE* (p-1),
  }),
  prisma.maskin.count(),
  ]);



  console.log(count)

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Maskinlista</h1>
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
              <FormContainer table="maskin" type="create"/>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} data={MaskinerData} renderRow={renderRow}  />
      {/* PAGINATION */}
      <Pagination page={p} count={count}/>
    </div>
  );
};


export default MaskinListPage;
