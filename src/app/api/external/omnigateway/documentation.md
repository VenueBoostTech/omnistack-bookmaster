# BookMaster Platform Architecture

## Overview

BookMaster operates with a dual-database architecture:

1. Local Prisma Database (Platform-specific data)
2. OmniStack Gateway (Shared services and cross-platform integration)

## Client Data Structure

### Local Prisma Schema (BookMaster)

```prisma
model Client {
    id                  String    @id @default(auto()) @map("_id") @db.ObjectId
    name                String
    code                String    @unique
    taxId               String?
    address             String?
    phone               String?
    email               String?
    omniGatewayId      String?   @unique     // Reference to Gateway Client
    omniGatewayApiKey  String?   @unique     // API Key for Gateway Auth
    // ... other local fields
}
```

### OmniStack Gateway Record

```json
{
  "_id": "67957d78172a3de27fd14a9a",
  "name": "ByBest Duty Free Shpk.",
  "code": "BBDF25",
  "clientAppId": "67957b75172a3de27fd14a98",
  "externalId": "6795785555dcaaa39e3f5cb1",
  "defaultCurrency": "ALL",
  "isActive": true
}
```

## Authentication Flow

1. **Client Creation**

   ```typescript
   // When creating a new client in BookMaster
   const client = await prisma.client.create({
     data: {
       name: "ByBest Duty Free Shpk.",
       code: "BBDF25",
       // ... local fields
     },
   });

   // Register in Gateway and update local record
   const gatewayClient = await registerInGateway(client);
   await prisma.client.update({
     where: { id: client.id },
     data: {
       omniGatewayId: gatewayClient.id,
       omniGatewayApiKey: gatewayClient.apiKey,
     },
   });
   ```

2. **API Authentication**
   ```typescript
   // api/external/omnigateway/index.ts
   const createOmniGateway = (clientApiKey: string) => {
     return axios.create({
       baseURL: process.env.NEXT_PUBLIC_OMNI_GATEWAY_URL,
       headers: {
         "x-api-key": process.env.NEXT_PUBLIC_OMNI_GATEWAY_API_KEY,
         "client-x-api-key": clientApiKey,
       },
     });
   };
   ```

## Data Synchronization

### Local-Only Data

- User management
- Client preferences
- Platform-specific settings
- Operational data

### Gateway-Synchronized Data

- Inventory levels
- Product catalogs
- Cross-platform orders
- Shared services data

## API Integration Pattern

1. **Hook Usage**

   ```typescript
   // hooks/useClient.ts
   export const useClient = () => {
     const { data: session } = useSession();
     const user = session?.user as User;
     return {
       clientId: user?.clientId || "",
       name: user?.name,
       role: user?.role,
     };
   };

   // hooks/useClientApiKey.ts
   export const useClientApiKey = () => {
     const { clientId } = useClient();
     // Fetch and return omniGatewayApiKey
   };
   ```

2. **API Client Usage**
   ```typescript
   // Components using Gateway APIs
   export function SomeComponent() {
     const apiKey = useClientApiKey();
     const { data } = useGatewayData(apiKey);
     // ... component logic
   }
   ```

## Important Notes

### Security

- Gateway API keys are stored encrypted
- Each client has a unique API key
- Keys can be rotated as needed
- Authentication headers required for all requests

### Data Consistency

- Local IDs and Gateway IDs are mapped
- Gateway ID stored as `omniGatewayId`
- Platform ID stored as `externalId` in Gateway

### Error Handling

```typescript
try {
  const response = await gatewayApi.someEndpoint();
} catch (error) {
  if (error.response?.status === 401) {
    // Handle authentication errors
  }
  // Handle other errors
}
```

## Example Implementations

### Gateway API Call

```typescript
// api/external/omnigateway/batch.ts
export const createBatchApi = (clientApiKey: string) => {
  const omniGateway = createOmniGateway(clientApiKey);

  return {
    getBatches: async (params) => {
      const { data } = await omniGateway.get("/batches", { params });
      return data;
    },
    // ... other methods
  };
};
```

### Local Database Operation

```typescript
// Local client update
await prisma.client.update({
  where: { id: clientId },
  data: {
    name: updatedName,
    // Only update local fields
  },
});

// Gateway sync if needed
await syncToGateway(clientId, updatedData);
```

## Development Guidelines

1. **Data Storage**

   - Store client-specific data locally
   - Use Gateway for shared/cross-platform features
   - Maintain clear separation of concerns

2. **API Design**

   - Use consistent error handling
   - Include proper authentication
   - Follow RESTful principles

3. **Performance**
   - Cache Gateway responses when appropriate
   - Batch operations when possible
   - Monitor API usage and limits

## Contact & Support

- Development Email: development@bookmaster.omnistackhub.xyz
- Lead Developer: Griseld Gerveni
- Documentation: See `/src/app/api/external/omnigateway/docs` for detailed guides
