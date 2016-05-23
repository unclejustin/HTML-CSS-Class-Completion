'use strict';

import * as vscode from 'vscode';
import * as css from 'css';

export function activate(context: vscode.ExtensionContext): void {
    let classes: string[];

    function fetchAllCssRulesInCssFiles(): void {
        vscode.window.showInformationMessage('HTML CSS Class Completion: Fetching CSS rules from CSS files, please wait.');
        // fetches the css files excluding the ones within node_modules folders that are within another node_modules folder
        vscode.workspace.findFiles('**/*.css', 'node_modules/**/node_modules/**/*').then(uris => {
            // will contain all the css files concatenated
            let cssFilesConcatenated: string = '';
            // goes through each css file found and open it
            uris.forEach((uri: vscode.Uri, index: number) => {
                vscode.workspace.openTextDocument(uri).then((value: vscode.TextDocument) => {
                    // extracts the text of the file and concatenates it
                    cssFilesConcatenated += value.getText();
                    if (uris.length == index + 1) {
                        // after finishing the process the css classes are fetched from this large string and added to the classes array
                        fetchClasses(cssFilesConcatenated, classes);
                        vscode.window.showInformationMessage("HTML CSS Class Completion: Finished fetching CSS rules from CSS files.");
                    }
                });
            });
        });
    }

    function fetchClasses(text: string, classes: string[]): string[] {
        let parsedCss: css.Stylesheet = css.parse(text);

        // go through each of the rules...
        parsedCss.stylesheet.rules.forEach((rule: css.Rule) => {
            // ...of type rule
            if (rule.type === 'rule') {
                // go through each of the selectors of the current rule 
                rule.selectors.forEach((selector: string) => {
                    let classesRegex: RegExp = /[.]([\w-]+)/g;
                    let tempClasses: string[] = [];
                    let item: RegExpExecArray;

                    // check if the current selector contains class names
                    while (item = classesRegex.exec(selector)) {
                        tempClasses.push(item.input);
                    }

                    if (tempClasses.length > 0) {
                        // extract class names specified on the current selector
                        // and then go through each of them
                        tempClasses.forEach((className: string) => {
                            // check if the current class name is not in the classes array
                            if (classes.indexOf(className) === -1) {
                                // if so adds it to it
                                classes.push(className);
                            }
                        });
                    }
                });
            }
        });

        return classes;
    }

    let disposable = vscode.languages.registerCompletionItemProvider('html', {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) : vscode.CompletionItem[] {
            let start: vscode.Position = new vscode.Position(position.line, 0);
            let range: vscode.Range = new vscode.Range(start, position);
            let text: string = document.getText(range);

            // check if the cursor is on a class attribute and retrieve all the css rules in this class attribute
            let rawClasses: RegExpMatchArray = text.match(/class=["|']([\w- ]*$)/);
            if (rawClasses === null) {
                return [];
            }

            // will store the classes found on the class attribute
            let classesOnAttribute : string[] = [];
            // regex to extract the classes found of the class attribute
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
            for (let i = 0; i < classes.length; i++) {
                completionItems.push(new vscode.CompletionItem(classes[i]));
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
    });

    context.subscriptions.push(disposable);
    fetchAllCssRulesInCssFiles();
}

export function deactivate(): void {
}