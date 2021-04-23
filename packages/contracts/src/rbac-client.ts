import { Client, Provider, Receipt } from "@blockstack/clarity"
import { stringify } from "querystring";
import { Clarity } from "./util"


export class RBACClient extends Client {
    constructor(principal: string, provider: Provider) {
        super(
            `${principal}.rbac`,
            'rbac',
            provider
          );
    }

    async getRoles(user: string): Promise<Receipt> {
      const query = this.createQuery({
        method: {
          name: 'get-roles',
          args: [
            Clarity.principal(user)
          ]
        }
      });

      const receipt = await this.submitQuery(query);
      return receipt;
    }

    async hasRole(user: string, role: number): Promise<Receipt> {
      const query = this.createQuery({
        method: {
          name: 'has-role',
          args: [
            Clarity.principal(user),
            Clarity.uint(role)
          ]
        }
      });

      const receipt = await this.submitQuery(query);
      return receipt;
    }

    async grantRole(user: string, role: number, sender: string): Promise<Receipt> {
      const tx = this.createTransaction({
        method: {
          name: 'grant-role',
          args: [
            Clarity.principal(user),
            Clarity.uint(role)
          ]
        }
      });

      tx.sign(sender);

      const receipt = await this.submitTransaction(tx);

      return receipt
    }

    async revokeRole(user: string, role: number, sender: string): Promise<Receipt> {
      const tx = this.createTransaction({
        method: {
          name: 'revoke-role',
          args: [
            Clarity.principal(user),
            Clarity.uint(role)
          ]
        }
      });

      tx.sign(sender);

      const receipt = await this.submitTransaction(tx);

      return receipt
    }
}