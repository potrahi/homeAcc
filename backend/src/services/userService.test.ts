import { Pool, PoolClient } from "pg";
import { UserService } from "./userService";
import { User } from "../models/User";

jest.mock("pg", () => {
  const mClient = {
    query: jest.fn(),
    release: jest.fn(),
  };
  const mPool = {
    connect: jest.fn(() => mClient),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe("UserService", () => {
  let pool: Pool;
  let userService: UserService;
  let client: PoolClient;

  beforeEach(async () => {
    pool = new Pool();
    userService = new UserService(pool);
    client = await pool.connect();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all users", async () => {
    const users: User[] = [
      {
        name: "John Doe",
      },
    ];
    (client.query as jest.Mock).mockResolvedValue({ rows: users });

    const result = await userService.getAllUsers();

    expect(client.query).toHaveBeenCalledWith("SELECT * FROM users");
    expect(result).toEqual(users);
    expect(client.release).toHaveBeenCalled();
    expect(client.query).toHaveBeenCalledTimes(1);
  });

  it("should get user by id", async () => {
    const user = { name: "John" };
    (client.query as jest.Mock).mockResolvedValue({ rows: [user] });

    const result = await userService.getUserById(1);

    expect(client.query).toHaveBeenCalledWith(
      "SELECT * FROM users WHERE id = $1",
      [1]
    );
    expect(result).toEqual(user);
    expect(client.release).toHaveBeenCalled();
  });

  it("should create a new user", async () => {
    const createdUser: User = { name: "John Doe" };
    (client.query as jest.Mock).mockResolvedValue({ rows: [createdUser] });

    const result = await userService.createUser(createdUser);

    expect(client.query).toHaveBeenCalledWith(
      "INSERT INTO users (name) VALUES ($1) RETURNING *",
      [createdUser.name]
    );
    expect(result).toEqual(createdUser);
    expect(client.release).toHaveBeenCalled();
    expect(client.query).toHaveBeenCalledTimes(1);
  });

  it("should update a user", async () => {
    const createdUser: User = { name: "John Doe" };
    (client.query as jest.Mock).mockResolvedValue({ rows: [createdUser] });

    const user = await userService.updateUser(1, { name: "John" });

    expect(client.query).toHaveBeenCalledWith(
      "UPDATE users SET name = $1 WHERE id = $2 RETURNING *",
      ["John", 1]
    );
    expect(user).toEqual(createdUser);
    expect(client.release).toHaveBeenCalled();
  });

  it("should delete a user", async () => {
    const createdUser: User = { name: "John Doe" };
    (client.query as jest.Mock).mockResolvedValue({ rows: [createdUser] });

    const user = await userService.deleteUser(1);

    expect(client.query).toHaveBeenCalledWith(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [1]
    );
    expect(user).toEqual(createdUser);
    expect(client.release).toHaveBeenCalled();
  });

  it("should delete all users", async () => {
    const createdUser: User = { name: "John Doe" };
    (client.query as jest.Mock).mockResolvedValue({ rows: createdUser });

    const users = await userService.deleteAllUsers();

    expect(client.query).toHaveBeenCalledWith("DELETE FROM users RETURNING *");
    expect(users).toEqual(createdUser);
    expect(client.release).toHaveBeenCalled();
  });
});
