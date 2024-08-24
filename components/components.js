"use client";
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"

 import { probe_model_5l_profit } from '@/lib/rules'; 

export default function Component() {
  const [fileAttributes, setFileAttributes] = useState({});
  const [showAttributes, setShowAttributes] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    console.log("File selected:", file);  

    if (file) {
      try {
        const fileContent = await file.text();
        console.log("File content:", fileContent);  
        const data = JSON.parse(fileContent); 
        console.log('Data from file:', data); 
       
        const result = probe_model_5l_profit(data.data);

        console.log("output: ", result);  
        setFileAttributes(result.flags);
        setShowAttributes(true);
      } catch (error) {
        console.error('Error processing file:', error);
      }
    } else {
      setShowAttributes(false);
    }
  };

  const FLAGS = {
    GREEN: 1,
    AMBER: 2,
    RED: 0,
    MEDIUM_RISK: 3,
    WHITE: 4
  };

  const getColorClass = (flag) => {
    switch (flag) {
      case FLAGS.GREEN:
        return "bg-green-100 text-green-800";
      case FLAGS.AMBER:
        return "bg-yellow-100 text-yellow-800";
      case FLAGS.RED:
        return "bg-red-100 text-red-800";
      case FLAGS.MEDIUM_RISK:
        return "bg-orange-100 text-orange-800";
      case FLAGS.WHITE:
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!showAttributes &&<Card>
        <CardHeader>
          <CardTitle>Upload File</CardTitle>
          <CardDescription>Select a file to upload.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">JSON </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </CardContent>
      </Card>}
      {showAttributes && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Uploaded File</CardTitle>
            <CardDescription>Here are the evaluated financial flags:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalRevenue5CrFlag">TOTAL_REVENUE_5CR_FLAG</Label>
                <Input
                  id="totalRevenue5CrFlag"
                  className={getColorClass(fileAttributes.TOTAL_REVENUE_5CR_FLAG)}
                  value={fileAttributes.TOTAL_REVENUE_5CR_FLAG }
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="borrowingToRevenueFlag">BORROWING_TO_REVENUE_FLAG</Label>
                <Input
                  id="borrowingToRevenueFlag"
                  className={getColorClass(fileAttributes.BORROWING_TO_REVENUE_FLAG)}
                  value={fileAttributes.BORROWING_TO_REVENUE_FLAG }
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="iscrFlag">ISCR_FLAG</Label>
                <Input
                  id="iscrFlag"
                  className={getColorClass(fileAttributes.ISCR_FLAG)}
                  value={fileAttributes.ISCR_FLAG }
                  readOnly
                />
              </div>
            </div>
            <Button variant="destructive" onClick={()=>{setShowAttributes(false)}} className="mt-8">Clear</Button>

          </CardContent>
        </Card>
      )}
    </div>
  );
}
