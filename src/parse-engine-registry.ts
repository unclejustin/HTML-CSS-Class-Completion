'use strict';

import {ParseEngine} from './parse-engines/common/parse-engine';
import {CssParseEngine} from './parse-engines/css-parse-engine';

export class ParseEngineRegistry {
    private static registry: ParseEngine[] = [
        new CssParseEngine()
    ];

    public static getParseEngine(languageId: string): ParseEngine {
        if (!ParseEngineRegistry.registry.hasOwnProperty(languageId)) {
            throw `Could not find a parse engine for the language id "${languageId}".`;
        }

        let parseEngine: ParseEngine = ParseEngineRegistry.registry.find((value: ParseEngine, index: number, obj: ParseEngine[]) => {
            return value.languageId === languageId;
        });

        return parseEngine;
    }
}