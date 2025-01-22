// types/next-auth.d.ts
import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface User {
        id: string;
        role: "ADMIN" | "MANAGER" | "USER" | "ACCOUNTANT";
        clientId: string;
        warehouseId?: string;
        supabaseId: string;
        email: string;
        name: string;
    }

    interface Session {
        user: {
            id: string;
            role: "ADMIN" | "MANAGER" | "USER" | "ACCOUNTANT";
            clientId: string;
            warehouseId?: string;
            supabaseId: string;
            email: string;
            name: string;
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: "ADMIN" | "MANAGER" | "USER" | "ACCOUNTANT";
        clientId: string;
        warehouseId?: string;
        supabaseId: string;
        email: string;
        name: string;
    }
}