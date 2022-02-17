import $ from 'jquery';
/*
* Objectif : récupérer une citation aléatoire à partir d'une API et l'afficher
*
* Étapes :
* 1- Créer une référence vers les éléments du DOM qu'on va utiliser
* 2- Récupérer une citation aléatoire à partir de l'API de QuotesOnDesign (https://quotesondesign.com/api/)
* 3- Afficher la citation
* */
export default class Quote {
    constructor() {
        this.initEls();
        this.initEvents();
    }

    initEls() {
        this.$els = {
            quoteText: $('.js-quote-text'),
            quoteAuthor: $('.js-quote-author'),
            container: $('.js-container'),
        }
    }

    initEvents() {
        this.getQuote();
    }

    getQuote() {
        const api = {
            endpoint: 'https://api.jikan.moe/v3/search/anime?q=one_piece&limit=12',
            parent: {
                'per_page': 1,
            }
        };
        $.ajaxSetup({cache:false});
        $.getJSON(api.endpoint, api.parent)
            .then((response) => {
                console.log(response['results']);
                this.renderQuote(response['results']);
            })
            .catch((e) => {
                console.log('Quote error: ', e);
            })
    }

    renderQuote(quote){
        let mainContainer = document.getElementById("myData");
        for (let i = 0; i < quote.length; i++) {
            const anime_img = quote[i].image_url;
            let div = document.createElement("div");
            div.classList.add('anime_container');
            div.innerHTML = '<img src='+anime_img+' width="250px" height="400px">';
            mainContainer.appendChild(div);
            this.$els.container.addClass('is-ready');
        }
        let anime_container = document.getElementById("anime_container");
        console.log(anime_container);
        for (let i = 0; i < 12; i++) {
            console.log(i)
            const anime_title = quote[i].title;
            let div = document.createElement("div");
            div.classList.add('anime_title');
            div.innerHTML = 'Name: '+ anime_title;
            anime_container.appendChild(div);
            this.$els.container.addClass('is-ready');
        }

    }
}