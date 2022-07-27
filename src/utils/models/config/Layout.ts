import { Container } from './Container';
import { Sidenav } from './Sidenav';
import { Toolbar } from './Toolbar';

export class Layout {
    generic_container: Container;
    sidenav: Sidenav;
    toolbar: Toolbar;

    constructor() {
        this.generic_container = new Container();
        this.sidenav = new Sidenav();
        this.toolbar = new Toolbar();
    }
}
