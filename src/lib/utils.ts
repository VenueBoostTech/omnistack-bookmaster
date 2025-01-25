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