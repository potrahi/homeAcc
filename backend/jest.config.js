module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "./coverage/",
  collectCoverageFrom: ["src/**/*.ts"],
  moduleFileExtensions: ["js", "ts"],
  testMatch: ["**/?(*.)+(spec|test).[t]s"],
};
