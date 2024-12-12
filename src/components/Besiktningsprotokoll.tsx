import Image from "next/image";
import { role } from "@/lib/data";
import { BesiktningsPunkt, BesiktningsResultat, Maskin } from "@prisma/client";
import prisma from "@/lib/prisma";
import Table from "@/components/Table";
import FormModal from "@/components/FormModal";
type ProtokollLista = BesiktningsPunkt & { besresult: BesiktningsResultat };

const columns = [
  {
    header: "maskiner",
    accessor: "info",
  },
  {
    header: "MaskinID",
    accessor: "maskinId",
    className: "hidden md:table-cell",
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

const renderRow = (item: ProtokollLista) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
      </div>
    </td>
    <td className="md:table-cell">{item.besresult.BesiktningsPunktId}</td>
    <td className="hidden md:table-cell">{}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <FormModal table="maskin" type="delete" id={item.id} />
        )}
      </div>
    </td>
  </tr>
);

const Besiktningsprotokoll = async ({
  params: { maskinTypId },
}: {
  params: {maskinTypId: string };
}) => {
  const punkterData: ProtokollLista[] = (await prisma.besiktningsPunkt.findMany({
    where: { MaskinTypId: parseInt(maskinTypId) },
    include: {
      besResultat: true,
    },
  })).map(punkt => ({
    ...punkt,
    besresult: punkt.besResultat[0], // Assuming you want the first result
  }));
const besiktningsResultat = await prisma.besiktningsResultat.findMany({
    where: {
        BesiktningsPunktId: {
            in: punkterData.map(punkt => punkt.id),
        },
    },
});

const punkterDataWithResultat = punkterData.map(punkt => ({
    ...punkt,
    besresult: besiktningsResultat.find(
        resultat => resultat.BesiktningsPunktId === punkt.id
    ),
}));
  if (!punkterData.length) {
    return {
      notFound: true,
    };
  }

  return <Table columns={columns} data={punkterData} renderRow={renderRow} />;
};

export default Besiktningsprotokoll;