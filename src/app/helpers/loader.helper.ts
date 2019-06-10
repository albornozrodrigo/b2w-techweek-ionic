import { Injectable, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class LoaderHelper implements OnInit {
    private loader: any;

    constructor(private loading: LoadingController) {
        this.makeLoader();
    }

    ngOnInit() {}

    private async makeLoader() {
        this.loader = await this.loading.create();
    }

    async show() {
        await this.loader.present();
    }

    async hide() {
        await this.loader.dismiss();
    }
}
