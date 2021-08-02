import { useSession } from "next-auth/client";
import React from "react";
import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import {
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import Image from "next/image";

function Sidebar() {
  const [session, loading] = useSession();

  const SidebarRow = ({ Icon, title, src }) => {
    return (
      <div className='flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer'>
        {src ? (
          <Image className="rounded-full" src={src} width='30' height='30' layout='fixed' alt='' />
        ) : (
          <Icon className='h-8 w-8 text-blue-500' />
        )}
        <p className='hidden sm:inline-flex font-medium'>{title}</p>
      </div>
    );
  };

  return (
    <div className='p-2 mt-5 max-w-[600px] xl:min-w-[300px]'>
      <SidebarRow src="https://links.papareact.com/kxk" title="Facebook User" />
      <SidebarRow Icon={UsersIcon} title='Friends' />
      <SidebarRow Icon={UserGroupIcon} title='Groups' />
      <SidebarRow Icon={ShoppingBagIcon} title='Marketplace' />
      <SidebarRow Icon={DesktopComputerIcon} title='Watch' />
      <SidebarRow Icon={CalendarIcon} title='Events' />
      <SidebarRow Icon={ClockIcon} title='Memories' />
      <SidebarRow Icon={ChevronDownIcon} title='See More' />
    </div>
  );
}

export default Sidebar;
