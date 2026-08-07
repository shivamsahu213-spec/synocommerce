declare module '@prisma/client' {
  export class PrismaClient {
    constructor(options?: any);
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    // Add other methods as needed
  }
}
