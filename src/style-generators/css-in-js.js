const hyph = s => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase();
let stylesheet = null;

const setup = () => {
  stylesheet = stylesheet || document.head.appendChild(
    document.createElement('style'),
  ).sheet;
};

export class Yas {
  constructor(styles, docSheet = null) {
    this.styles = styles;
    this.docSheet = docSheet;
  }

  parseCssRule = (key, value) => `${hyph(key)}: ${value};`;

  keyValToString = o => Object.entries(o)
    .filter(val => val[0].indexOf('&') === -1)
    .reduce((acc, val) => `${acc} ${this.parseCssRule(...val)}`, '')
    .trim();

  parse = (styles = this.styles, atRule = '') =>
    (Object.entries(styles)
      .reduce((acc, [k, v]) => {
        const nextIndex = this.docSheet.rules.length;

        if (typeof v === 'object' && k.indexOf('@') > -1) {
          return `${acc} ${k}{${this.parse(v, k)}}`;
        }

        const ampersands = Object.entries(v).filter(val => val[0].indexOf('&') > -1);
        if (ampersands.length > 0) {
          const transformedAmpersands = ampersands
            .map((ampersand) => {
              const ampersandRules = ampersand[0].split('&');
              const rules = this.keyValToString(ampersand[1]);
              const classSelector = ampersandRules.length > 1 ?
                `${ampersandRules[0].trim()} .${k}${ampersandRules[1]}` : `.${k}${ampersandRules[0]}`;
              const next = `${classSelector} {${rules}}`;
              this.docSheet.insertRule(next, nextIndex);
              return next;
            });
          return `${acc} ${transformedAmpersands.join(' ')}`;
        }

        let nextRules = null;
        let next = null;

        if (atRule.indexOf('@') > -1) {
          nextRules = this.keyValToString(v);
          next = `${atRule} { .${hyph(k)} {${nextRules}} }`;
          this.docSheet.insertRule(next, nextIndex);

          return `${acc} .${hyph(k)} {${nextRules}}`;
        }

        nextRules = this.keyValToString(v);
        next = `.${hyph(k)} {${nextRules}}`;
        this.docSheet.insertRule(next, nextIndex);
        return `${acc} .${hyph(k)} {${nextRules}}`;
      }, '')
    );

  inject = () => {
    if (this.docSheet) {
      this.reset();
    } else if (document && !this.docSheet) {
      this.docSheet = document.head.appendChild(
        document.createElement('style'),
      ).sheet;
    }

    return this.parse();
  }

  reset = () => {
    while (this.docSheet.cssRules.length) {
      this.docSheet.removeRule(0);
    }
  }
}

const createStyleSheet = styles => new Yas(styles, stylesheet);

export default {
  setup,
  createStyleSheet,
};
