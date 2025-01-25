// types/transaction.ts
import { TransactionType,TransactionStatus } from "@prisma/client";

interface Transaction {
    id: string;
    date: string;
    type: TransactionType;
    description: string;
    account: string;
    reference: string;
    debit: number;
    credit: number;
    status: TransactionStatus;
    completedAt: string | null
  }