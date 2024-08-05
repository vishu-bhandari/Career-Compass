import express from 'express'
import { createComment, likeComment } from '../controllers/comment.controller.js';
import {verifyToken} from '../utils/verifyUser.js'
import { getPostComments } from '../controllers/comment.controller.js';

const router=express.Router();

router.post('/create',verifyToken,  createComment);
router.get('/getPostComments/:postId' , getPostComments);
router.put('/likeComment/:commentId', verifyToken , likeComment);

export default router;