// components/admin/profile/profile-content.tsx
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClient } from '@/hooks/useClient';
import { toast } from 'react-hot-toast';
import { CompanyProfile, UserProfile } from '@/types/profile';

export function ProfileContent() {
 const { clientId } = useClient();
 const [loading, setLoading] = useState(true);
 const [updating, setUpdating] = useState(false);
 const [companyData, setCompanyData] = useState<CompanyProfile | null>(null);
 const [userData, setUserData] = useState({
   name: '',
   email: '',
   currentPassword: '',
   newPassword: '',
   confirmPassword: ''
 });

 useEffect(() => {
   const fetchProfile = async () => {
     try {
       const res = await fetch(`/api/profile?clientId=${clientId}&userId=${userId}`);
       const data = await res.json();
       
       if (!res.ok) throw new Error(data.error);
       
       setCompanyData(data.client);
       setUserData(prev => ({
         ...prev,
         name: data.user.name,
         email: data.user.email
       }));
     } catch (error) {
       toast.error('Failed to load profile');
     } finally {
       setLoading(false);
     }
   };

   if (clientId) fetchProfile();
 }, [clientId]);

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   
   if (userData.newPassword && userData.newPassword !== userData.confirmPassword) {
     toast.error('Passwords do not match');
     return;
   }

   setUpdating(true);
   try {
     const res = await fetch('/api/profile', {
       method: 'PUT',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         userId,
         data: {
           name: userData.name,
           email: userData.email,
           currentPassword: userData.currentPassword || undefined,
           newPassword: userData.newPassword || undefined
         }
       })
     });

     const data = await res.json();
     if (!res.ok) throw new Error(data.error);

     toast.success('Profile updated successfully');
     setUserData(prev => ({
       ...prev,
       currentPassword: '',
       newPassword: '',
       confirmPassword: ''
     }));
   } catch (error) {
     toast.error('Failed to update profile');
   } finally {
     setUpdating(false);
   }
 };

 if (loading) return <div>Loading...</div>;
 if (!companyData) return <div>Failed to load profile</div>;

 return (
   <div className="space-y-6">
     <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>

     <Card>
       <CardHeader>
         <CardTitle>Company Information</CardTitle>
       </CardHeader>
       <CardContent className="space-y-4">
         <div className="grid grid-cols-2 gap-4">
           <div>
             <Label>Company Name</Label>
             <div className="mt-1 p-2 bg-muted rounded-md">{companyData.name}</div>
           </div>
           <div>
             <Label>Company Code</Label>
             <div className="mt-1 p-2 bg-muted rounded-md">{companyData.code}</div>
           </div>
           <div>
             <Label>Tax ID</Label>
             <div className="mt-1 p-2 bg-muted rounded-md">{companyData.taxId}</div>
           </div>
           <div>
             <Label>Currency</Label>
             <div className="mt-1 p-2 bg-muted rounded-md">{companyData.defaultCurrency}</div>
           </div>
           <div className="col-span-2">
             <Label>Address</Label>
             <div className="mt-1 p-2 bg-muted rounded-md">{companyData.address}</div>
           </div>
           <div>
             <Label>Phone</Label>
             <div className="mt-1 p-2 bg-muted rounded-md">{companyData.phone}</div>
           </div>
           <div>
             <Label>Email</Label>
             <div className="mt-1 p-2 bg-muted rounded-md">{companyData.email}</div>
           </div>
         </div>
       </CardContent>
     </Card>

     <Card>
       <CardHeader>
         <CardTitle>Personal Information</CardTitle>
       </CardHeader>
       <CardContent>
         <form onSubmit={handleSubmit} className="space-y-4">
           <div className="grid grid-cols-2 gap-4">
             <div>
               <Label>Name</Label>
               <Input
                 required
                 value={userData.name}
                 onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
               />
             </div>
             <div>
               <Label>Email</Label>
               <Input
                 type="email"
                 required
                 value={userData.email}
                 onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))}
               />
             </div>
           </div>

           <div className="space-y-4">
             <Label>Change Password</Label>
             <div className="grid grid-cols-2 gap-4">
               <Input
                 type="password"
                 placeholder="Current Password"
                 value={userData.currentPassword}
                 onChange={e => setUserData(prev => ({ ...prev, currentPassword: e.target.value }))}
               />
               <div className="col-span-2 grid grid-cols-2 gap-4">
                 <Input
                   type="password"
                   placeholder="New Password"
                   value={userData.newPassword}
                   onChange={e => setUserData(prev => ({ ...prev, newPassword: e.target.value }))}
                 />
                 <Input
                   type="password"
                   placeholder="Confirm New Password"
                   value={userData.confirmPassword}
                   onChange={e => setUserData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                 />
               </div>
             </div>
           </div>

           <div className="flex justify-end">
             <Button type="submit" disabled={updating}>
               {updating ? 'Saving...' : 'Save Changes'}
             </Button>
           </div>
         </form>
       </CardContent>
     </Card>
   </div>
 );
} 