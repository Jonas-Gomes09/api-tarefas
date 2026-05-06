// Que será salva no dados/tarefas.json
export interface Tarefa {

    id: number;
    
    titulo: string;
    
    descricao: string;
    
    prioridade: "alta" | "media" | "baixa";
    
    concluida: boolean;
    
    dataCriacao: string;
    
    }
    
    // POST
    export interface CriarTarefaBody {
    
    titulo: string; // obrigatório
    
    descricao?: string; // opcional
    
    prioridade: "alta" | "media" | "baixa"; // obrigatório
    
    }
    
    // PUT
    export interface AtualizarTarefaBody {
    
    titulo?: string; descricao?: string;
    
    prioridade?: "alta" | "media" | "baixa";
    
    concluida?: boolean;
    
    }
    
    // GET - Parâmetro (ID) da requisição
    export interface TarefaParams { id: string; }
    
    // GET - Filtragem
    export interface FiltroQuery { concluida?: string; prioridade?: string; }
    
    // ApiResponse
    export interface ApiResponse<T> { sucesso: boolean; dados?: T; erro?: string; erros?: string[]; }