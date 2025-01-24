// src/components/admin/sync-center/sync-center-content.tsx
"use client"

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
 ArrowDownToLine,
 RefreshCcw,
 Scan,
 FileSpreadsheet,
 Upload,
 Download,
 Settings,
 History,
 Play,
 CheckCircle,
 XCircle
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SyncSettingsModal } from './modals/sync-settings-modal'
import { QuickImportModal } from './modals/quick-import-modal'
import { ImportProgressModal } from './modals/import-progress-modal'
import { ScanDetailsModal } from './modals/scan-details-modal'
import { BrandSyncModal } from './modals/brand-sync-modal'
import { ActivityDetailsModal } from './modals/activity-details-modal'

interface SyncMethod {
 id: string;
 title: string;
 description: string;
 icon: React.ElementType;
 status: 'active' | 'inactive' | 'in_progress' | 'error';
 lastRun?: Date;
 progress?: number;
 type: 'import' | 'sync' | 'scan';
 brands?: string[];
}

const StatusBadge = ({ status }: { status: string }) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-blue-100 text-blue-800',
      error: 'bg-red-100 text-red-800'
    };
   
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.replace('_', ' ')}
      </Badge>
    );
   };

const syncMethods: SyncMethod[] = [
 {
   id: 'basic-import',
   title: 'Quick Import',
   description: 'Import products with essential fields (code, barcode, name)',
   icon: ArrowDownToLine,
   status: 'active',
   type: 'import'
 },
 {
   id: 'template-import',
   title: 'Advanced Import',
   description: 'Use templates for structured imports with variations',
   icon: FileSpreadsheet,
   status: 'active',
   type: 'import'
 },
 {
   id: 'brand-sync',
   title: 'Brand API Sync',
   description: 'Auto-sync with brand catalogs',
   icon: RefreshCcw,
   status: 'in_progress',
   progress: 45,
   type: 'sync',
   brands: ['Swarovski', 'Villeroy & Boch', 'Blukids', 'Swatch']
 },
 {
   id: 'warehouse-scan',
   title: 'Warehouse Scanning',
   description: 'Mobile app scanning status and history',
   icon: Scan,
   status: 'active',
   type: 'scan',
   lastRun: new Date()
 }
];

const recentImports = [
 {
   id: '1',
   date: new Date(),
   type: 'Quick Import',
   status: 'completed',
   productsCount: 156,
   errors: 0
 },
 {
   id: '2', 
   date: new Date(),
   type: 'Brand Sync - Swarovski',
   status: 'in_progress',
   productsCount: 452,
   errors: 12
 }
];

const syncSchedule = [
 {
   brand: 'Swarovski',
   frequency: 'Daily',
   nextRun: new Date(),
   lastSuccess: new Date(),
   status: 'active'
 },
 {
   brand: 'Villeroy & Boch',
   frequency: 'Weekly',
   nextRun: new Date(),
   lastSuccess: new Date(),
   status: 'inactive'
 },
 {
    brand: 'Blukids',
    frequency: 'Weekly',
    nextRun: new Date(),
    lastSuccess: new Date(),
    status: 'inactive'
  },
  {
    brand: 'Swatch',
    frequency: 'Weekly',
    nextRun: new Date(),
    lastSuccess: new Date(),
    status: 'inactive'
  }
];

export function SyncCenterContent() {
 const [selectedTemplate, setSelectedTemplate] = useState('simple');
 const [activeModal, setActiveModal] = useState<string | null>(null);
 const [selectedBrand, setSelectedBrand] = useState<string>('');

 const [modals, setModals] = useState({
  brandSync: false,
  scanDetails: false,
  activityDetails: false,
  importProgress: false
});

const [selectedActivity, setSelectedActivity] = useState(null);
const [importProgress, setImportProgress] = useState(null);


 const handleAction = (method: SyncMethod, action: 'start' | 'settings') => {
   if (action === 'start') {
     switch (method.type) {
       case 'import':
         setActiveModal('quick-import');
         break;
       case 'sync':
         setActiveModal('sync-confirm');
         break;
     }
   } else {
     setSelectedBrand(method.brands?.[0] || '');
     setActiveModal('sync-settings');
   }
 };

 return (
   <div className="space-y-6">
     <div>
       <h1 className="text-2xl font-bold tracking-tight">Sync & Import Center</h1>
       <p className="text-sm text-muted-foreground mt-2">
         Manage all your data synchronization and import operations
       </p>
     </div>

     <Tabs defaultValue="overview" className="space-y-4">
       <TabsList>
         <TabsTrigger value="overview">Overview</TabsTrigger>
         <TabsTrigger value="imports">Imports</TabsTrigger>
         <TabsTrigger value="sync">Brand Sync</TabsTrigger>
         <TabsTrigger value="history">History</TabsTrigger>
       </TabsList>

       <TabsContent value="overview">
         <div className="grid p-4 gap-4 md:grid-cols-2">
           {syncMethods.map(method => (
             <Card shadow="md" key={method.id}>
               <CardHeader>
                 <CardTitle className="flex justify-between items-center">
                   <div className="flex items-center gap-2 mr-2">
                     <method.icon className="h-5 w-5" />
                     {method.title}
                   </div>
                   <StatusBadge status={method.status} />
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <p className="text-sm text-muted-foreground">{method.description}</p>
                 
                 {method.progress && (
                   <div className="mt-4 space-y-2">
                     <Progress value={method.progress} />
                     <p className="text-sm text-muted-foreground">{method.progress}% Complete</p>
                   </div>
                 )}

                 {method.brands && (
                   <div className="mt-4">
                     <p className="text-sm font-medium">Connected Brands:</p>
                     <div className="flex gap-2 mt-2">
                       {method.brands.map(brand => (
                         <Badge key={brand} variant="secondary">{brand}</Badge>
                       ))}
                     </div>
                   </div>
                 )}

                 {method.lastRun && (
                   <p className="text-sm text-muted-foreground mt-4">
                     Last activity: {method.lastRun.toLocaleString()}
                   </p>
                 )}

                 <div className="mt-4 flex gap-2">
                 <Button onClick={() => handleAction(method, 'start')}>
                    {method.type === 'import' ? (
                      <Upload className="h-4 w-4 mr-2" />
                    ) : method.type === 'sync' ? (
                      <RefreshCcw className="h-4 w-4 mr-2" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    {method.type === 'import' ? 'Import' : method.type === 'sync' ? 'Sync Now' : 'View Details'}
                    </Button>
                    <Button variant="outline" onClick={() => handleAction(method, 'settings')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                    </Button>
                 </div>
               </CardContent>
             </Card>
           ))}
         </div>

         <div className="mt-8 p-4">
           <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
           <div className="rounded-md border">
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Date</TableHead>
                   <TableHead>Type</TableHead>
                   <TableHead>Products</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead>Actions</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {recentImports.map(item => (
                   <TableRow key={item.id}>
                     <TableCell>{item.date.toLocaleString()}</TableCell>
                     <TableCell>{item.type}</TableCell>
                     <TableCell>
                       <div className="flex items-center gap-2">
                         <span>{item.productsCount} products</span>
                         {item.errors > 0 && (
                           <Badge variant="destructive">{item.errors} errors</Badge>
                         )}
                       </div>
                     </TableCell>
                     <TableCell>
                       <StatusBadge status={item.status} />
                     </TableCell>
                     <TableCell>
                       
                       <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedActivity(item);
                            setModals({...modals, activityDetails: true});
                          }}
                          >
                          View Details
                          </Button>
                       
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
             
           </div>
           <div className="mt-4 border-t pt-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <select className="h-8 w-16 rounded-md border border-input bg-background">
              <option>5</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page 1 of 3
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
         </div>
       </TabsContent>

       <TabsContent value="imports">
         <div className="space-y-6">
           {/* Import templates section */}
           <div className="grid p-4 gap-4 md:grid-cols-2">
             <Card shadow='md'>
               <CardHeader>
                 <CardTitle>Quick Import</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="border-2 border-dashed rounded-lg p-8 text-center">
                   <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                   <p className="mt-2">Drag & drop your CSV/Excel file or click to browse</p>
                 </div>
                 <Button 
                  className="mt-4 w-full"
                  onClick={() => setModals({...modals, quickImport: true})}
                  >
                  Start Import
                  </Button>
               </CardContent>
             </Card>

             <Card shadow='md'>
               <CardHeader>
                 <CardTitle>Template Import</CardTitle>
               </CardHeader>
               <CardContent>
                 <select 
                   value={selectedTemplate}
                   onChange={(e) => setSelectedTemplate(e.target.value)}
                   className="w-full p-2 border rounded-md mb-4"
                 >
                   <option value="simple">Simple Products</option>
                   <option value="variations">Products with Variations</option>
                   <option value="full">Full Product Details</option>
                 </select>
                 <div className="flex gap-2">
                   <Button variant="outline" className="flex-1">
                     <Download className="h-4 w-4 mr-2" />
                     Download Template
                   </Button>
                   <Button 
                      className="flex-1" 
                      onClick={() => setModals({...modals, importProgress: true})}
                      >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Filled Template
                      </Button>
                 </div>
               </CardContent>
             </Card>
           </div>

           {/* Import history */}
           <div className='p-4'>
           <Card>
             <CardHeader>
               <CardTitle>Import History</CardTitle>
             </CardHeader>
             <CardContent>
               <Table>
                 <TableHeader>
                   <TableRow>
                     <TableHead>Date</TableHead>
                     <TableHead>Template</TableHead>
                     <TableHead>Products</TableHead>
                     <TableHead>Status</TableHead>
                     <TableHead>Actions</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {recentImports.map(item => (
                     <TableRow key={item.id}>
                       <TableCell>{item.date.toLocaleString()}</TableCell>
                       <TableCell>{item.type}</TableCell>
                       <TableCell>{item.productsCount}</TableCell>
                       <TableCell>
                         <StatusBadge status={item.status} />
                       </TableCell>
                       <TableCell>
                         <Button variant="ghost" size="sm">
                           Download Report
                         </Button>
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
               <div className="mt-4 border-t pt-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <select className="h-8 w-16 rounded-md border border-input bg-background">
              <option>5</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page 1 of 3
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
             </CardContent>
           </Card>
           </div>
         </div>
       </TabsContent>

       <TabsContent value="sync">
         <div className="space-y-6">
           {/* Brand sync cards */}
           <div className="grid p-4 gap-4 md:grid-cols-2">
             {syncSchedule.map(brand => (
               <Card shadow='md' key={brand.brand}>
                 <CardHeader>
                   <CardTitle className="flex justify-between items-center">
                    <span className="mr-3">{brand.brand}</span>
                     
                     <StatusBadge status={brand.status} />
                   </CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="space-y-2">
                     <p className="text-sm">Frequency: {brand.frequency}</p>
                     <p className="text-sm">Next Run: {brand.nextRun.toLocaleString()}</p>
                     <p className="text-sm">Last Success: {brand.lastSuccess.toLocaleString()}</p>
                   </div>
                   <div className="mt-4 flex gap-2">
                   <Button onClick={() => {
                      setSelectedBrand(brand.brand);
                      setModals({...modals, brandSync: true});
                      }}>
                      Sync Now
                      </Button>

                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSelectedBrand(brand.brand);
                          setActiveModal('sync-settings');
                        }}
                        >
                        Configure
                        </Button>
                   </div>
                 </CardContent>
               </Card>
             ))}
           </div>

           {/* Sync schedule */}
           <div className='p-4'>
           <Card>
             <CardHeader>
               <CardTitle>Sync Schedule</CardTitle>
             </CardHeader>
             <CardContent>
               <Table>
                 <TableHeader>
                   <TableRow>
                     <TableHead>Brand</TableHead>
                     <TableHead>Frequency</TableHead>
                     <TableHead>Next Run</TableHead>
                     <TableHead>Last Success</TableHead>
                     <TableHead>Status</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {syncSchedule.map(schedule => (
                     <TableRow key={schedule.brand}>
                       <TableCell>{schedule.brand}</TableCell>
                       <TableCell>{schedule.frequency}</TableCell>
                       <TableCell>{schedule.nextRun.toLocaleString()}</TableCell>
                       <TableCell>{schedule.lastSuccess.toLocaleString()}</TableCell>
                       <TableCell>
                         <StatusBadge status={schedule.status} />
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
               
             </CardContent>
             <div className="mt-4 border-t pt-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <select className="h-8 w-16 rounded-md border border-input bg-background">
              <option>5</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page 1 of 3
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
           </Card>
           </div>
         </div>
       </TabsContent>

       <TabsContent value="history">
         <Card>
           <CardHeader>
             <CardTitle>Sync & Import History</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-8">
               {/* Timeline items */}
               <div className="relative pl-8 border-l-2 border-muted space-y-8">
                 {recentImports.map((item, index) => (
                   <div key={index} className="relative">
                     <div className="absolute -left-[41px] p-1 bg-white rounded-full">
                       {item.status === 'completed' ? (
                         <CheckCircle className="h-5 w-5 text-green-500" />
                       ) : item.status === 'in_progress' ? (
                         <RefreshCcw className="h-5 w-5 text-blue-500" />
                       ) : (
                         <XCircle className="h-5 w-5 text-red-500" />
                       )}
                     </div>
                     <div className="bg-accent/10 rounded-lg p-4">
                       <div className="flex justify-between items-start mb-2">
                         <div>
                           <h4 className="font-medium">{item.type}</h4>
                           <p className="text-sm text-muted-foreground">
                             {item.date.toLocaleString()}
                           </p>
                         </div>
                         <StatusBadge status={item.status} />
                       </div>
                       <div className="text-sm">
                         <p>Products: {item.productsCount}</p>
                         {item.errors > 0 && (
                           <p className="text-red-500">Errors: {item.errors}</p>
                         )}
                       </div>
                       <Button 
 variant="ghost" 
 size="sm" 
 className="mt-2"
 onClick={() => {
   setSelectedActivity(item);
   setModals({...modals, activityDetails: true});
 }}
>
 View Details
</Button>
                     </div>
                     </div>
                 ))}
               </div>

               {/* Additional history filters */}
               <div className="flex gap-4 items-center">
                 <select className="p-2 border rounded-md text-sm">
                   <option value="all">All Types</option>
                   <option value="import">Imports</option>
                   <option value="sync">Syncs</option>
                   <option value="scan">Scans</option>
                 </select>
                 <select className="p-2 border rounded-md text-sm">
                   <option value="all">All Statuses</option>
                   <option value="completed">Completed</option>
                   <option value="in_progress">In Progress</option>
                   <option value="error">Error</option>
                 </select>
                 <Button variant="outline" size="sm">
                   <History className="h-4 w-4 mr-2" />
                   Export History
                 </Button>
               </div>
             </div>
           </CardContent>
         </Card>
       </TabsContent>
     </Tabs>
     <QuickImportModal 
        isOpen={activeModal === 'quick-import'} 
        onClose={() => setActiveModal(null)} 
      />
      
      <SyncSettingsModal
        isOpen={activeModal === 'sync-settings'}
        onClose={() => setActiveModal(null)}
        brand={selectedBrand}
      />
      <BrandSyncModal 
    isOpen={modals.brandSync}
    onClose={() => setModals({...modals, brandSync: false})}
    brand="Swarovski"
  />
  
  <ScanDetailsModal
    isOpen={modals.scanDetails} 
    onClose={() => setModals({...modals, scanDetails: false})}
  />
  
  <ActivityDetailsModal
    isOpen={modals.activityDetails}
    onClose={() => setModals({...modals, activityDetails: false})}
    activity={selectedActivity}
  />
  
  <ImportProgressModal
    isOpen={modals.importProgress}
    onClose={() => setModals({...modals, importProgress: false})}
    progress={importProgress}
  />
   </div>
 );
}