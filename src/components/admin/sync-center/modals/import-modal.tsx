import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { FileUploadZone } from "../components/file-upload-zone";
import { Download } from "lucide-react";
import { useState } from "react";
import { Select,  SelectContent, SelectItem } from "@/components/ui/select";
import InputSelect from "@/components/Common/InputSelect";

export function ImportModal({
  isOpen,
  onClose,
  type = 'quick'
}: {
  isOpen: boolean;
  onClose: () => void;
  type?: 'quick' | 'advanced';
}) {
  const [selectedTemplate, setSelectedTemplate] = useState('simple');

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>{type === 'quick' ? 'Quick Import' : 'Advanced Import'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                 
                  
                  <FileUploadZone />

                  <div>
                      <h4 className="font-medium mb-2">Import Settings</h4>
                      <div className="space-y-2">
                          <Checkbox label="Update existing products" />
                          <Checkbox label="Skip errors and continue" />
                          {type === 'advanced' && (
                              <Checkbox label="Process variations as separate products" />
                          )}
                      </div>
                  </div>

                  <div className="space-y-2">
                  {type === 'advanced' && (
                    <> <h4 className="font-medium mb-0">Choose template</h4>
                    <InputSelect
                      name="warehouse"
                      label=""
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      options={[
                        { value: "simple", label: "Simple Products" },
                        { value: "variations", label: "Products with Variations" },
                        { value: "full", label: "Full Product Details" }
                      ]}
                  />
                  </>
                      
                  )}
                  </div>
                  <div className="space-y-2">
                      {type === 'advanced' && (
                          <Button variant="outline" className="w-full">
                              <Download className="h-4 w-4 mr-2" />
                              Download Template
                          </Button>
                      )}
                      <Button className="w-full">Start Import</Button>
                      <Button variant="outline" className="w-full" onClick={onClose}>
                          Cancel
                      </Button>
                  </div>
              </div>
          </DialogContent>
      </Dialog>
  );
}