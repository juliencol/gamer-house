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
      await createPostTag({
        name: 'Test',
        category: Category.Event,
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

describe('Routes posts/', () => {
  it('should respond with an error 500 with a no authenticated user', async () => {
    await request(app).get('/posts/').expect(500);
    await request(app).post('/posts/').expect(500);
    await request(app).post('/posts/filter/').expect(500);
  });
});

describe('POST/ posts/', () => {
  it('should respond with an error for an nonexistent user', async () => {
    const data: CreatePostArgs = {
      name: 'It is a simple post',
      content: 'With a simple content',
      tags: ['Test'],
      writer: 'not existing',
    };

    await request(app)
      .post('/posts/')
      .set('Authorization', `AccessToken ${jwt}`)
      .send(data)
      .expect(500)
      .expect({
        error: 'The post could not be created: The requested gamer does not exist',
      });
  });

  it('should respond with an error for an nonexistent tag', async () => {
    const data: CreatePostArgs = {
      name: 'It is a simple post',
      content: 'With a simple content',
      tags: ['Not existing'],
      writer: gamer.id,
    };

    await request(app)
      .post('/posts/')
      .set('Authorization', `AccessToken ${jwt}`)
      .send(data)
      .expect(500)
      .expect({
        error: 'The post could not be created: The requested post tag does not exist',
      });
  });

  it('should respond with an error for an nonexistent content', async () => {
    const data: CreatePostArgs = {
      name: 'It is a simple post',
      content: '',
      tags: ['Test'],
      writer: 'not existing',
    };

    await request(app)
      .post('/posts/')
      .set('Authorization', `AccessToken ${jwt}`)
      .send(data)
      .expect(500)
      .expect({
        error:
          'The post could not be created: Post validation failed: content: Path `content` is required.',
      });
  });

  it('should respond with an error for an nonexistent name', async () => {
    const data: CreatePostArgs = {
      name: '',
      content: 'With a simple content',
      tags: ['Test'],
      writer: 'not existing',
    };

    await request(app)
      .post('/posts/')
      .set('Authorization', `AccessToken ${jwt}`)
      .send(data)
      .expect(500)
      .expect({
        error:
          'The post could not be created: Post validation failed: name: Path `name` is required.',
      });
  });

  it('should create the post and add it to the writer posts list', async () => {
    const data: CreatePostArgs = {
      name: 'It a simple post',
      content: 'With a simple content',
      tags: ['Test'],
      writer: gamer.id,
    };

    await request(app)
      .post('/posts/')
      .set('Authorization', `AccessToken ${jwt}`)
      .send(data)
      .expect(201);
  });
});

describe('DELETE/ posts/', () => {
  it('should respond with an error for a nonexistent post', async () => {
    await request(app)
      .delete('/posts/60bc91bf6f96676d54f7a399')
      .set('Authorization', `AccessToken ${jwt}`)
      .send()
      .expect(500)
      .expect({
        error: 'The post could not be deleted: The requested post does not exist',
      });
  });

  it('should delete the post and remove it from writer posts list', async () => {
    const data: CreatePostArgs = {
      name: 'It a simple post',
      content: 'With a simple content',
      tags: ['Test'],
      writer: gamer.id,
    };

    const post = await createPost(data);

    await request(app)
      .delete(`/posts/${post.id}`)
      .set('Authorization', `AccessToken ${jwt}`)
      .send()
      .expect(204);
  });
});
