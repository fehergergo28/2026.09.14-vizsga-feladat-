export interface ResztvevoAdat {
  azonosito: string;
  nev: string;
  email: string;
  telefon?: string;
}

export class Resztvevo implements ResztvevoAdat {
  constructor(
    public azonosito: string,
    public nev: string,
    public email: string,
    public telefon?: string
  ) {}
}