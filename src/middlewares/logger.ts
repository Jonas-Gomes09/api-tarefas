import express, {Request, Response, NextFunction} from "express"

const app = express()


export function logger(req: Request, res: Response, next: NextFunction) {
    const agora = new Date().toLocaleDateString()

    console.log(`[${agora}] ${req.method} executado em ${req.url}`)
    next()
}