import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: (string | undefined)[]) {
    return twMerge(clsx(inputs))
}

export async function generateVendorCode() {
    while (true) {
      const code = 'V' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const exists = await prisma.vendor.findFirst({ where: { code } });
      if (!exists) return code;
    }
  }

  export async function generateTransactionNumber() {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
   
    while (true) {
      const num = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
      const number = `TRX-${year}${month}-${num}`;
      
      const exists = await prisma.transaction.findFirst({ where: { number } });
      if (!exists) return number;
    }
   }