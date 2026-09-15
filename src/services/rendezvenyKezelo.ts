import { Rendezveny } from "../models/rendezveny";
import { Resztvevo } from "../models/resztvevok";
import { RendezvenyTipus } from "../models/tipusok";
import { ujAzonosito } from "../utils/id";

export class RendezvenyKezelo {
  private rendezvenyek: Rendezveny[] = [];

  ujRendezveny(
    nev: string,
    helyszin: string,
    idopont: Date,
    tipus: RendezvenyTipus,
    megjegyzes?: string
  ): Rendezveny {
    const uj = new Rendezveny(
      ujAzonosito("rendezveny"),
      nev,
      helyszin,
      idopont,
      tipus,
      megjegyzes
    );
    this.rendezvenyek.push(uj);
    return uj;
  }

  modositas(
    azonosito: string,
    adatok: {
      nev?: string;
      helyszin?: string;
      idopont?: Date;
      tipus?: RendezvenyTipus;
      megjegyzes?: string;
    }
  ): Rendezveny {
    const r = this.keres(azonosito);
    if (adatok.nev) r.nev = adatok.nev;
    if (adatok.helyszin) r.helyszin = adatok.helyszin;
    if (adatok.idopont) r.idopont = adatok.idopont;
    if (adatok.tipus) r.tipus = adatok.tipus;
    if (adatok.megjegyzes) r.megjegyzes = adatok.megjegyzes;
    return r;
  }

  torles(azonosito: string): void {
    this.rendezvenyek = this.rendezvenyek.filter((r) => r.azonosito !== azonosito);
  }

  keres(azonosito: string): Rendezveny {
    const talalat = this.rendezvenyek.find((r) => r.azonosito === azonosito);
    if (!talalat) {
      throw new Error("Nincs ilyen rendezvény.");
    }
    return talalat;
  }

  listazas(): Rendezveny[] {
    return this.rendezvenyek;
  }

  tipusSzerint(tipus: RendezvenyTipus): Rendezveny[] {
    return this.rendezvenyek.filter((r) => r.tipus === tipus);
  }

  resztvevoHozzaadasa(rendezvenyId: string, ember: Resztvevo): void {
    this.keres(rendezvenyId).resztvevoFelvetele(ember);
  }

  resztvevoEltavolitasa(rendezvenyId: string, resztvevoId: string): void {
    this.keres(rendezvenyId).resztvevoTorlese(resztvevoId);
  }
}