'use strict';

import * as vscode from 'vscode';
import {CssClassDefinition} from './parse-engines/common/css-class-definition';
import {ParseEngine} from './parse-engines/common/parse-engine';
import {ParseEngineRegistry} from './parse-engine-registry';

export class ParseEngineGateway {
    public static callParser(textDocument: vscode.TextDocument): CssClassDefinition[] {
        let parseEngine: ParseEngine = ParseEngineRegistry.getParseEngine(textDocument.languageId);
        let cssClassDefinitions: CssClassDefinition[] = parseEngine.parse(textDocument);
        return cssClassDefinitions;
    }
}