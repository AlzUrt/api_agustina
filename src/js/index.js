import '../css/app.scss';
import Background from './background';

class App {
    constructor () {
        this.initApp();
    }

    initApp () {
        new Background();

    }
}

new App();
