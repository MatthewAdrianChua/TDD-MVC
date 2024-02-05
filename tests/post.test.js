const sinon = require('sinon');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');

describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content'
        }
    };

    let req2 ={
        body: {
            author: 'stswenguserUPDATED',
            title: 'My first UPDATED test post',
            content: 'Random content UPDATED'
        }
    };

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;

    
    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            createPostStub = sinon.stub(PostModel, 'createPost').yields(error);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update', () => {
        var updatePostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            updatePostStub.restore();
        });


        it('should return the updated post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first UPDATED test post',
                content: 'Random content UPDATED',
                author: 'stswenguserUPDATED',
                date: Date.now()
            };

            updatePostStub = sinon.stub(PostModel, 'updatePost').yields(null, expectedResult);

            // Act
            PostController.update(req2, res);

            // Assert
            sinon.assert.calledWith(PostModel.updatePost, req2.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req2.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req2.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req2.body.author }));

        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            updatePostStub = sinon.stub(PostModel, 'updatePost').yields(error);

            // Act
            PostController.update(req2, res);

            // Assert
            sinon.assert.calledWith(PostModel.updatePost, req2.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });

    });

    describe('findPost', () => {
        var findPostStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            findPostStub.restore();
        });

        it('should return the found post object', () => {
            const expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            findPostStub = sinon.stub(PostModel, 'findPost').yields(null, expectedResult);

            PostController.findPost(req, res);

            sinon.assert.calledWith(PostModel.findPost, req.params.id);
            sinon.assert.calledWith(res.json, sinon.match({ title: foundPost.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: foundPost.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: foundPost.author }));

            it('should return status 500 if post is not found', () => {
                const req = {
                    params: { id: 'nonexistentid' }
                };
            
                findPostStub = sinon.stub(PostModel, 'findPost').yields(error);
            
                PostController.findPost(req, res);
            
                sinon.assert.calledWith(PostModel.findPost, req.params.id);
                sinon.assert.calledWith(res.status, 500);
                sinon.assert.calledOnce(res.status(500).end);
            });
        })
    });
});