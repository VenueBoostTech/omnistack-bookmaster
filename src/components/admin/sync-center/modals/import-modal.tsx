import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { FileUploadZone } from "../components/file-upload-zone";
import { importApi } from '@/app/api/external/omnigateway/import';
import { toast } from 'react-hot-toast';
import InputSelect from "@/components/Common/InputSelect";
import axios from "axios";

export function ImportModal({
 isOpen,
 onClose,
 brands = [], // Add brands prop
}: {
 isOpen: boolean;
 onClose: () => void;
 brands?: Array<{id: string, name: string}>;
}) {
 const [isLoading, setIsLoading] = useState(false);
 const [file, setFile] = useState<File | null>(null);
 const [selectedBrand, setSelectedBrand] = useState('');
 const [updateExisting, setUpdateExisting] = useState(false);
 const [skipErrors, setSkipErrors] = useState(false);

 const handleImport = async () => {
    
   if (!file) {
    toast.error('Please select a file')
     return;
   }

   setIsLoading(true);
   try {
     await importApi.importProducts({
       file,
       type: 'bybest',
       brandId: selectedBrand
     });
     
     toast.success('Import started successfully');
     onClose();
   } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to start import';
      toast.error(errorMessage)
    } else {
      toast.error('An unexpected error occurred')
    }
   }finally {
     setIsLoading(false);
   }
 };

 return (
   <Dialog open={isOpen} onOpenChange={onClose}>
     <DialogContent>
       <DialogHeader>
         <DialogTitle>Quick Import</DialogTitle>
       </DialogHeader>
       <div className="space-y-4">
         <FileUploadZone 
           onFileSelect={(f) => setFile(f)}
         />

         <InputSelect
           name="brand"
           label="Select Brand"
           value={selectedBrand}
           onChange={(e) => setSelectedBrand(e.target.value)}
           options={brands.map(b => ({
             value: b.id,
             label: b.name
           }))}
         />

         <div>
           <h4 className="font-medium mb-2">Import Settings</h4>
           <div className="space-y-2">
             <Checkbox 
               checked={updateExisting}
               onCheckedChange={(checked) => setUpdateExisting(!!checked)}
               label="Update existing products" 
             />
             <Checkbox 
               checked={skipErrors}
               onCheckedChange={(checked) => setSkipErrors(!!checked)}
               label="Skip errors and continue" 
             />
           </div>
         </div>

         <div className="space-y-2">
           <Button 
             className="w-full" 
             onClick={handleImport}
             disabled={isLoading || !file}
           >
             {isLoading ? "Importing..." : "Start Import"}
           </Button>
           <Button 
             variant="outline" 
             className="w-full" 
             onClick={onClose}
             disabled={isLoading}
           >
             Cancel
           </Button>
         </div>
       </div>
     </DialogContent>
   </Dialog>
 );
}