import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const router = Router();

//Get /users
router.get("/", async(req: Request, res: Response) =>{
    const users = await prisma.user.findMany();
    res.json({ users });
});

router.get("/:id", async(req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: {id:parseInt(req.params?.id)}
    });
    if (!user) {
        res.status(404).json({error: "User not found"});
        return;
    }
    res.json({user});
});

router.post("/", async(req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        
        // 基本的なバリデーション
        if (!name || !email || !password) {
            res.status(400).json({ error: '必須項目が不足しています' });
            return;
        }
        
        // パスワードのハッシュ化
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: { 
                name, 
                email, 
                password: hashedPassword
            },
        });
        
        // パスワードを除外してレスポンスを返す
        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ error: 'サーバーエラーが発生しました' });
    }
});

router.put("/:id", async(req: Request, res: Response) => {
    const { name, email } = req.body;
    const user = await prisma.user.update({
        where: {id: parseInt(req.params?.id)},
        data: { name, email},
    });
    res.json({ user });
})

router.delete("/:id", async(req: Request, res: Response) => {
    const user = await prisma.user.delete({
        where: { id: parseInt(req.params?.id) },
    });
    res.json({ user });
});

export default router