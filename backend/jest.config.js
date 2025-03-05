export default {
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  roots: ["<rootDir>/tests"],
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
  },
};
