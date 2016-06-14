'use strict';

import * as vscode from 'vscode';

export class SupportedTextDocumentsProvider {
    public static getTextDocuments(): Thenable<vscode.TextDocument[]> {
        return new Promise<vscode.TextDocument[]>(function (resolve, reject) {
            try {
                let textDocuments: vscode.TextDocument[] = [];
                let include = SupportedTextDocumentsProvider.buildIncludeGlobPattern();
                let exclude = SupportedTextDocumentsProvider.buildExcludeGlobPattern();
                vscode.workspace.findFiles(include, exclude).then((uris: vscode.Uri[]) => {
                    uris.forEach((uri: vscode.Uri, index: number, array: vscode.Uri[]) => {
                        vscode.workspace.openTextDocument(uri).then((textDocument: vscode.TextDocument) => {
                            textDocuments.push(textDocument);
                            if (textDocuments.length === uris.length) {
                                resolve(textDocuments);
                            }
                        });
                    });
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }

    private static buildIncludeGlobPattern(): string {
        // TODO: Retrieve from user settings
        return '**/*.css';
    }

    private static buildExcludeGlobPattern(): string {
        // TODO: Retrieve from user settings
        return 'node_modules/**/node_modules/**/*';
    }
}