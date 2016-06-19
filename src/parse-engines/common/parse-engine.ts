'use strict';

import * as vscode from 'vscode';
import {CssClassDefinition} from './../../css-class-definition';

export interface ParseEngine {
    languageId: string;
    parse(textDocument: vscode.TextDocument): CssClassDefinition[];
}