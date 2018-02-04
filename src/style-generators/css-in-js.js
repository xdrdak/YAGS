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
    .reduce((acc, val) => `${acc} ${this.parseCssRule(...val)}`, '')
    .trim();

  parse = (styles = this.styles, atRule = '') =>
    (Object.entries(styles)
      .reduce((acc, [k, v]) => {
        if (typeof v === 'object' && k.indexOf('@') > -1) {
          return `${acc} ${k}{${this.parse(v, k)}}`;
        }

        const nextRules = this.keyValToString(v);
        let next = `.${hyph(k)} {${nextRules}}`;

        if (atRule) {
          next = `${atRule} { .${hyph(k)} {${nextRules}} }`;
        }

        const nextIndex = this.docSheet.rules.length;
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
