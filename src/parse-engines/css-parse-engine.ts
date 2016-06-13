'use strict';

import * as vscode from 'vscode';
import {CssClassDefinition} from './common/css-class-definition';
import {ParseEngine} from './common/parse-engine';

export class CssParseEngine implements ParseEngine {
    public languageId: string = 'css';
    
    public parse(textDocument: vscode.TextDocument): CssClassDefinition[] {
        let definitions: CssClassDefinition[] = [
            new CssClassDefinition('btn', new vscode.Location(vscode.Uri.file('qwe.css'), new vscode.Position(1, 1))),
            new CssClassDefinition('btn-primary', new vscode.Location(vscode.Uri.file('qwe.css'), new vscode.Position(1, 1))),
            new CssClassDefinition('btn-large', new vscode.Location(vscode.Uri.file('qwe.css'), new vscode.Position(1, 1)))
        ];

        return definitions;
    }
}