'use strict';

import * as vscode from "vscode";
import { fetchCssClassesFromCssFile } from "./fetchingcss";


/**
 * - funções para extrair classes css de um arquivo de uma linguagem específica
 * -- retornar todas as classes encontradas
 * 
 * - função para buscar por todos os arquivos de uma linguagem suportada e enviar cada um dos arquivos para uma função específica de extração de classes, detalhadas acima
 * -- retornar todas as classes encontradas
 * 
 * - função para fazer uma limpeza das classes encontradas, removendo todas as iguais
 * -- retornar todas as classes encontradas, sem repetições
 */

