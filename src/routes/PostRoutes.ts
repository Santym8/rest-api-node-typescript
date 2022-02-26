import { Request, Response, Router } from 'express';
import Post from '../models/Post'

class PostRoutes {

    router: Router;


    constructor() {
        this.router = Router();
        this.routes();
    }

    private async getPosts(req: Request, res: Response) {
        let posts = await Post.find();
        res.json({ data: posts });
    }

    private async getPost(req: Request, res: Response) {
        let post = await Post.findOne({url:req.params.url})
        res.json(post) 
    }

    private createPost(req: Request, res: Response) {
        let { title, url, content, image } = req.body;
        let newPost = new Post({
            title, url, content, image
        });
        newPost.save()
        res.json({ data: newPost })


    }

    private async updatePost(req: Request, res: Response) {
        let postUpdated = await Post.findOneAndUpdate({url: req.params.url} , req.body, {new:true});
        res.json(postUpdated);
    }

    private async deletePost(req: Request, res: Response) {
        await Post.deleteOne({url:req.params.url})
        res.send('Eliminado')
    }




    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/create', this.createPost);
        this.router.delete('/delete/:url', this.deletePost);
        this.router.put('/update/:url', this.updatePost);
    }
}

const postRoutes = new PostRoutes();
export default postRoutes.router;