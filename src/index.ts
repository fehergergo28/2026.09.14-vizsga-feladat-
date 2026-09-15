import { RendezvenyKezelo } from "./services/rendezvenyKezelo";
import { Resztvevo } from "./models/resztvevok";
import { RendezvenyTipus } from "./models/tipusok";
import { ujAzonosito } from "./utils/id";

const kezelo = new RendezvenyKezelo();

const fesztival = kezelo.ujRendezveny(
  "Balaton Sound",
  "Zamárdi",
  new Date("2026-07-02"),
  RendezvenyTipus.Fesztival,
  "Zenei fesztivál"
);

const szulinap = kezelo.ujRendezveny(
  "Gergő szülinapja",
  "Budapest",
  new Date("2026-05-12"),
  RendezvenyTipus.Szuletesnap
);

const koncert = kezelo.ujRendezveny(
  "Azahriah",
  "Budapest Park",
  new Date("2026-09-18"),
  RendezvenyTipus.Koncert
);

const gergo = new Resztvevo(ujAzonosito("resztvevo"), "Fehér Gergő", "gergo@gmail.com");
const adam = new Resztvevo(ujAzonosito("resztvevo"), "Takács Ádám", "adam@gmail.com");
const alexandra = new Resztvevo(ujAzonosito("resztvevo"), "Soós Alexadra", "alexadra@gmail.com");

kezelo.resztvevoHozzaadasa(fesztival.azonosito, gergo);
kezelo.resztvevoHozzaadasa(fesztival.azonosito, adam);
kezelo.resztvevoHozzaadasa(szulinap.azonosito, gergo);
kezelo.resztvevoHozzaadasa(koncert.azonosito,alexandra);

kezelo.modositas(szulinap.azonosito, { helyszin: "Budapest, bowling pálya" });

console.log("Összes rendezvény:");
for (const r of kezelo.listazas()) {
  console.log(r.nev + " - " + r.helyszin + " - " + r.tipus);
  console.log("Résztvevők: " + r.resztvevok.map((p) => p.nev).join(", "));
}

console.log("\nFesztiválok:");
for (const r of kezelo.tipusSzerint(RendezvenyTipus.Fesztival)) {
  console.log(r.nev);
}