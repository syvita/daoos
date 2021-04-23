import { Provider, ProviderRegistry } from "@blockstack/clarity";
import { expect } from "chai";
import { RBACClient } from "../src/rbac-client"
import { Clarity } from "../src/util"



describe("rbac contract test suite", () => {
  let provider: Provider;
  let client: RBACClient;
  const DEPLOYER = 'SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB';
  const USER = 'STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6';


  describe("Contract syntax", async () => {
    it("should be valid", async () => {
      provider = await ProviderRegistry.createProvider();
      client = new RBACClient(DEPLOYER, provider);

      await client.checkContract();
      await client.deployContract();
    });

    after(async () => {
      await provider.close();
    });
  });

  describe("Contract logic [Roles]", async () => {
    beforeEach(async () => {
      provider = await ProviderRegistry.createProvider();
      client = new RBACClient(DEPLOYER, provider);

      await client.deployContract();
    });

   
    afterEach(async () => {
      await provider.close();
    });


    it("returns false user have no roles at all", async () => {
      const receipt = await client.hasRole(USER, 123);

      expect(Clarity.unwrapBool(receipt)).false;
    });

   
    it("should fail granting role higher than 127", async () => {
      for (let i = 128; i <=150; i++) {
        let receipt = await client.grantRole(USER, i, DEPLOYER);
        expect(receipt.success).eq(false);
      }
    });

   
    it("should suceed granting role in range 0-127", async () => {
      for (let i = 0; i <= 127; i++) {
        let receipt = await client.grantRole(USER, i, DEPLOYER);
      
        expect(receipt.success, "Failed at "+i).eq(true);
      }
    });

    
    it("should remember granted role", async () => {
      const roles = [2, 8 , 18, 55, 37, 115];

      for (const role of roles) {
        await client.grantRole(USER, role, DEPLOYER);
        
        let receipt = await client.hasRole(USER, role);

        expect(Clarity.unwrapBool(receipt)).eq(true);
      }
    });


    it("can test if user have a specific role", async() => {
      for (let role = 0; role <= 127; role++) {
        let receipt = await client.hasRole(USER, role);

        expect(Clarity.unwrapBool(receipt)).eq(false)
      }


      for (let role = 0; role <= 127; role++) {
        await client.grantRole(USER, role, DEPLOYER);
        let receipt = await client.hasRole(USER, role);

        expect(Clarity.unwrapBool(receipt)).eq(true)
      }
    })

    
    it("should fail granting role more than once", async () => {
      const roles = [1, 7, 8, 9,15, 32, 67, 88, 92, 120, 127];

      for (const role of roles) {
        // add role for the first time
        await client.grantRole(USER, role, DEPLOYER);
        
        
        //add same role 2nd time
        let receipt = await client.grantRole(USER, role, DEPLOYER);

        
        expect(receipt.success).eq(false);
      }
    });


    it("should fail revoking role above 128", async () => {
      for (let role = 128; role < 150; role++) {
        let receipt = await client.revokeRole(USER, role, DEPLOYER);

        expect(receipt.success).eq(false);
      }
    });


    it("should fail revoking role that was never granted", async () => {
      for (let role = 0; role <=127; role++) {
        let receipt = await client.revokeRole(USER, role, DEPLOYER);

        expect(receipt.success).eq(false)
      }
    });


    it("should suceed revoking granted role in range 0-127", async () => {
      for (let role = 0; role <=127; role++) {
        await client.grantRole(USER, role, DEPLOYER);
        let receipt = await client.revokeRole(USER, role, DEPLOYER);

        expect(receipt.success).eq(true)
      }
    });

    it("should remember revoked role", async () => {
      // grant all possible roles
      for (let role = 0; role<=127; role++) {
        await client.grantRole(USER, role, DEPLOYER);
      }

      const roles = [5, 18, 55, 6, 78, 112];

      for(let role of roles) {
        // verification that role has been granted
        let receipt = await client.hasRole(USER, role);
        expect(Clarity.unwrapBool(receipt)).eq(true); 

        await client.revokeRole(USER, role, DEPLOYER);
        
        receipt = await client.hasRole(USER, role);
        expect(Clarity.unwrapBool(receipt)).eq(false)
      }
    });
  });
});