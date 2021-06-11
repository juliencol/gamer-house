import mongoose from 'mongoose';
import request from 'supertest';
import { createGamer } from '../../controllers/gamerController';
import { createServer } from '../../server/createServer';
import {
  generateJWT,
  getPayload,
  isValidJWT,
  PayloadJWT,
} from '../../services/authenticationService';
import { TestDataForLogin, TestDataForRegister } from '../../types/gamer.types';

const DEV_DB_CONNECTION_STRING = process.env.DEV_DB_CONNECTION_STRING;

if (!DEV_DB_CONNECTION_STRING) {
  throw new Error('DEV_DB_CONNECTION_STRING is not defined');
}

beforeEach((done) => {
  mongoose.connect(
    DEV_DB_CONNECTION_STRING,
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

describe('GET/ isAuthenticated', () => {
  it('should respond with an error 500 with no AccessToken in the authorization header', async () => {
    await request(app).get('/authentication/isAuthenticated').expect(500);
  });

  it('should respond with false with a bad jwt', async () => {
    const badJWT = 'Oh, a bad json web token!';
    await request(app)
      .get('/authentication/isAuthenticated')
      .set('Authorization', `AccessToken ${badJWT}`)
      .expect(200)
      .expect('false');
  });

  it('should respond with true with a good jwt', async () => {
    const goodJWT = generateJWT({ id: 'un id', pseudo: 'un pseudo' });
    await request(app)
      .get('/authentication/isAuthenticated')
      .set('Authorization', `AccessToken ${goodJWT}`)
      .expect(200)
      .expect('true');
  });
});

describe('POST/ login', () => {
  it('should respond with an error 500 an invalid email or password', async () => {
    const invalidMail: TestDataForLogin = {
      email: 'toto',
      password: 'Password0',
    };
    await request(app)
      .post('/authentication/login')
      .send(invalidMail)
      .expect(422)
      .expect(['This email is not valid']);

    const invalidPassword: TestDataForLogin = {
      email: 'toto@email.com',
      password: 'Password',
    };
    await request(app)
      .post('/authentication/login')
      .send(invalidPassword)
      .expect(422)
      .expect(['This password is not valid']);
  });

  it('should respond with an error 500 with an unregistered email', async () => {
    const unregisteredMail: TestDataForLogin = {
      email: 'unregistered@email.com',
      password: 'Password0',
    };
    await request(app)
      .post('/authentication/login')
      .send(unregisteredMail)
      .expect(500)
      .expect(`The gamer could not be logged`);
  });

  it('should respond with an error 500 with a registered email but wrong password', async () => {
    const gamer = await createGamer({
      email: 'registered@email.com',
      password: 'Password0',
      pseudo: 'pseudo',
      birthDate: new Date('1999-01-01'),
    });

    const wrongPassword: TestDataForLogin = {
      email: 'registered@email.com',
      password: 'Password1',
    };
    await request(app)
      .post('/authentication/login')
      .send(wrongPassword)
      .expect(500)
      .expect('The gamer could not be logged');
  });

  it('should respond with a valid jwt with valid log in data', async () => {
    const gamer = await createGamer({
      email: 'registered@email.com',
      password: 'Password0',
      pseudo: 'pseudo',
      birthDate: new Date('1999-01-01'),
    });

    const validLogIn = {
      email: 'registered@email.com',
      password: 'Password0',
    };
    const resp = await request(app)
      .post('/authentication/login')
      .send(validLogIn)
      .expect(200);

    const jwt = resp.body.accessToken;
    expect(isValidJWT(jwt)).toBe(true);

    const expectedPlayload: PayloadJWT = {
      id: gamer.id,
      pseudo: gamer.pseudo,
    };
    const jwtPlayload = getPayload(jwt);

    expect(jwtPlayload).toStrictEqual(expectedPlayload);
  });
});

describe('POST/ register', () => {
  it('should respond with an error 500 for an invalid email', async () => {
    const gamerArgs: TestDataForRegister & { confirmPassword: string } = {
      email: 'toto',
      password: 'Password0',
      confirmPassword: 'Password0',
      pseudo: 'pseudo',
      birthDate: '1999-01-01',
    };

    await request(app)
      .post('/authentication/register')
      .send(gamerArgs)
      .expect(422)
      .expect(['This email is not valid']);
  });

  it('should respond with an error 500 for an invalid password or not the same confirmPassword', async () => {
    const gamerArgs: TestDataForRegister & { confirmPassword: string } = {
      email: 'good@mail.com',
      password: 'Password',
      confirmPassword: 'Password',
      pseudo: 'pseudo',
      birthDate: '1999-01-01',
    };

    await request(app)
      .post('/authentication/register')
      .send(gamerArgs)
      .expect(422)
      .expect(['This password is not valid']);

    gamerArgs.password = 'Password0';
    gamerArgs.confirmPassword = 'anotherPassword';

    await request(app)
      .post('/authentication/register')
      .send(gamerArgs)
      .expect(422)
      .expect(['The passwords do not match']);
  });

  it('should respond with an error 500 for an invalid pseudo', async () => {
    const gamerArgs: TestDataForRegister & { confirmPassword: string } = {
      email: 'good@mail.com',
      password: 'Password0',
      confirmPassword: 'Password0',
      pseudo: 'ps',
      birthDate: '1999-01-01',
    };

    await request(app)
      .post('/authentication/register')
      .send(gamerArgs)
      .expect(422)
      .expect(['This pseudo is not valid']);
  });

  it('should respond with an error 500 for an invalid birthdate', async () => {
    const gamerArgs: TestDataForRegister & { confirmPassword: string } = {
      email: 'good@mail.com',
      password: 'Password0',
      confirmPassword: 'Password0',
      pseudo: 'pseudo',
      birthDate: '',
    };

    await request(app)
      .post('/authentication/register')
      .send(gamerArgs)
      .expect(422)
      .expect([
        'Incorrect date format',
        'Incorrect date',
        'You must be at least 18 to create an account',
      ]);
  });

  it('should respond with a valid jwt with valid log in data', async () => {
    const gamerArgs: TestDataForRegister & { confirmPassword: string } = {
      email: 'good@mail.com',
      password: 'Password0',
      confirmPassword: 'Password0',
      pseudo: 'pseudo',
      birthDate: '1999-01-01',
    };

    const resp = await request(app)
      .post('/authentication/register')
      .send(gamerArgs)
      .expect(200);

    const jwt = resp.body.accessToken;
    expect(isValidJWT(jwt)).toBe(true);
  });
});
