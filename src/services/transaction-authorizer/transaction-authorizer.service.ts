import { Injectable } from "@nestjs/common";

@Injectable()
export class TransactionAuthorizerService {
  async authorize(): Promise<boolean> {
    const response = await fetch("https://util.devi.tools/api/v2/authorize");
    const data = await response.json();

    return data.data.authorization;
  }
}
