'use strict';

import * as vscode from 'vscode';
import {CssClassesStorage} from './css-classes-storage';
import {SupportedTextDocumentsProvider} from './supported-text-documents-provider';

export function activate(context: vscode.ExtensionContext) {
    let selector: vscode.DocumentFilter = 'html';
    let provider: vscode.CompletionItemProvider = {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.CompletionItem[] {
            let start: vscode.Position = new vscode.Position(position.line, 0);
            let range: vscode.Range = new vscode.Range(start, position);
            let text: string = document.getText(range);

            // Check if the cursor is on a class attribute and retrieve all the css rules in this class attribute
            let rawClasses: RegExpMatchArray = text.match(/class=["|']([\w- ]*$)/);
            if (rawClasses === null) {
                return [];
            }

            // Will store the classes found on the class attribute
            let classesOnAttribute : string[] = [];
            // Regex to extract the classes found of the class attribute
            let classesRegex = /[ ]*([\w-]*)[ ]*/g;
            
            let item : RegExpExecArray = null;
            while ((item = classesRegex.exec(rawClasses[1])) !== null) {
                if (item.index === classesRegex.lastIndex) {
                    classesRegex.lastIndex++;
                }
                if (item !== null && item.length > 0) {
                    classesOnAttribute.push(item.input);
                }
            }
            classesOnAttribute.pop();

            // creates a collection of CompletionItem based on the classes already fetched
            let completionItems : vscode.CompletionItem[] = [];
            let classes = CssClassesStorage.getClasses();
            for (let i = 0; i < classes.length; i++) {
                completionItems.push(new vscode.CompletionItem(classes[i].cssClass));
            }

            // removes from the collection the classes already specified on the class attribute
            for (let i = 0; i < classesOnAttribute.length; i++) {
                for (let j = 0; j < completionItems.length; j++) {
                    if (completionItems[j].label === classesOnAttribute[i]) {
                        completionItems.splice(j, 1);
                    }
                }
            }

            return completionItems;
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