import { expect, test } from "@oclif/test";
import { isGithubURL } from "../../../src/commands/install/helpers";

describe("isGithubURL", () => {
  it("should return true for a valid github url", () => {
    const url = "https://github.com/test/test";
    expect(isGithubURL(url)).to.equal(true);
  });

  it("should return false for an invalid github url", () => {
    const url = "https://google.com";
    expect(isGithubURL(url)).to.be.false;
  });
});
