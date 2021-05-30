import mongoose from "mongoose";
import request from "supertest";
import {
  jwtPlayloadKeys,
  PlayloadJWT,
  generateJWT,
  isValidJWT,
  readJWT,
} from "../../authentication/jwt";
import { DB_CONNECTION_STRING } from "../../constants";
import { createGamer } from "../../gamer/gamer";
import { CreateGamerArgs } from "../../gamer/gamer.types";
import { createServer } from "../../server";

beforeEach((done) => {
  mongoose.connect(
    DB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

const app = createServer();

describe("GET/ isAuthenticated", () => {
  it("should respond with an error 500 with no AccessToken in the authorization header", async () => {
    await request(app).get("/authentication/isAuthenticated").expect(500);
  });

  it("should respond with false with a bad jwt", async () => {
    const badJWT = "Oh, a bad json web token!";
    await request(app)
      .get("/authentication/isAuthenticated")
      .set("Authorization", `AccessToken ${badJWT}`)
      .expect(200)
      .expect("false");
  });

  it("should respond with true with a good jwt", async () => {
    const goodJWT = generateJWT({ id: "un id" });
    await request(app)
      .get("/authentication/isAuthenticated")
      .set("Authorization", `AccessToken ${goodJWT}`)
      .expect(200)
      .expect("true");
  });
});

describe("POST/ login", () => {
  it("should respond with an error 500 an invalid email or password", async () => {
    const invalidMail = { email: "toto", password: "Password0" };
    await request(app)
      .post("/authentication/login")
      .send(invalidMail)
      .expect(500)
      .expect("Bad input");

    const invalidPassword = { email: "toto@email.com", password: "Password" };
    await request(app)
      .post("/authentication/login")
      .send(invalidPassword)
      .expect(500)
      .expect("Bad input");
  });

  it("should respond with an error 500 with an unregistered email", async () => {
    const unregisteredMail = {
      email: "unregistered@email.com",
      password: "Password0",
    };
    await request(app)
      .post("/authentication/login")
      .send(unregisteredMail)
      .expect(500)
      .expect("The requested gamer does not exist");
  });

  it("should respond with an error 500 with a registered email but wrong password", async () => {
    const gamer = await createGamer({
      email: "registered@email.com",
      password: "Password0",
      pseudo: "pseudo",
      birthDate: new Date("1999-01-01"),
    });

    const wrongPassword = {
      email: "registered@email.com",
      password: "Password1",
    };
    await request(app)
      .post("/authentication/login")
      .send(wrongPassword)
      .expect(500)
      .expect("Wrong password and email combination");
  });

  it("should respond with a valid jwt with valid log in data", async () => {
    const gamer = await createGamer({
      email: "registered@email.com",
      password: "Password0",
      pseudo: "pseudo",
      birthDate: new Date("1999-01-01"),
    });

    const validLogIn = {
      email: "registered@email.com",
      password: "Password0",
    };
    const resp = await request(app)
      .post("/authentication/login")
      .send(validLogIn)
      .expect(200);

    const jwt = resp.body.accessToken;
    expect(isValidJWT(jwt)).toBe(true);

    const expectedPlayload: PlayloadJWT = { id: gamer.id };
    const jwtPlayload = Object.entries(readJWT(jwt)).reduce((prev, curr) => {
      const key = curr[0];
      if (key !== "exp" && key !== "iat") {
        prev[key as jwtPlayloadKeys] = curr[1];
      }
      return prev;
    }, expectedPlayload);

    expect(jwtPlayload).toBe(expectedPlayload);
  });
});

describe("POST/ register", () => {
  it("should respond with an error 500 for an invalid email", async () => {
    const gamerArgs: CreateGamerArgs & { confirmPassword: string } = {
      email: "toto",
      password: "Password0",
      confirmPassword: "Password0",
      pseudo: "pseudo",
      birthDate: new Date("1999-01-01"),
    };

    await request(app)
      .post("/authentication/register")
      .send(gamerArgs)
      .expect(500)
      .expect("Bad input");
  });

  it("should respond with an error 500 for an invalid password or not the same confirmPassword", async () => {
    const gamerArgs: CreateGamerArgs & { confirmPassword: string } = {
      email: "good@mail.com",
      password: "Password",
      confirmPassword: "Password",
      pseudo: "pseudo",
      birthDate: new Date("1999-01-01"),
    };

    await request(app)
      .post("/authentication/register")
      .send(gamerArgs)
      .expect(500)
      .expect("Bad input");

    gamerArgs.password = "Password0";
    gamerArgs.confirmPassword = "anotherPassword";

    await request(app)
      .post("/authentication/register")
      .send(gamerArgs)
      .expect(500)
      .expect("Bad input");
  });

  it("should respond with an error 500 for an invalid pseudo", async () => {
    const gamerArgs: CreateGamerArgs & { confirmPassword: string } = {
      email: "good@mail.com",
      password: "Password0",
      confirmPassword: "Password0",
      pseudo: "ps",
      birthDate: new Date("1999-01-01"),
    };

    await request(app)
      .post("/authentication/register")
      .send(gamerArgs)
      .expect(500)
      .expect("Bad input");
  });

  it("should respond with an error 500 for an invalid birthdate", async () => {
    const gamerArgs: CreateGamerArgs & { confirmPassword: string } = {
      email: "good@mail.com",
      password: "Password0",
      confirmPassword: "Password0",
      pseudo: "pseudo",
      birthDate: new Date(),
    };

    await request(app)
      .post("/authentication/register")
      .send(gamerArgs)
      .expect(500)
      .expect("Bad input");
  });

  it("should respond with a valid jwt with valid log in data", async () => {
    const gamerArgs: CreateGamerArgs & { confirmPassword: string } = {
      email: "good@mail.com",
      password: "Password0",
      confirmPassword: "Password0",
      pseudo: "pseudo",
      birthDate: new Date("1999-01-01"),
    };

    const resp = await request(app)
      .post("/authentication/register")
      .send(gamerArgs)
      .expect(200);

    const jwt = resp.body.accessToken;
    expect(isValidJWT(jwt)).toBe(true);
  });
});
