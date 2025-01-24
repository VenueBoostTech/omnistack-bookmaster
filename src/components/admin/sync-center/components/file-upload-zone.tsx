import { Upload } from "lucide-react";

// src/components/admin/sync-center/components/file-upload-zone.tsx 
export function FileUploadZone() {
    return (
      <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
        <input 
          type="file" 
          className="hidden" 
          id="file-upload"
          accept=".csv,.xlsx,.xls"
        />
        <label 
          htmlFor="file-upload"
          className="cursor-pointer"
        >
          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
          <p className="mt-2">Drag & drop your file here or click to browse</p>
          <p className="text-sm text-muted-foreground mt-1">
            Supports CSV, XLSX files up to 10MB
          </p>
        </label>
      </div>
    );
   }