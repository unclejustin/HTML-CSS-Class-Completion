'use strict';

import {CssClassDefinition} from './css-class-definition';

export class CssClassesStorage {
    private static classes: CssClassDefinition[] = [];

    public static getClasses(): CssClassDefinition[] {
        return CssClassesStorage.classes;
    }
}