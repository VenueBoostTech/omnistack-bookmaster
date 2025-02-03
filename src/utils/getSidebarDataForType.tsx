import { 
  LayoutDashboard,
  BarChart3,
  Store,
  Package,
  Boxes,
  Truck,
  ArrowLeftRight,
  ShoppingCart,
  Users,
  Settings,
  Building2,
  FileSpreadsheet,
  History,
  FileCog,
  ClipboardList,
  Wallet,
  Receipt,
  PackageSearch,
  BadgeIcon
} from 'lucide-react';

export const getSidebarDataForType = (): {
  mainMenu: Sidebar[],
  inventory: Sidebar[],
  procurement: Sidebar[],
  finance: Sidebar[],
  administration: Sidebar[],
} => { 
  return {
  mainMenu: [
    {
      id: 1,
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard className="w-5 h-5"/>,
    },
    {
      id: 2,
      title: "Analytics",
      path: "/admin/analytics",
      icon: <BarChart3 className="w-5 h-5"/>,
    }
  ],
  inventory: [
    {
      id: 3,
      title: "Products",
      path: "/admin/products",
      icon: <Package className="w-5 h-5"/>,
      children: [
        {
          id: "3-1",
          title: "All Products",
          path: "/admin/products",
          icon: <Package className="w-4 h-4"/>
        },
        {
          id: "3-2",
          title: "Categories",
          path: "/admin/products/categories",
          icon: <Boxes className="w-4 h-4"/>
        },
        {
          id: "3-3",
          title: "Brands",
          path: "/admin/brands",
          icon: <BadgeIcon className="w-4 h-4"/>
        }
      ]
    },
    {
      id: 4,
      title: "Warehouses",
      path: "/admin/warehouses",
      icon: <Store className="w-5 h-5"/>,
      children: [
        {
          id: "4-1",
          title: "Locations",
          path: "/admin/warehouses",
          icon: <Building2 className="w-4 h-4"/>
        },
        {
          id: "4-2",
          title: "Stock Levels",
          path: "/admin/warehouses/stock",
          icon: <FileSpreadsheet className="w-4 h-4"/>
        },
        {
          id: "4-2",
          title: "Stores",
          path: "/admin/stores",
          icon: <Store className="w-4 h-4"/>
        },
      ]
    },
    {
      id: 5,
      title: "Operations",
      path: "/admin/operations",
      icon: <ArrowLeftRight className="w-5 h-5"/>,
      children: [
        {
          id: "5-1",
          title: "Stock In",
          path: "/admin/operations/in",
          icon: <ShoppingCart className="w-4 h-4"/>
        },
        {
          id: "5-2",
          title: "Stock Out",
          path: "/admin/operations/out",
          icon: <Package className="w-4 h-4"/>
        },
        {
          id: "5-3",
          title: "Transfers",
          path: "/admin/operations/transfers",
          icon: <ArrowLeftRight className="w-4 h-4"/>
        },
        {
          id: "5-4",
          title: "Adjustments",
          path: "/admin/operations/adjustments",
          icon: <FileCog className="w-4 h-4"/>
        }
      ]
    },
    {
      id: 6,
      title: "Batches",
      path: "/admin/batches",
      icon: <Boxes className="w-5 h-5"/>,
    },
  ],
  procurement: [
    {
      id: 7,
      title: "Vendors",
      path: "/admin/vendors",
      icon: <Users className="w-5 h-5"/>,
    },
    {
      id: 8,
      title: "Procedures",
      path: "/admin/procurement/operations",
      icon: <ClipboardList className="w-5 h-5"/>,
      children: [
        {
          id: "8-1",
          title: "Purchases",
          path: "/admin/procurement/purchases",
          icon: <ShoppingCart className="w-4 h-4"/>
        },
        {
          id: "8-2",
          title: "Returns",
          path: "/admin/procurement/returns",
          icon: <ArrowLeftRight className="w-4 h-4"/>
        }
      ]
    }
  ],
  finance: [
    {
      id: 9,
      title: "Accounts",
      path: "/admin/accounts",
      icon: <Wallet className="w-5 h-5"/>,
    },
    {
      id: 10,
      title: "Transactions",
      path: "/admin/transactions",
      icon: <Receipt className="w-5 h-5"/>,
    }
  ],
  administration: [
    {
      id: 11,
      title: "Users",
      path: "/admin/users",
      icon: <Users className="w-5 h-5"/>,
    },
    {
      id: 12,
      title: "Settings",
      path: "/admin/settings",
      icon: <Settings className="w-5 h-5"/>,
    }
  ]
};
};

export default getSidebarDataForType;