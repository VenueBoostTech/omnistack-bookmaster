// components/admin/profile/profile-content.tsx
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClient } from '@/hooks/useClient';
import { toast } from 'react-hot-toast';
import { CompanyProfile } from '@/types/profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function ProfileContent() {
  const router = useRouter();
  const { clientId } = useClient();
  const { data: session } = useSession();
  const userId = session?.user?.id;
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
      if (!clientId || !userId) return;
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
        const updatedError = error instanceof Error ? error.message : 'Failed to fetch profile'
        toast.error(updatedError);
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
      const updatedError = error instanceof Error ? error.message : 'Failed to update profile'
      toast.error(updatedError);
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
              <Input
                value={companyData.name}
                disabled
                className="bg-muted mt-2"
              />
            </div>
            <div>
              <Label>Company Code</Label>
              <Input
                value={companyData.code}
                disabled
                className="bg-muted mt-2"
              />
            </div>
            <div>
              <Label>Tax ID</Label>
              <Input
                value={companyData.taxId}
                disabled
                className="bg-muted mt-2"
              />
            </div>
            <div>
              <Label>Currency</Label>
              <Input
                value={companyData.defaultCurrency}
                disabled
                className="bg-muted mt-2"
              />
            </div>
            <div className="col-span-2">
              <Label>Address</Label>
              <Input
                value={companyData.address}
                disabled
                className="bg-muted mt-2"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={companyData.phone}
                disabled
                className="bg-muted mt-2"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={companyData.email}
                disabled
                className="bg-muted mt-2"
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              To update company information, please visit the company settings page.
            </p>
            <Button
              variant="secondary"
              onClick={() => router.push('/admin/settings')}
            >
              Go to Company Settings
            </Button>
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
                  className='mt-2'
                  required
                  value={userData.name}
                  onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  className='mt-2'
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
                  className='mt-2'
                  type="password"
                  placeholder="Current Password"
                  value={userData.currentPassword}
                  onChange={e => setUserData(prev => ({ ...prev, currentPassword: e.target.value }))}
                />
                <div className="col-span-2 grid grid-cols-2 gap-4">
                  <Input
                    className='mt-2'
                    type="password"
                    placeholder="New Password"
                    value={userData.newPassword}
                    onChange={e => setUserData(prev => ({ ...prev, newPassword: e.target.value }))}
                  />
                  <Input
                    className='mt-2' 
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