/**
 * @file mofron-effect-font/index.js
 * @author simpart
 */
const mf = require('mofron');

/**
 * @class Font
 * @brief font effect class
 */
mf.effect.Font = class extends mf.Effect {
    
    constructor (po, p2) {
        try {
            super();
            this.name('Font');
            this.prmMap('fontName', 'path');
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    fontName (p1, p2) {
        try {
            return this.member(
                'fontName',
                'string',
                ( (undefined !== p1) && (undefined !== p2) ) ? prm + ',' + p2 : p1
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    path (prm) {
        try { return this.member('path', 'string', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    enable (cmp) {
        try {
            mofron.func.setFontFace(this.fontName(), this.path());
            cmp.style({ 'font-family' : this.fontName() });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    disable (cmp) {
        try { cmp.style({ 'font-family' : null }); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.effect.Font;
/* end of file */
