import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

//Get /users
router.get("/", async(req: Request, res: Response) =>{
    const users = await prisma.user.findMany();
    res.json({ users });
});

router.get("/:id", async(req: Request, res: Response) => {
    const user_id = await prisma.user.findUnique({
        where: {id: parseInt(req.params?.id)},
    });
    res.json({ user_id });
});

router.post("/", async(req: Request, res: Response) => {
    const { name, email} = req.body;
    const user = await prisma.user.create({
        data: { name, email},
    });
    res.json({ user });
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