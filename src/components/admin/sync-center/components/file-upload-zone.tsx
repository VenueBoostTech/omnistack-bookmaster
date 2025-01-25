import { Upload } from "lucide-react";
import { useState } from "react";

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
 }
 
 export function FileUploadZone({ onFileSelect }: FileUploadZoneProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
 
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };
 
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };
 
  return (
    <div 
      className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        className="hidden" 
        id="file-upload"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileChange}
      />
      <label 
        htmlFor="file-upload"
        className="cursor-pointer"
      >
        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
        {selectedFile ? (
          <>
            <p className="mt-2">{selectedFile.name}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </>
        ) : (
          <>
            <p className="mt-2">Drag & drop your file here or click to browse</p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports CSV, XLSX files up to 10MB
            </p>
          </>
        )}
      </label>
    </div>
  );
 }