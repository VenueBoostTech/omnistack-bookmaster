"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

const MenuItem = ({ item, pathname, openMenus, toggleMenu }: any) => {
  const isActive = pathname === item.path || pathname.startsWith(item.path + "/")
  
  return (
    <div key={item.id}>
      <Link
        href={item.children ? "#" : item.path}
        onClick={
          item.children
            ? (e) => {
                e.preventDefault()
                toggleMenu(item.id)
              }
            : undefined
        }
        className={`group flex w-full items-center rounded-lg p-2 text-sm font-medium transition-colors ${
          isActive
            ? "bg-[#5FC4D0]/10 text-[#5FC4D0] dark:bg-[#5FC4D0]/20 dark:text-white"
            : "text-gray-600 hover:bg-[#5FC4D0]/5 hover:text-[#5FC4D0] dark:text-gray-300 dark:hover:bg-[#5FC4D0]/10 dark:hover:text-white"
        }`}
      >
        <span className={`mr-3 ${isActive ? "text-[#5FC4D0]" : ""}`}>{item.icon}</span>
        <span className="flex-1">{item.title}</span>
        {item.children && (
          <span className="ml-auto">
            {openMenus[item.id] ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </span>
        )}
      </Link>

      {item.children && openMenus[item.id] && (
        <div className="mt-1 space-y-1 pl-6">
          {item.children.map((child: any) => (
            <Link
              key={child.id}
              href={child.path}
              className={`group flex items-center rounded-lg p-2 text-sm font-medium transition-colors ${
                pathname === child.path
                  ? "bg-[#5FC4D0]/10 text-[#5FC4D0] dark:bg-[#5FC4D0]/20 dark:text-white"
                  : "text-gray-600 hover:bg-[#5FC4D0]/5 hover:text-[#5FC4D0] dark:text-gray-300 dark:hover:bg-[#5FC4D0]/10 dark:hover:text-white"
              }`}
            >
              <span className={`mr-3 ${pathname === child.path ? "text-[#5FC4D0]" : ""}`}>
                {child.icon}
              </span>
              <span className="flex-1">{child.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

interface SidebarProps {
  mainMenu: any[];
  inventory: any[];
  procurement: any[];
  finance: any[];
  administration: any[];
}

export default function Sidebar({
  mainMenu, 
  inventory, 
  procurement, 
  finance, 
  administration
}: SidebarProps) {
  const pathname = usePathname()
  
  // Combine all menus for finding current open menu
  const allMenuItems = [
    ...mainMenu, 
    ...inventory, 
    ...procurement, 
    ...finance, 
    ...administration
  ]
  
  const currentOpenMenu = allMenuItems.find(
    (i: any) => pathname === i.path || pathname.startsWith(i.path + "/")
  )
  
  const [openMenus, setOpenMenus] = useState<{ [key: number]: boolean }>({
    [currentOpenMenu?.id ?? 0]: true,
  })

  const toggleMenu = (id: number) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }))
  }

  return (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-800">
        <div className="flex justify-center items-center h-[72px] px-6 border-b border-stroke dark:border-stroke-dark">
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/images/logo/logo.svg"
              alt="Logo"
              width={160}
              height={36}
              className="dark:hidden"
              priority
            />
            <Image
              src="/images/logo/logo-light.svg"
              alt="Logo"
              width={160}
              height={36}
              className="hidden dark:block"
              priority
            />
          </Link>
        </div>
      </div>

      {/* Scrollable Menu Section */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-4 py-8 space-y-8">
          {/* Main Menu */}
          <div>
            <h3 className="px-2 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Main Menu
            </h3>
            <nav className="space-y-1">
            {mainMenu.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  pathname={pathname}
                  openMenus={openMenus}
                  toggleMenu={toggleMenu}
                />
              ))}
            </nav>
          </div>

          {/* Inventory Section */}
          <div>
            <h3 className="px-2 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Inventory
            </h3>
            <nav className="space-y-1">
              {inventory.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  pathname={pathname}
                  openMenus={openMenus}
                  toggleMenu={toggleMenu}
                />
              ))}
            </nav>
          </div>

          {/* Procurement Section */}
          <div>
            <h3 className="px-2 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Procurement
            </h3>
            <nav className="space-y-1">
              {procurement.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  pathname={pathname}
                  openMenus={openMenus}
                  toggleMenu={toggleMenu}
                />
              ))}
            </nav>
          </div>

          {/* Finance Section */}
          <div>
            <h3 className="px-2 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Finance
            </h3>
            <nav className="space-y-1">
              {finance.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  pathname={pathname}
                  openMenus={openMenus}
                  toggleMenu={toggleMenu}
                />
              ))}
            </nav>
          </div>

          {/* Administration Section */}
          <div className="mb-8">
            <h3 className="px-2 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Administration
            </h3>
            <nav className="space-y-1">
              {administration.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  pathname={pathname}
                  openMenus={openMenus}
                  toggleMenu={toggleMenu}
                />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}