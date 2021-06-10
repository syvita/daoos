import { Client, Provider, ProviderRegistry } from "@blockstack/clarity";

describe("plugin-trait contract test suite", () => {
  let provider: Provider;
  let client: Client;
  
  describe("Contract syntax", async () => {
    it("should be valid", async () => {
      provider = await ProviderRegistry.createProvider();
      client = new Client("SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB.plugin-trait", "plugin-trait", provider);

      await client.checkContract();
      await client.deployContract();
    });

    after(async () => {
      await provider.close();
    });
  });
});