import { reducer } from "./application";
import { exportAllDeclaration } from "@babel/types";

describe("Reducer", () => {

  it("throws an error with an unsupported type", () => {
    expect(() => reducer({}, { type: null })).toThrowError(
      /tried to reduce with unsupported action type/i
    );
  });

});