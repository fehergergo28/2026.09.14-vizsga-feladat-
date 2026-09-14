import { Resztvevo } from "./resztvevok";
import { RendezvenyTipus } from "./tipusok";

export interface RendezvenyAdat {
  azonosito: string;
  nev: string;
  helyszin: string;
  idopont: Date;
  tipus: RendezvenyTipus;
  resztvevok: Resztvevo[];
  megjegyzes?: string;
}

export class Rendezveny implements RendezvenyAdat {
  public resztvevok: Resztvevo[] = [];

  constructor(
    public azonosito: string,
    public nev: string,
    public helyszin: string,
    public idopont: Date,
    public tipus: RendezvenyTipus,
    public megjegyzes?: string
  ) {}

  resztvevoFelvetele(ember: Resztvevo): void {
    const benneVan = this.resztvevok.some((r) => r.azonosito === ember.azonosito);
    if (benneVan) {
      throw new Error("Ez a résztvevő már szerepel a rendezvényen.");
    }
    this.resztvevok.push(ember);
  }

  resztvevoTorlese(azonosito: string): void {
    this.resztvevok = this.resztvevok.filter((r) => r.azonosito !== azonosito);
  }
}