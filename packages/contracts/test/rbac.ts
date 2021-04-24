import { Provider, ProviderRegistry } from "@blockstack/clarity";
import { expect } from "chai";
import { resolve } from "dns";
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


    it("returns false if user doesn't have any roles", async () => {
      const receipt = await client.hasRole(USER, 123);

      expect(Clarity.unwrapBool(receipt)).false;
    });

   
    it("should fail granting role higher than 127", async () => {
      for (let i = 128; i <=150; i++) {
        let receipt = await client.grantRole(USER, i, DEPLOYER);
        expect(receipt.success).eq(false);
      }
    });

   
    it("should succeed granting role in range 0-127", async () => {
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


    it("tests if user has a specific role", async() => {
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


    it("should succeed revoking granted role in range 0-127", async () => {
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

  describe("Contract logic [RolesPermissions]", async () => {
    beforeEach(async () => {
      provider = await ProviderRegistry.createProvider();
      client = new RBACClient(DEPLOYER, provider);

      await client.deployContract();
    });

   
    afterEach(async () => {
      await provider.close();
    });

    
    it("returns false when permission has no assigned roles", async () => {
      const permission = "do-something";
      const role = 123;

      const receipt = await client.hasPermission(role, permission);

      expect(Clarity.unwrapBool(receipt)).false;
    })


    it("should fail granting permission to role higher than 127", async () => {
      const permission = "do-something";

      for (let role=128; role <=150; role++) {
        let receipt = await client.grantPermission(permission, role, DEPLOYER);

        expect(receipt.success).eq(false);
      }
    });

    
    it("should succeed granting permission to role in range 0-127", async () => {
      const permission = "test-permission"

      for (let role=0; role <=127; role++) {
        let receipt = await client.grantPermission(permission, role, DEPLOYER);
        
        expect(receipt.success).eq(true);
      }
    });

    it("should remember granted permissions", async () => {
      const permission = "test-something";      
      const roles = [1, 8 , 22, 47, 69, 72, 101, 123, 127]

      for(let role of roles) {
        await client.grantPermission(permission, role, DEPLOYER);

        let receipt = await client.hasPermission(role, permission);
        expect(Clarity.unwrapBool(receipt)).eq(true);
      }
    });

    it("should fail granting permission to role more than once", async () => {
      const permission = "test-test-test";
      const roles = [2, 3, 17, 26, 49, 55, 87, 93, 99, 115];

      for(let role of roles) {
        await client.grantPermission(permission, role, DEPLOYER);

        let receipt = await client.grantPermission(permission, role, DEPLOYER);
        expect(receipt.success).eq(false);
      }
    });

    it("should fail revoking permission from role higher than 127", async () => {
      const permission = "bla-bla-bla";

      for(let role=128; role<=150; role++) {
        let receipt = await client.revokePermission(permission, role, DEPLOYER);

        expect(receipt.success).eq(false);
      }
    });

    it("should fail revoking permission from role that never been granted", async () => {
      const permission = "stx-stx";
      const roles = [0, 3, 15, 56, 82, 102, 112, 122]

      for(let role of roles) {
        let receipt = await client.revokePermission(permission, role, DEPLOYER);

        expect(receipt.success).eq(false);
      }
    });

    it("should suceed revoking granted permission from role in range 0-127", async () => {
      const permission = "super-secure";

      for(let role=0; role<=127; role++) {
        await client.grantPermission(permission, role, DEPLOYER);

        let receipt = await client.revokePermission(permission, role, DEPLOYER);
        expect(receipt.success).eq(true)
      }
    });


    it("should remember permission revoked from role", async () => {
      const permission = "permission-permission"
      
      for(let role=0; role<=127; role++) {
        await client.grantPermission(permission, role, DEPLOYER);
      }

      const revokeRoles = [0, 8 , 15, 39, 44, 97, 102, 127];
      for(let role of revokeRoles) {
        // test if permission has been granted before revoking it
        let receipt = await client.hasPermission(role, permission);
        expect(Clarity.unwrapBool(receipt)).eq(true);

        await client.revokePermission(permission, role, DEPLOYER);
        //check if permission have been revoked
        receipt = await client.hasPermission(role, permission);
        expect(Clarity.unwrapBool(receipt)).eq(false);
      }
    });
  });

  describe("Contract security", async () => {
    beforeEach(async () => {
      provider = await ProviderRegistry.createProvider();
      client = new RBACClient(DEPLOYER, provider);

      await client.deployContract();
    });

   
    afterEach(async () => {
      await provider.close();
    });

    it("should fail granting role if called by non-owner user", async () => {
      let receipt = await client.grantRole(USER, 1, USER);
      
      expect(receipt.success).eq(false);
      expect(Clarity.unwrapError(receipt)).eq("Unauthorized");
    });

    it("should succeed granting role if called by contract owner", async () => {
      let receipt = await client.grantRole(USER, 1, DEPLOYER);
      
      expect(receipt.success).eq(true);
    });

    it("should succeed granting role if called by user with correct permission", async () => {
      await client.grantPermission("grant-role", 10, DEPLOYER);
      await client.grantRole(USER, 10, DEPLOYER);

      let receipt = await client.grantRole(USER, 1, USER);
      expect(receipt.success).eq(true);
    });


    it("should fail revoking role if called by non-owner user", async () => {
      let receipt = await client.revokeRole(USER, 1, USER);
      
      expect(receipt.success).eq(false);
      expect(Clarity.unwrapError(receipt)).eq("Unauthorized");
    });

    it("should succeed revoking role if called by contract owner", async () => {
      await client.grantRole(USER, 1, DEPLOYER);
      let receipt = await client.revokeRole(USER, 1, DEPLOYER);
      
      expect(receipt.success).eq(true);
    });

    it("should succeed revoking role if called by user with correct permission", async () => {
      await client.grantPermission("revoke-role", 10, DEPLOYER);
      await client.grantRole(USER, 10, DEPLOYER);

      await client.grantRole(USER, 1, DEPLOYER);

      let receipt = await client.revokeRole(USER, 1, USER);
      expect(receipt.success).eq(true);
    });

    it("should fail granting permission if called by non-owner user", async () => {
      let receipt = await client.grantPermission("dummy-permission", 1, USER);

      expect(receipt.success).eq(false)
      expect(Clarity.unwrapError(receipt)).eq("Unauthorized");
    });

    it("should succeed granting permission if called by contract owner", async () => {
      let receipt = await client.grantPermission("dummy-permission", 1, DEPLOYER);

      expect(receipt.success).eq(true)
    });

    it("should succeed granting permission if called by user with correct permission", async () => {
      await client.grantPermission("grant-permission", 10, DEPLOYER);
      await client.grantRole(USER, 10, DEPLOYER);

      let receipt = await client.grantPermission("dummy-permission", 1, USER);
      expect(receipt.success).eq(true);
    });

    it("should fail revoking permission if called by non-owner user", async () => {
      let receipt = await client.revokePermission("dummy-permission", 1, USER);
      
      expect(receipt.success).eq(false);
      expect(Clarity.unwrapError(receipt)).eq("Unauthorized");
    });

    it("should succeed revoking permission if called by contract owner", async () => {
      await client.grantPermission("dummy-permission", 1, DEPLOYER);
      
      let receipt = await client.revokePermission("dummy-permission", 1, DEPLOYER);
      expect(receipt.success).eq(true);
    })

    it("should succeed revoking permission if called by user with correct permission", async () => {
      await client.grantPermission("revoke-permission", 10, DEPLOYER);
      await client.grantRole(USER, 10, DEPLOYER);
      await client.grantPermission("dummy-permission", 1, DEPLOYER);
      
      let receipt = await client.revokePermission("dummy-permission", 1, USER);
      expect(receipt.success).eq(true);
    });

  });
});
