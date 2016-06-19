'use strict';

import * as vscode from 'vscode';

export class CssClassDefinition {
    public constructor(public cssClass: string, public location: vscode.Location) { }
}