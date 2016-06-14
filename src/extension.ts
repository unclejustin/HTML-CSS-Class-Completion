'use strict';

import * as vscode from 'vscode';
import {SupportedTextDocumentsProvider} from "./supported-text-documents-provider";

export function activate(context: vscode.ExtensionContext) {
    let selector: vscode.DocumentFilter = 'html';
    let provider: vscode.CompletionItemProvider = {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.CompletionItem[] {
            return [
                new vscode.CompletionItem("btn"),
                new vscode.CompletionItem("btn-primary"),
                new vscode.CompletionItem("btn-default"),
                new vscode.CompletionItem("btn-lg"),
                new vscode.CompletionItem("btn-md"),
                new vscode.CompletionItem("btn-sm"),
                new vscode.CompletionItem("btn-xs")
            ];
        },
        resolveCompletionItem(item: vscode.CompletionItem, token: vscode.CancellationToken): vscode.CompletionItem {
            return item;
        }
    };
    let disposable = vscode.languages.registerCompletionItemProvider(selector, provider);

    context.subscriptions.push(disposable);
}

export function deactivate() {
}