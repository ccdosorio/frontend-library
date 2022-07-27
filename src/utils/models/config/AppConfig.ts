import { Layout } from './Layout';

export class AppConfig {
    colorTheme: string | undefined;
    layout: Layout;

    constructor() {
        this.colorTheme = undefined;
        this.layout = new Layout();
    }
}
