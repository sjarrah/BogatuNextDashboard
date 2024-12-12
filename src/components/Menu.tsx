import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Hem",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/parent.png",
        label: "Personal",
        href: "/list/personal",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Roller",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/lesson.png",
        label: "Uppgifter",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/calendar.png",
        label: "Händelser",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "PM",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Meddelanden",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },

  {
    title: "VERKSTAD",
    items: [ 
      {
        icon: "/student.png",
        label: "Maskiner",
        href: "/list/maskiner",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Hantera Bes.protokoll",
        href: "/list/besiktningsprotokoll",
        visible: ["admin"],
      },
      {
        icon: "/result.png",
        label: "Resultat",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profil",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];  

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
