(function () {
    const url = new URL(window.location.href);
    const _article = url.searchParams.get('article');
    const article = _article ? _article : 'home';
    const markdown = markdownit({
        html: true,
        linkify: true,
        highlight: function (str, lang) {
            if (lang == 'agda') lang = 'haskell';
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

    fetch('https://yang-le.github.io/articles/' + article + '.md')
        .then(response => {
            return response.text();
        }).then(md => {
            content.innerHTML = markdown.render(md);
            fetch('https://yang-le.github.io/last_update.json')
            .then(response => {
                return response.json();
            }).then(last_update => {
                const pubdate = new Date(last_update[article] * 1000);
                content.innerHTML += `
                <hr>
                <section><p>
                    <span>发现错误？欢迎<a href="https://github.com/yang-le/yang-le.github.io/edit/master/articles/${article}.md">帮忙修改</a>。</span>
                    <span class="float-right">最后更新: <time pubdate datetime="${pubdate.toISOString()}">${pubdate.toLocaleString()}</time></span>
                </p></section>
                `;

                const heti = new Heti();
                heti.spacingElements(document.querySelectorAll('.heti :not(.katex) *'));
                onload();
            });
        });

    fetch('https://yang-le.github.io/nav.md')
        .then(response => {
            return response.text();
        }).then(md => {
            nav.innerHTML = markdown.render(md);
        });

    var gitalk = new Gitalk({
        clientID: 'ac6a28e474263a4bb7a3',
        clientSecret: 'a21e06f173a63ed87bf54eec7120f171c25bca86',
        repo: 'yang-le.github.io',
        owner: 'yang-le',
        admin: ['yang-le'],
        id: article,                // Ensure uniqueness and length less than 50
        distractionFreeMode: false  // Facebook-like distraction free mode
    })
    gitalk.render('gitalk-container')

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
