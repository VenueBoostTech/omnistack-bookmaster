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
 History,
 CheckCircle,
 XCircle
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BrandSyncSettingsModal } from './modals/brand-sync-settings-modal'
import { ImportModal } from './modals/import-modal'
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

interface ProgressData {
  processed: number;
  total: number;
  successful: number;
  failed: number;
  percentage: number;
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

const [modalState, setModalState] = useState({
  quickImport: false,
  syncSettings: false,
  brandSync: false,
  scanDetails: false,
  activityDetails: false,
  importProgress: false
});

const [importType, setImportType] = useState<'quick' | 'advanced'>('quick');
const [selectedActivity, setSelectedActivity] = useState(null);
const [importProgress, setImportProgress] = useState<ProgressData | null>(null);

const MethodActions = ({ method }: { method: SyncMethod }) => {
  switch(method.type) {
    case 'import':
      case 'import':
     return (
       <Button onClick={() => {
         setImportType(method.id === 'basic-import' ? 'quick' : 'advanced');
         setModalState(prev => ({...prev, quickImport: true}));
       }}>
         <Upload className="h-4 w-4 mr-2" />
         Import
       </Button>
     )
    case 'sync':
      return (
        <div className="flex gap-2">
          <Button onClick={() => {
            setSelectedBrand('all')
            setModalState({...modalState, brandSync: true})
          }}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Sync All Brands
          </Button>
        </div>
      )
    case 'scan':
      return (
        <Button onClick={() => setModalState({...modalState, scanDetails: true})}>
          <Scan className="h-4 w-4 mr-2" />
          View Scan Details
        </Button>
      )
  }
}



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

                <div className="mt-4">
                   <MethodActions method={method} />
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
                        setImportProgress({
                          processed: item.productsCount - item.errors,
                          total: item.productsCount,
                          successful: item.productsCount - item.errors,
                          failed: item.errors,
                          percentage: Math.round(((item.productsCount - item.errors) / item.productsCount) * 100),
                        });
                        setModalState((prev) => ({ ...prev, importProgress: true }));
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
            <Card shadow="md">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center mr-2 gap-2">
                    <ArrowDownToLine className="h-5 w-5" />
                    Quick Import
                  </div>
                  <StatusBadge status="active" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Import products with essential fields (code, barcode, name)
                </p>
                <div className="border-2 border-dashed rounded-lg p-8 text-center mt-4">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2">Drag & drop your CSV/Excel file or click to browse</p>
                </div>
                <Button className="mt-4 w-full">Start Import</Button>
              </CardContent>
            </Card>

            <Card shadow="md">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center mr-2 gap-2">
                    <FileSpreadsheet className="h-5 w-5" />
                    Advanced Import
                  </div>
                  <StatusBadge status="active" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Use templates for structured imports with variations
                </p>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full p-2 border rounded-md mt-4"
                >
                  <option value="simple">Simple Products</option>
                  <option value="variations">Products with Variations</option>
                  <option value="full">Full Product Details</option>
                </select>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                  <Button className="flex-1">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Filled Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Import history */}
          <div className="p-4">
            <Card>
              <CardHeader>
                <CardTitle>Import History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
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
                      {recentImports.map((item) => (
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
                            <Button variant="ghost" size="sm">
                              Download Report
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
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
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
                      setModalState({...modalState, brandSync: true});
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
                <div className="rounded-md border">
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
                      {syncSchedule.map((schedule) => (
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
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
           </div>
         </div>
       </TabsContent>
       <TabsContent value="history">
  <div className="p-">
    <Card>
    <CardHeader>
  <div className="flex justify-between items-start">
    <div>
      <div className="flex items-center gap-2">
        <FileSpreadsheet className="h-5 w-5" />
        <span className="text-lg font-bold">Sync & Import History</span>
        <StatusBadge status="in-sync" />
      </div>
      <p className="text-sm text-muted-foreground mt-2 mb-4">
        Track and review all past sync and import operations, including errors and successes.
      </p>
    </div>
    
  </div>
</CardHeader>

      <CardContent>
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
              {recentImports.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="text-sm">{item.date.toLocaleString()}</TableCell>
                  <TableCell className="text-sm">{item.type}</TableCell>
                  <TableCell className="text-sm">
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
                        setModalState((prev) => ({ ...prev, activityDetails: true }));
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
        {/* Pagination */}
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
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
  {/* Activity Details Modal */}
  <ActivityDetailsModal
    isOpen={modalState.activityDetails}
    onClose={() => setModalState((prev) => ({ ...prev, activityDetails: false }))}
    activity={selectedActivity}
  />
</TabsContent>

     </Tabs>
      <ImportModal 
        isOpen={modalState.quickImport}
        onClose={() => setModalState(prev => ({...prev, quickImport: false}))}
        type={importType}
      />
        
      <BrandSyncSettingsModal
        isOpen={activeModal === 'sync-settings'}
        onClose={() => setActiveModal(null)}
        brand={selectedBrand}
      />
      <BrandSyncModal 
        isOpen={modalState.brandSync}
        onClose={() => setModalState({...modalState, brandSync: false})}
        brand={selectedBrand}
      />
    
      <ScanDetailsModal
        isOpen={modalState.scanDetails} 
        onClose={() => setModalState({...modalState, scanDetails: false})}
      />
    
      <ActivityDetailsModal
        isOpen={modalState.activityDetails}
        onClose={() => setModalState({...modalState, activityDetails: false})}
        activity={selectedActivity}
      />
      
      <ImportProgressModal
        isOpen={modalState.importProgress}
        onClose={() => setModalState((prev) => ({ ...prev, importProgress: false }))}
        progress={importProgress}
      />
   </div>
 );
}