import mongoose from 'mongoose';
import request from 'supertest';
import { createGamer } from '../../controllers/gamerController';
import { createPost } from '../../controllers/postController';
import { createPostTag } from '../../controllers/postTagController';
import { IGamer } from '../../schema/Gamer';
import { Category } from '../../schema/PostTag';
import { createServer } from '../../server/createServer';
import { generateJWT } from '../../services/authenticationService';
import { CreateCommentArgs } from '../../types/comment.types';
import { CreatePostArgs } from '../../types/post.types';

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

describe('Routes postTags/', () => {
  it('should respond with an error 500 with a no authenticated user', async () => {
    await request(app).get('/postTags/').expect(500);
    await request(app).post('/postTags/').expect(500);
  });
});

describe('POST postTags/', () => {
  it('should respond with an error because of empty name', async () => {
    await request(app)
      .post('/postTags')
      .set('Authorization', `AccessToken ${jwt}`)
      .send({
        name: '',
        category: Category.Event,
      })
      .expect(500);
  });

  it('should create the corresponding tag', async () => {
    await request(app)
      .post('/postTags')
      .set('Authorization', `AccessToken ${jwt}`)
      .send({
        name: 'Test',
        category: Category.Event,
      })
      .expect(201);
  });
});

describe('DELETE postTags/', () => {
  it('should respond with an error because of non existing post tag', async () => {
    await request(app)
      .delete(`/postTags/60bdc0e2e639847198ac0000`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send()
      .expect(500);
  });

  it('should delete the corresponding post tag', async () => {
    const postTag = await createPostTag({
      name: 'Test',
      category: Category.Event,
    });

    await request(app)
      .delete(`/postTags/${postTag._id}`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send()
      .expect(201);
  });
});
