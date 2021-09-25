(function () {
    const url = new URL(window.location.href);
    const article = url.searchParams.get('article');
    const markdown = markdownit({
        html: true,
        linkify: true,
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(str, { language: lang }).value;
                } catch (__) { }
            }
            return '';
        }
    }).use(markdownitFootnote).use(markdownitAbbr).use(markdownitEmoji).use(markdownitContainer, 'container', {
        validate: function (params) {
            return true;
        },
        render: function (tokens, idx) {
            if (tokens[idx].nesting === 1) {
                const params = tokens[idx].info.trim();
                if (params === '') return '<div class="container">';

                const i = params.indexOf(' ');
                if (i === -1) return `<div class="container ${params}">`;

                const type = params.slice(0, i);
                const title = params.slice(i);
                return `<div class="container ${type}">` + (title ? `<p class="title">${title}</p>` : '');
            } else {
                return '</div>';
            }
        }
    }).use(markdownItKatexx).use(markdownItAnchor).use(markdownItTocDoneRight, { placeholder: '\\@\\[TOC\\](\\(.*\\))?' });

    fetch('https://yang-le.github.io/articles/' + (article ? article : 'home') + '.md')
        .then(response => {
            return response.text();
        }).then(md => {
            content.innerHTML = markdown.render(md);
        });

    fetch('https://yang-le.github.io/nav.md')
        .then(response => {
            return response.text();
        }).then(md => {
            nav.innerHTML = markdown.render(md);
        });

    KaTeX.innerHTML = katex.renderToString('\\KaTeX');
    year.innerHTML = new Date().getFullYear();
    theme.value = localStorage.getItem('theme');
    theme.setAttribute('onchange', "switchTheme(this.value)");
    switchTheme(theme.value);
})();

function switchTheme(theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme)
}
