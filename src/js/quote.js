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
            form: $('.form_anime'),
            details: $('.form_anime_solo'),
        }
    }

    initEvents() {
        this.getQuote();
        this.$els.details.on("submit",this.lourd.bind(this));
        this.$els.form.on("submit",this.test.bind(this));

        
    }

    getQuote(anime_name) {

        const api = {
            endpoint: 'https://api.jikan.moe/v3/search/anime?q='+anime_name+'&limit=12',
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
        let mainContainer = document.getElementById("test");

        for (let i = 0; i < quote.length; i++) {
            const anime_img = quote[i].image_url;

            const anime_title = quote[i].title;

            let div = document.createElement("div");
            div.classList.add('anime_container');

            div.innerHTML = '  <p>Name: '+anime_title+ '</p> <form action="" class="form_anime_solo"><input type="hidden" id="anime" name="anime" value='+i+'><input type="image" value="image" src='+anime_img+' width="250px" height="400px" alt="image"></form>';


            mainContainer.appendChild(div);
            this.$els.container.addClass('is-ready');



        }
    }

    test(e){
        e.preventDefault();
        const input = $('#anime').val()
        let mainContainer = document.getElementById("test");
        mainContainer.innerHTML = '';
        console.log("fuck");
        this.getQuote(input)
        
    }

    lourd(e){
        e.preventDefault();
        console.log('ici');
        
    }


}