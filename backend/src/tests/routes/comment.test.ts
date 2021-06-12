import mongoose from 'mongoose';
import request from 'supertest';
import { createComment } from '../../controllers/commentController';
import { createGamer } from '../../controllers/gamerController';
import { createPost } from '../../controllers/postController';
import { createPostTag } from '../../controllers/postTagController';
import { IGamer } from '../../schema/Gamer';
import { Category } from '../../schema/PostTag';
import { createServer } from '../../server/createServer';
import { generateJWT } from '../../services/authenticationService';
import { CreateCommentArgs } from '../../types/comment.types';

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
        name: 'Event',
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

describe('Routes comment/', () => {
  it('should respond with an error 500 with a no authenticated user', async () => {
    await request(app).get('/comment/').expect(500);
    await request(app).post('/comment/').expect(500);
    await request(app).delete('/comment/').expect(500);
  });
});

describe('Post/ comment/', () => {
  it('should respond with an error for an inexisting user', async () => {
    const post = await createPost({
      name: 'Mon beau post',
      content: 'Avec du contenu de qualité',
      tags: ['Event'],
      writer: gamer.id,
    });

    const data: CreateCommentArgs = {
      content: 'Un commentaire',
      writer: 'not existing',
      post: post.id,
    };
    await request(app)
      .post('/comment/')
      .set('Authorization', `AccessToken ${jwt}`)
      .send(data)
      .expect(500)
      .expect({
        error: 'The comment could not be created: The requested gamer does not exist',
      });
  });

  it('should respond with an error for an inexisting post', async () => {
    const post = await createPost({
      name: 'Mon beau post',
      content: 'Avec du contenu de qualité',
      tags: ['Event'],
      writer: gamer.id,
    });

    const data: CreateCommentArgs = {
      content: 'Un commentaire',
      writer: gamer.id,
      post: 'not existing',
    };
    await request(app)
      .post('/comment/')
      .set('Authorization', `AccessToken ${jwt}`)
      .send(data)
      .expect(500)
      .expect({
        error: 'The comment could not be created: The requested post does not exist',
      });
  });

  it('should create a comment for an existing post and an existing user', async () => {
    const post = await createPost({
      name: 'Mon beau post',
      content: 'Avec du contenu de qualité',
      tags: ['Event'],
      writer: gamer.id,
    });

    const data: CreateCommentArgs = {
      content: 'Un commentaire',
      writer: gamer.id,
      post: post.id,
    };

    await request(app)
      .post('/comment/')
      .set('Authorization', `AccessToken ${jwt}`)
      .send(data)
      .expect(201);
  });
});

describe('Get/ comment/:id/user', () => {
  const anIdNotInTheDatabase = '60c392ed3f4c937e54820fdb';
  it('should respond with an error for an unexisting comment', async () => {
    await request(app)
      .get(`/comment/${anIdNotInTheDatabase}/user`)
      .set('Authorization', `AccessToken ${jwt}`)
      .expect(500)
      .expect({ error: `The comment was not found` });
  });

  it('should return the user that wrote the comment', async () => {
    const post = await createPost({
      name: 'Mon beau post',
      content: 'Avec du contenu de qualité',
      tags: ['Event'],
      writer: gamer.id,
    });

    const comment = await createComment({
      writer: gamer.id,
      post: post.id,
      content: 'Un commentaire de haute précision',
    });

    await request(app)
      .get(`/comment/${comment.id}/user`)
      .set('Authorization', `AccessToken ${jwt}`)
      .expect(200)
      .expect({ id: gamer.id });
  });
});

describe('Delete/ comment/', () => {
  it('should respond with an error for an unexisting comment', async () => {
    await request(app)
      .delete('/comment/')
      .set('Authorization', `AccessToken ${jwt}`)
      .expect(500);
  });

  it('should delete the comment', async () => {
    const post = await createPost({
      name: 'Mon beau post',
      content: 'Avec du contenu de qualité',
      tags: ['Event'],
      writer: gamer.id,
    });

    const comment = await createComment({
      writer: gamer.id,
      post: post.id,
      content: 'Un commentaire de haute précision',
    });

    const data = {
      writerId: gamer.id,
      commentId: comment.id,
      postId: post.id,
    };

    await request(app)
      .delete('/comment/')
      .send(data)
      .set('Authorization', `AccessToken ${jwt}`)
      .expect(200)
      .expect('Comment deleted');
  });
});
