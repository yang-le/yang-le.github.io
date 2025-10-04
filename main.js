import markdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it/+esm'
import markdownItAnchor from 'https://cdn.jsdelivr.net/npm/markdown-it-anchor/+esm'
import markdownItKatex from 'https://cdn.jsdelivr.net/npm/@vscode/markdown-it-katex/+esm'
import markdownItTocDoneRight from 'https://cdn.jsdelivr.net/npm/markdown-it-toc-done-right/+esm'
import markdownItFootnote from 'https://cdn.jsdelivr.net/npm/markdown-it-footnote/+esm'
import { full as markdownItEmoji } from 'https://cdn.jsdelivr.net/npm/markdown-it-emoji/+esm'
import markdownItAbbr from 'https://cdn.jsdelivr.net/npm/markdown-it-abbr/+esm'
import markdownItContainer from 'https://cdn.jsdelivr.net/npm/markdown-it-container/+esm'

import hljs from 'https://cdn.jsdelivr.net/npm/highlight.js/+esm'
import hljsLean from 'https://cdn.jsdelivr.net/npm/highlightjs-lean/+esm'
hljs.registerLanguage('lean', hljsLean)

import Gitalk from 'https://cdn.jsdelivr.net/npm/gitalk/+esm'

const url = new URL(window.location.href);
const _article = url.searchParams.get('article');
const article = _article ? _article : 'home';
const markdown = markdownIt({
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
})
    .use(markdownItFootnote)
    .use(markdownItAbbr)
    .use(markdownItEmoji)
    .use(markdownItContainer, 'container', {
        validate: function (params) {
            return true;
        },
        render: function (tokens, idx) {
            if (tokens[idx].nesting === 1) {
                const params = tokens[idx].info.trim();
                if (params === '') return '<div class="card">';

                const i = params.indexOf(' ');
                if (i === -1) return `<div class="card ${params}">`;

                const type = params.slice(0, i);
                const title = params.slice(i);
                return `<div class="card ${type}">` + (title ? `<p>${title}</p>` : '');
            } else {
                return '</div>';
            }
        }
    })
    .use(markdownItKatex.default)
    .use(markdownItAnchor)
    .use(markdownItTocDoneRight, { placeholder: '\\@\\[TOC\\](\\(.*\\))?' });

fetch('https://yang-le.github.io/articles/' + article + '.md')
    .then(response => {
        return response.text();
    }).then(md => {
        const content = document.getElementById('content');
        content.innerHTML = markdown.render(md);
        fetch('https://yang-le.github.io/last_update.json')
            .then(response => {
                return response.json();
            }).then(last_update => {
                var isoString = "";
                var localeString = "N/A";
                const lastUpdate = last_update[article];
                if (lastUpdate) {
                    const pubdate = new Date(lastUpdate * 1000);
                    isoString = pubdate.toISOString();
                    localeString = pubdate.toLocaleString();
                }
                content.innerHTML += `
                <hr>
                <section><p>
                    <span>发现错误？欢迎<a href="https://github.com/yang-le/yang-le.github.io/edit/master/articles/${article}.md">帮忙修改</a>。</span>
                    <span class="float-right">最后更新: <time pubdate datetime="${isoString}">${localeString}</time></span>
                </p></section>
                `;
            });

        Array.from(document.getElementsByClassName('katex')).forEach(element => {
            element.classList.add('heti-skip');
        });
        const heti = new Heti();
        heti.autoSpacing();
    });

fetch('https://yang-le.github.io/nav.md')
    .then(response => {
        return response.text();
    }).then(md => {
        const nav = document.getElementById('nav');
        nav.innerHTML = markdown.render(md);
    });

const KaTeX = document.getElementById('KaTeX');
KaTeX.innerHTML = markdown.renderInline('$\\KaTeX$');

const year = document.getElementById('year');
year.innerHTML = new Date().getFullYear();

const theme = document.getElementById('theme');
theme.value = localStorage.getItem('theme');
theme.addEventListener('change', ev => switchTheme(ev.target.value));
switchTheme(theme.value);

var giscus = document.querySelector("script[src*=giscus]");
giscus.setAttribute("data-theme", theme.value == 'dark' ? 'transparent_dark' : 'light')

function switchTheme(theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.dataset.theme = theme;

    var frame = document.querySelector(".giscus-frame");
    frame.contentWindow.postMessage(
        { giscus: { setConfig: { theme: theme == 'dark' ? 'transparent_dark' : 'light' } } },
        "https://giscus.app"
    );
}
