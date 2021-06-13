import mongoose from 'mongoose';
import request from 'supertest';
import { addGameToGamer, createGame } from '../../controllers/gameController';
import { createGamer } from '../../controllers/gamerController';
import { createPostTag } from '../../controllers/postTagController';
import { IGamer } from '../../schema/Gamer';
import { Category } from '../../schema/PostTag';
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

describe('Routes games/', () => {
  it('should respond with an error 500 with a no authenticated user', async () => {
    await request(app).post('/games/').expect(500);
    await request(app).get('/games/').expect(500);
    await request(app).put('/games/').expect(500);
  });
});

describe('POST games/', () => {
  it('should respond with an error because of empty name', async () => {
    await request(app)
      .post('/games')
      .set('Authorization', `AccessToken ${jwt}`)
      .send({
        name: '',
        picture: 'https://img.icons8.com/color/452/rocket-league.png',
      })
      .expect(500);
  });

  it('should respond with an error because of empty picture', async () => {
    await request(app)
      .post('/games')
      .set('Authorization', `AccessToken ${jwt}`)
      .send({
        name: 'Test',
        picture: '',
      })
      .expect(500);
  });

  it('should create the corresponding game', async () => {
    await request(app)
      .post('/games')
      .set('Authorization', `AccessToken ${jwt}`)
      .send({
        name: 'Rocket League',
        picture: 'https://img.icons8.com/color/452/rocket-league.png',
      })
      .expect(201);
  });
});

describe('PUT games/', () => {
  it('should add the corresponding game to gamer', async () => {
    const game = await createGame({
      name: 'League of Legends',
      picture:
        'https://www.esportsbets.com/wp-content/uploads/2018/01/lol_client_logo.png',
    });

    await request(app)
      .put('/games')
      .set('Authorization', `AccessToken ${jwt}`)
      .send({ gameWithRank: { game: game._id, rank: 'Iron IV' } })
      .expect(201);
  });
});

describe('DELETE games/', () => {
  it('should respond with an error removing inexisting game from gamer games list', async () => {
    const game = await createGame({
      name: 'League of Legends',
      picture:
        'https://www.esportsbets.com/wp-content/uploads/2018/01/lol_client_logo.png',
    });
    await addGameToGamer(gamer.id, { game: game._id, rank: 'Iron IV' });

    await request(app)
      .delete('/games/60c51a1367ed962d74e30000')
      .set('Authorization', `AccessToken ${jwt}`)
      .send()
      .expect(201);
  });

  it('should remove the corresponding game from gamer games list', async () => {
    const game = await createGame({
      name: 'League of Legends',
      picture:
        'https://www.esportsbets.com/wp-content/uploads/2018/01/lol_client_logo.png',
    });
    await addGameToGamer(gamer.id, { game: game._id, rank: 'Iron IV' });

    await request(app)
      .delete(`/games/${game._id}`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send()
      .expect(201);
  });
});
