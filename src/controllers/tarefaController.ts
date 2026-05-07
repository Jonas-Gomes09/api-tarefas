import { Request, Response } from "express";

import * as TarefaModel from "../models/tarefaModel";

import { ApiResponse, Tarefa, FiltroQuery } from "../interfaces";





export async function listar(req: Request<{},{},{},FiltroQuery>, res: Response) {

try {

let tarefas = await TarefaModel.listarTodas();

if (req.query.concluida === "true") tarefas = tarefas.filter(t => t.concluida);

if (req.query.concluida === "false") tarefas = tarefas.filter(t => !t.concluida);

if (req.query.prioridade) tarefas = tarefas.filter(t => t.prioridade === req.query.prioridade);

res.json({ sucesso: true, dados: tarefas } as ApiResponse<Tarefa[]>);

} catch { res.status(500).json({ sucesso: false, erro: 'Erro interno' }); }

}





export async function criar(req: Request, res: Response) {

try {

const { titulo, descricao, prioridade } = req.body;

const erros: string[] = [];

if (!titulo || typeof titulo !== "string") erros.push("titulo é obrigatório");

if (!["alta","media","baixa"].includes(prioridade)) erros.push("prioridade inválida");

if (erros.length > 0) { res.status(400).json({ sucesso:false, erros }); return; }

const nova = await TarefaModel.criar({ titulo, descricao, prioridade });

res.status(201).json({ sucesso: true, dados: nova });

} catch { res.status(500).json({ sucesso: false, erro: 'Erro interno' }); }

}





export async function buscarPorId(req: Request, res: Response) {
    try {
        let tarefas = await TarefaModel.listarTodas();
        const ID = Number(req.params.id)

        const busca = tarefas.find(t => t.id === ID)

        if (!busca) {
            return res.status(404).json({sucesso: false, erro: `Não existe nenhuma tarefa com o ID ${ID}`})
        } else {
            return res.json(busca)
        }
    } catch {
        return res.status(500).json({sucesso: false, erro: `Erro interno do servidor`})
    }
}





export async function listarPagina(req: Request, res: Response) {
    try {
        let tarefas = await TarefaModel.listarTodas();
        return res.render("tarefas", {tarefas})
    } catch {
        return res.status(500).json({sucesso: false, erro: `Erro interno do servidor`})
    }
}





export async function detalhePagina(req: Request, res: Response) {
    try {
        let tarefas = await TarefaModel.listarTodas();
        const ID = Number(req.params.id)
        let busca = tarefas.find(a => a.id === ID)
        if (!busca) {
            return res.render("erro", {tarefa:busca})
        } else {
            return res.render("detalhe", {tarefa:busca})
        }
    } catch {
        return res.status(500).json({sucesso: false, erro: `Erro interno do servidor`})
    }
}





export async function cadastrarPagina(req: Request, res: Response) {
    try {
            return res.render("cadastrar")
    } catch {
        return res.status(500).json({sucesso: false, erro: `Erro interno do servidor`})
    }
}





export async function concluirForm(req: Request, res: Response) {
    try {
        const { concluida } = req.body;
        const ID = Number(req.params.id)

        const updTarefa = TarefaModel.atualizar(ID, {concluida})
    } catch {
        res.status(500).json({sucesso: false, erro: `Erro interno do servidor`})
    }
}





export async function atualizar(req: Request, res: Response) {
    try {
        const { titulo, descricao, prioridade } = req.body;
        const ID = Number(req.params.id)

        const updTarefa = TarefaModel.atualizar(ID, { titulo, descricao, prioridade })
    } catch {
        res.status(500).json({sucesso: false, erro: `Erro interno do servidor`})
    }
}





export async function cadastrarForm(req: Request, res: Response) {
    try {
        res.render("cadastrar")
    } catch {
        res.status(500).json({sucesso: false, erro: `Erro interno do servidor`})
    }
}





export async function remover(req: Request, res: Response) {
    try {
        const ID = Number(req.params.id)
        const remTarefa = TarefaModel.remover(ID)
    } catch {
        res.status(500).json({sucesso: false, erro: `Erro interno do servidor`})
    }
}





export async function excluirForm(req: Request, res: Response) {
    try {
        
    } catch {
        res.status(500).json({sucesso: false, erro: `Erro interno do servidor`})
    }
}