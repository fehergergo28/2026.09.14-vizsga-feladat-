import { RendezvenyKezelo } from "./services/rendezvenyKezelo";
import { Resztvevo } from "./models/resztvevok";
import { RendezvenyTipus } from "./models/tipusok";

describe("RendezvenyKezelo", () => {
  test("letrehoz egy fesztivalt", () => {
    const kezelo = new RendezvenyKezelo();
    const fesztival = kezelo.ujRendezveny(
      "Balaton Sound",
      "Zamárdi",
      new Date("2026-07-02"),
      RendezvenyTipus.Fesztival,
      "Zenei fesztivál"
    );

    expect(fesztival.nev).toBe("Balaton Sound");
    expect(fesztival.helyszin).toBe("Zamárdi");
    expect(fesztival.tipus).toBe(RendezvenyTipus.Fesztival);
  });

  test("modositja a szulinap helyszinet", () => {
    const kezelo = new RendezvenyKezelo();
    const szulinap = kezelo.ujRendezveny(
      "Gergő szülinapja",
      "Budapest",
      new Date("2026-05-12"),
      RendezvenyTipus.Szuletesnap
    );

    kezelo.modositas(szulinap.azonosito, { helyszin: "Budapest, bowling pálya" });
    expect(kezelo.keres(szulinap.azonosito).helyszin).toBe("Budapest, bowling pálya");
  });

  test("resztvevoket ad a rendezvenyekhez", () => {
    const kezelo = new RendezvenyKezelo();
    const fesztival = kezelo.ujRendezveny(
      "Balaton Sound",
      "Zamárdi",
      new Date("2026-07-02"),
      RendezvenyTipus.Fesztival
    );
    const koncert = kezelo.ujRendezveny(
      "Azahriah",
      "Budapest Park",
      new Date("2026-09-18"),
      RendezvenyTipus.Koncert
    );

    const gergo = new Resztvevo("1", "Fehér Gergő", "gergo@gmail.com");
    const adam = new Resztvevo("2", "Takács Ádám", "adam@gmail.com");
    const alexandra = new Resztvevo("3", "Soós Alexadra", "alexadra@gmail.com");

    kezelo.resztvevoHozzaadasa(fesztival.azonosito, gergo);
    kezelo.resztvevoHozzaadasa(fesztival.azonosito, adam);
    kezelo.resztvevoHozzaadasa(koncert.azonosito, alexandra);

    expect(fesztival.resztvevok.length).toBe(2);
    expect(koncert.resztvevok[0].nev).toBe("Soós Alexadra");
  });

  test("csak a fesztivalokat listazza", () => {
    const kezelo = new RendezvenyKezelo();
    kezelo.ujRendezveny("Balaton Sound", "Zamárdi", new Date("2026-07-02"), RendezvenyTipus.Fesztival);
    kezelo.ujRendezveny("Gergő szülinapja", "Budapest", new Date("2026-05-12"), RendezvenyTipus.Szuletesnap);
    kezelo.ujRendezveny("Azahriah", "Budapest Park", new Date("2026-09-18"), RendezvenyTipus.Koncert);

    const fesztivalok = kezelo.tipusSzerint(RendezvenyTipus.Fesztival);
    expect(fesztivalok.length).toBe(1);
    expect(fesztivalok[0].nev).toBe("Balaton Sound");
  });
});