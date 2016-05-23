'use strict';

import * as vscode from "vscode";
import * as css from "css";

import { Seeker } from "./seeker";

export class CssSeeker implements Seeker {
    seek(): string[] {
        return [];
    }
}