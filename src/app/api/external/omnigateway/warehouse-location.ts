// api/warehouse-location.ts
import { omniGateway } from './index';
import { CreateLocationPayload, UpdateLocationPayload } from './types';

export const warehouseLocationApi = {
 createLocation: async (warehouseId: string, location: CreateLocationPayload) => {
   const { data } = await omniGateway.post(`/warehouse-locations/${warehouseId}`, location);
   return data;
 },

 getLocations: async (warehouseId: string) => {
   const { data } = await omniGateway.get(`/warehouse-locations/warehouse/${warehouseId}`);
   return data;
 },

 updateLocation: async (id: string, updates: UpdateLocationPayload) => {
   const { data } = await omniGateway.put(`/warehouse-locations/${id}`, updates);
   return data;
 },

 deleteLocation: async (id: string) => {
   const { data } = await omniGateway.delete(`/warehouse-locations/${id}`);
   return data;
 }

}