import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

let posts: { postId: number, sender: string, title: string, content: string, timeSent: number }[] = [];
let postIdCounter = 1;

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

app.get('/echo/echo', (req, res) => {
    const message = req.query.message;
    if (message === 'wrapper') {
        res.json({ message });
    } else {
        res.status(400).json({ error: 'Invalid message' });
    }
});

app.delete('/clear', (req, res) => {
    posts = [];
    res.status(200).json({});
});

app.post('/post/create', (req, res) => {
    const { sender, title, content } = req.body;

    if (typeof sender !== 'string' || typeof title !== 'string' || typeof content !== 'string') {
        return res.status(400).json({ error: 'Invalid payload' });
    }

    const post = { postId: postIdCounter++, sender, title, content, timeSent: Date.now() };
    posts.push(post);
    res.json({ postId: post.postId });
});

app.get('/posts/list', (req, res) => {
    const postList = posts.map(({ postId, sender, title, timeSent }) => ({ postId, sender, title, timeSent }));
    res.json({ posts: postList });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
