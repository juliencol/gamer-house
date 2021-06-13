import mongoose from 'mongoose';
import request from 'supertest';
import { createGamer, followGamer } from '../../controllers/gamerController';
import { IGamer } from '../../schema/Gamer';
import { createServer } from '../../server/createServer';
import { generateJWT } from '../../services/authenticationService';

const DEV_DB_CONNECTION_STRING = process.env.DEV_DB_CONNECTION_STRING;

if (!DEV_DB_CONNECTION_STRING) {
  throw new Error('DEV_DB_CONNECTION_STRING is not defined');
}

let gamer: IGamer;
let jwt: string;

beforeEach((done) => {
  mongoose.connect(
    DEV_DB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async () => {
      gamer = await createGamer({
        email: 'registered@email.com',
        password: 'Password0',
        pseudo: 'pseudo',
        birthDate: new Date('1999-01-01'),
      });
      jwt = generateJWT({ id: gamer.id, pseudo: gamer.pseudo });
      done();
    }
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

const app = createServer();

describe('Routes gamers/', () => {
  it('should respond with an error 500 with a no authenticated user', async () => {
    await request(app).get('/gamers/').expect(500);
    await request(app).get('/gamers/search/').expect(500);
    await request(app).get('/gamers/getAuthenticatedGamer/').expect(500);
    await request(app).post('/gamers/').expect(500);
    await request(app).post('/gamers/filter/').expect(500);
    await request(app).put('/gamers/update/').expect(500);
    await request(app).put('/gamers/follow/').expect(500);
    await request(app).put('/gamers/avatar/').expect(500);
    await request(app).delete('/gamers/unfollow/').expect(500);
  });
});

describe('GET gamers/', () => {
  it('should respond with a non valid id', async () => {
    await request(app)
      .get('/gamers/testid')
      .set('Authorization', `AccessToken ${jwt}`)
      .send()
      .expect(500)
      .expect({
        error:
          'The gamer could not be found: Cast to ObjectId failed for value "testid" (type string) at path "_id" for model "Gamer"',
      });
  });

  it('should respond with a nonexistent id', async () => {
    await request(app)
      .get('/gamers/60c5bda4320cf40be40c0000')
      .set('Authorization', `AccessToken ${jwt}`)
      .send()
      .expect(500)
      .expect({
        error: 'The gamer could not be found: The requested gamer does not exist',
      });
  });
});

describe('GET gamers/search', () => {
  it('should respond with an empty list because of nonexistent gamer with this pseudo', async () => {
    await request(app)
      .get('/gamers/search/TestPseudo')
      .set('Authorization', `AccessToken ${jwt}`)
      .send()
      .expect(200)
      .expect([]);
  });

  it('should respond with a list of matching gamers', async () => {
    await request(app)
      .get('/gamers/search/pseudo')
      .set('Authorization', `AccessToken ${jwt}`)
      .send()
      .expect(200);
  });
});

describe('GET gamers/search', () => {
  it('should respond with an empty list because of nonexistent gamer with this pseudo', async () => {
    await request(app)
      .get('/gamers/search/TestPseudo')
      .set('Authorization', `AccessToken ${jwt}`)
      .send()
      .expect(200)
      .expect([]);
  });

  it('should respond with a list of matching gamers', async () => {
    await request(app)
      .get('/gamers/search/pseudo')
      .set('Authorization', `AccessToken ${jwt}`)
      .send()
      .expect(200);
  });
});

describe('PATCH gamers/:id/password', () => {
  it('should respond with a error because of non valid password', async () => {
    await request(app)
      .patch(`/gamers/${gamer.id}/password`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send({ password: 'password' })
      .expect(422);
  });

  it('should respond with a error because of non valid password', async () => {
    await request(app)
      .patch(`/gamers/${gamer.id}/password`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send({ password: 'Password' })
      .expect(422);
  });

  it('should respond with a error because of non valid password', async () => {
    await request(app)
      .patch(`/gamers/${gamer.id}/password`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send({ password: 'password0' })
      .expect(422);
  });

  it('should respond with a error because of non valid password', async () => {
    await request(app)
      .patch(`/gamers/${gamer.id}/password`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send({ password: 'PASSWORD0' })
      .expect(422);
  });

  it('should update the gamer with a valid password', async () => {
    await request(app)
      .patch(`/gamers/${gamer.id}/password`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send({ password: 'Password1' })
      .expect(201);
  });
});

describe('PUT gamers/update', () => {
  it('should respond with a error because of non valid email', async () => {
    await request(app)
      .put(`/gamers/update`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send({ email: 'testpseudofr' })
      .expect(500);
  });

  it('should respond with a error because of non valid email', async () => {
    await request(app)
      .put(`/gamers/update`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send({ email: 'test@pseudofr' })
      .expect(500);
  });

  it('should update the gamer with a valid email', async () => {
    await request(app)
      .put(`/gamers/update`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send({ email: 'test@pseudo.fr' })
      .expect(201);
  });
});

describe('PATCH gamers/:id/password', () => {
  it('should respond with a error because of non valid password', async () => {
    await request(app)
      .patch(`/gamers/${gamer.id}/password`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send({ password: 'password' })
      .expect(422);
  });

  it('should respond with a error because of non valid password', async () => {
    await request(app)
      .patch(`/gamers/${gamer.id}/password`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send({ password: 'Password' })
      .expect(422);
  });

  it('should respond with a error because of non valid password', async () => {
    await request(app)
      .patch(`/gamers/${gamer.id}/password`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send({ password: 'password0' })
      .expect(422);
  });

  it('should respond with a error because of non valid password', async () => {
    await request(app)
      .patch(`/gamers/${gamer.id}/password`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send({ password: 'PASSWORD0' })
      .expect(422);
  });

  it('should update the gamer with a valid password', async () => {
    await request(app)
      .patch(`/gamers/${gamer.id}/password`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send({ password: 'Password1' })
      .expect(201);
  });
});

describe('PUT /follow', () => {
  it('should respond with an error because of nonexistent gamer to follow', async () => {
    await request(app)
      .put(`/gamers/follow`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send({ idtoFollow: '60c5bda4320cf40be40c0000' })
      .expect(500);
  });

  it('should follow the existing gamer', async () => {
    const gamerToFollow = await createGamer({
      email: 'test@email.com',
      password: 'Password1',
      pseudo: 'pseudoToFollow',
      birthDate: new Date('1999-01-01'),
    });

    await request(app)
      .put(`/gamers/follow`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send({ idToFollow: `${gamerToFollow._id}` })
      .expect(201);
  });

  it('should respond with an error because the gamer is already being followed', async () => {
    const gamerToFollow = await createGamer({
      email: 'test@email.com',
      password: 'Password1',
      pseudo: 'pseudoToFollow',
      birthDate: new Date('1999-01-01'),
    });

    await followGamer(gamer._id, gamerToFollow._id);

    await request(app)
      .put(`/gamers/follow`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send({ idToFollow: `${gamerToFollow._id}` })
      .expect(500);
  });
});
