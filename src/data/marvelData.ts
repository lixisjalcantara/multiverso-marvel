export interface MarvelProduction {
  id: number;
  tEs: string;
  tEn: string;
  y_in: number;
  y_out: number;
  ty: 'movie' | 'series' | 'oneshot';
  s?: number;
  ep?: number;
  d: number;
  pc: number;
  cr: boolean;
  uni: 'UCM' | 'FOX' | 'SONY' | 'MTV';
  earth: string;
  dir?: string;
  syn?: string;
}

export const marvelData: MarvelProduction[] = [
    // ERA 1: Pasado y Orígenes
    {id: 1, tEs: 'Los ojos de Wakanda', tEn: 'Eyes of Wakanda', y_in: 1000, y_out: 2025, ty: 'series', d: 120, pc: 0, cr: false, uni: 'UCM', earth: '616'},
    {id: 2, tEs: 'Capitán América: El primer vengador', tEn: 'Captain America: The First Avenger', y_in: 1943, y_out: 2011, ty: 'movie', d: 124, pc: 1, cr: true, uni: 'UCM', earth: '616'},
    {id: 3, tEs: 'Agent Carter (One-Shot)', tEn: 'Agent Carter', y_in: 1944, y_out: 2013, ty: 'oneshot', d: 15, pc: 1, cr: false, uni: 'UCM', earth: '616'},
    {id: 4, tEs: 'Agente Carter (T1)', tEn: 'Agent Carter S1', y_in: 1946, y_out: 2015, ty: 'series', d: 336, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 5, tEs: 'Agente Carter (T2)', tEn: 'Agent Carter S2', y_in: 1947, y_out: 2016, ty: 'series', d: 430, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 6, tEs: 'X-Men: Primera Generación', tEn: 'X-Men: First Class', y_in: 1962, y_out: 2011, ty: 'movie', d: 132, pc: 0, cr: true, uni: 'FOX', earth: '10005'},
    {id: 7, tEs: 'Los 4 fantásticos: Primeros pasos', tEn: 'The Fantastic Four: First Steps', y_in: 1964, y_out: 2025, ty: 'movie', d: 130, pc: 2, cr: true, uni: 'UCM', earth: '616'},
    {id: 8, tEs: 'X-Men: Días del futuro pasado', tEn: 'X-Men: Days of Future Past', y_in: 1973, y_out: 2014, ty: 'movie', d: 132, pc: 1, cr: true, uni: 'FOX', earth: '10005'},
    {id: 9, tEs: 'X-Men Orígenes: Lobezno', tEn: 'X-Men Origins: Wolverine', y_in: 1979, y_out: 2009, ty: 'movie', d: 107, pc: 1, cr: false, uni: 'FOX', earth: '10005'},
    {id: 10, tEs: 'Capitana Marvel', tEn: 'Captain Marvel', y_in: 1995, y_out: 2019, ty: 'movie', d: 123, pc: 2, cr: false, uni: 'UCM', earth: '616'},
    
    // ERA 2: Explosión Multiversal
    {id: 11, tEs: 'X-Men', tEn: 'X-Men', y_in: 2000, y_out: 2000, ty: 'movie', d: 104, pc: 0, cr: true, uni: 'FOX', earth: '10005'},
    {id: 12, tEs: 'Spider-Man', tEn: 'Spider-Man', y_in: 2002, y_out: 2002, ty: 'movie', d: 121, pc: 0, cr: true, uni: 'SONY', earth: '96283'},
    {id: 13, tEs: 'Daredevil', tEn: 'Daredevil', y_in: 2003, y_out: 2003, ty: 'movie', d: 103, pc: 0, cr: false, uni: 'FOX', earth: '701306'},
    {id: 14, tEs: 'X-Men 2', tEn: 'X2: X-Men United', y_in: 2003, y_out: 2003, ty: 'movie', d: 134, pc: 0, cr: true, uni: 'FOX', earth: '10005'},
    {id: 15, tEs: 'Hulk', tEn: 'Hulk', y_in: 2003, y_out: 2003, ty: 'movie', d: 138, pc: 0, cr: false, uni: 'UCM', earth: '121698'},
    {id: 16, tEs: 'Madame Web', tEn: 'Madame Web', y_in: 2003, y_out: 2024, ty: 'movie', d: 116, pc: 0, cr: false, uni: 'SONY', earth: '688'},
    {id: 17, tEs: 'Spider-Man 2', tEn: 'Spider-Man 2', y_in: 2004, y_out: 2004, ty: 'movie', d: 127, pc: 0, cr: true, uni: 'SONY', earth: '96283'},
    {id: 18, tEs: 'Elektra', tEn: 'Elektra', y_in: 2005, y_out: 2005, ty: 'movie', d: 97, pc: 0, cr: false, uni: 'FOX', earth: '701306'},
    {id: 19, tEs: 'Los 4 Fantásticos', tEn: 'Fantastic Four', y_in: 2005, y_out: 2005, ty: 'movie', d: 106, pc: 0, cr: true, uni: 'FOX', earth: '58460'},
    {id: 20, tEs: 'X-Men: La decisión final', tEn: 'X-Men: The Last Stand', y_in: 2006, y_out: 2006, ty: 'movie', d: 104, pc: 1, cr: true, uni: 'FOX', earth: '10005'},
    {id: 21, tEs: 'Spider-Man 3', tEn: 'Spider-Man 3', y_in: 2007, y_out: 2007, ty: 'movie', d: 139, pc: 0, cr: false, uni: 'SONY', earth: '96283'},
    {id: 22, tEs: 'Los 4 Fantásticos y Silver Surfer', tEn: 'FF: Rise of the Silver Surfer', y_in: 2007, y_out: 2007, ty: 'movie', d: 92, pc: 1, cr: true, uni: 'FOX', earth: '58460'},

    // ERA 3: Consolidación UCM
    {id: 23, tEs: 'Iron Man', tEn: 'Iron Man', y_in: 2008, y_out: 2008, ty: 'movie', d: 126, pc: 1, cr: true, uni: 'UCM', earth: '616'},
    {id: 24, tEs: 'El increíble Hulk', tEn: 'The Incredible Hulk', y_in: 2008, y_out: 2008, ty: 'movie', d: 112, pc: 1, cr: false, uni: 'UCM', earth: '616'},
    {id: 25, tEs: 'El Consultor (One-Shot)', tEn: 'The Consultant', y_in: 2008, y_out: 2011, ty: 'oneshot', d: 4, pc: 0, cr: false, uni: 'UCM', earth: '616'},
    {id: 26, tEs: 'Iron Man 2', tEn: 'Iron Man 2', y_in: 2010, y_out: 2010, ty: 'movie', d: 124, pc: 1, cr: false, uni: 'UCM', earth: '616'},
    {id: 27, tEs: 'Algo divertido pasó... (One-Shot)', tEn: 'A Funny Thing...', y_in: 2010, y_out: 2011, ty: 'oneshot', d: 4, pc: 0, cr: false, uni: 'UCM', earth: '616'},
    {id: 28, tEs: 'Thor', tEn: 'Thor', y_in: 2011, y_out: 2011, ty: 'movie', d: 115, pc: 1, cr: false, uni: 'UCM', earth: '616'},
    {id: 29, tEs: 'Los Vengadores', tEn: 'The Avengers', y_in: 2012, y_out: 2012, ty: 'movie', d: 143, pc: 2, cr: true, uni: 'UCM', earth: '616'},
    {id: 30, tEs: 'Item 47 (One-Shot)', tEn: 'Item 47', y_in: 2012, y_out: 2012, ty: 'oneshot', d: 12, pc: 1, cr: false, uni: 'UCM', earth: '616'},
    {id: 31, tEs: 'The Amazing Spider-Man', tEn: 'The Amazing Spider-Man', y_in: 2012, y_out: 2012, ty: 'movie', d: 136, pc: 1, cr: true, uni: 'SONY', earth: '120703'},
    {id: 32, tEs: 'Iron Man 3', tEn: 'Iron Man 3', y_in: 2013, y_out: 2013, ty: 'movie', d: 130, pc: 1, cr: false, uni: 'UCM', earth: '616'},
    {id: 33, tEs: 'Todos aclaman al Rey (One-Shot)', tEn: 'All Hail the King', y_in: 2013, y_out: 2014, ty: 'oneshot', d: 14, pc: 1, cr: false, uni: 'UCM', earth: '616'},
    {id: 34, tEs: 'Agents of S.H.I.E.L.D. T1 (Ep. 1-7)', tEn: 'AoS S1 (1-7)', y_in: 2013, y_out: 2013, ty: 'series', d: 294, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 35, tEs: 'Thor: El mundo oscuro', tEn: 'Thor: The Dark World', y_in: 2013, y_out: 2013, ty: 'movie', d: 112, pc: 2, cr: false, uni: 'UCM', earth: '616'},
    {id: 36, tEs: 'Agents of S.H.I.E.L.D. T1 (Ep. 8-16)', tEn: 'AoS S1 (8-16)', y_in: 2013, y_out: 2014, ty: 'series', d: 378, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 37, tEs: 'Capitán América: El Soldado de Invierno', tEn: 'CA: The Winter Soldier', y_in: 2014, y_out: 2014, ty: 'movie', d: 136, pc: 2, cr: false, uni: 'UCM', earth: '616'},
    {id: 38, tEs: 'Agents of S.H.I.E.L.D. T1 (Ep. 17-22)', tEn: 'AoS S1 (17-22)', y_in: 2014, y_out: 2014, ty: 'series', d: 252, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 39, tEs: 'Lobezno Inmortal', tEn: 'The Wolverine', y_in: 2013, y_out: 2013, ty: 'movie', d: 126, pc: 1, cr: false, uni: 'FOX', earth: '10005'},
    {id: 40, tEs: 'The Amazing Spider-Man 2', tEn: 'The Amazing Spider-Man 2', y_in: 2014, y_out: 2014, ty: 'movie', d: 142, pc: 1, cr: true, uni: 'SONY', earth: '120703'},
    {id: 41, tEs: 'Guardianes de la Galaxia', tEn: 'Guardians of the Galaxy', y_in: 2014, y_out: 2014, ty: 'movie', d: 121, pc: 2, cr: false, uni: 'UCM', earth: '616'},
    {id: 42, tEs: 'Guardianes de la Galaxia Vol. 2', tEn: 'Guardians of the Galaxy Vol. 2', y_in: 2014, y_out: 2017, ty: 'movie', d: 136, pc: 5, cr: false, uni: 'UCM', earth: '616'},
    {id: 43, tEs: 'Yo soy Groot', tEn: 'I Am Groot', y_in: 2014, y_out: 2022, ty: 'series', d: 45, pc: 0, cr: false, uni: 'UCM', earth: '616'},
    {id: 44, tEs: 'Daredevil (T1)', tEn: 'Daredevil S1', y_in: 2015, y_out: 2015, ty: 'series', d: 650, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 45, tEs: 'Jessica Jones (T1)', tEn: 'Jessica Jones S1', y_in: 2015, y_out: 2015, ty: 'series', d: 650, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 46, tEs: 'Agents of S.H.I.E.L.D. T2 (Ep. 1-19)', tEn: 'AoS S2 (1-19)', y_in: 2014, y_out: 2015, ty: 'series', d: 810, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 47, tEs: 'Vengadores: La era de Ultrón', tEn: 'Avengers: Age of Ultron', y_in: 2015, y_out: 2015, ty: 'movie', d: 141, pc: 1, cr: true, uni: 'UCM', earth: '616'},
    {id: 48, tEs: 'Agents of S.H.I.E.L.D. T2 (Ep. 20-22)', tEn: 'AoS S2 (20-22)', y_in: 2015, y_out: 2015, ty: 'series', d: 126, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 49, tEs: 'Ant-Man', tEn: 'Ant-Man', y_in: 2015, y_out: 2015, ty: 'movie', d: 117, pc: 2, cr: true, uni: 'UCM', earth: '616'},
    {id: 50, tEs: 'Daredevil (T2)', tEn: 'Daredevil S2', y_in: 2015, y_out: 2016, ty: 'series', d: 650, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 51, tEs: 'Luke Cage (T1)', tEn: 'Luke Cage S1', y_in: 2016, y_out: 2016, ty: 'series', d: 650, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 52, tEs: 'Agents of S.H.I.E.L.D. T3 (Ep. 1-19)', tEn: 'AoS S3 (1-19)', y_in: 2015, y_out: 2016, ty: 'series', d: 810, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    
    // ERA 4: Intersecciones Multiversales
    {id: 53, tEs: 'Cuatro Fantásticos', tEn: 'Fant4stic', y_in: 2015, y_out: 2015, ty: 'movie', d: 100, pc: 0, cr: true, uni: 'FOX', earth: '10005'},
    {id: 54, tEs: 'Deadpool', tEn: 'Deadpool', y_in: 2016, y_out: 2016, ty: 'movie', d: 108, pc: 2, cr: true, uni: 'FOX', earth: '10005'},
    {id: 55, tEs: 'Capitán América: Civil War', tEn: 'Captain America: Civil War', y_in: 2016, y_out: 2016, ty: 'movie', d: 147, pc: 2, cr: true, uni: 'UCM', earth: '616'},
    {id: 56, tEs: 'Agents of S.H.I.E.L.D. T3 (Ep. 20-22)', tEn: 'AoS S3 (20-22)', y_in: 2016, y_out: 2016, ty: 'series', d: 126, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 57, tEs: 'Viuda Negra', tEn: 'Black Widow', y_in: 2016, y_out: 2021, ty: 'movie', d: 134, pc: 1, cr: false, uni: 'UCM', earth: '616'},
    {id: 58, tEs: 'Black Panther', tEn: 'Black Panther', y_in: 2016, y_out: 2018, ty: 'movie', d: 134, pc: 2, cr: false, uni: 'UCM', earth: '616'},
    {id: 59, tEs: 'Spider-Man: Homecoming', tEn: 'Spider-Man: Homecoming', y_in: 2016, y_out: 2017, ty: 'movie', d: 133, pc: 2, cr: false, uni: 'UCM', earth: '616'},
    {id: 60, tEs: 'Iron Fist (T1)', tEn: 'Iron Fist S1', y_in: 2016, y_out: 2017, ty: 'series', d: 650, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 61, tEs: 'Los Defensores (Miniserie)', tEn: 'The Defenders', y_in: 2017, y_out: 2017, ty: 'series', d: 400, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 62, tEs: 'Doctor Strange', tEn: 'Doctor Strange', y_in: 2016, y_out: 2016, ty: 'movie', d: 115, pc: 2, cr: true, uni: 'UCM', earth: '616'},
    {id: 63, tEs: 'Agents of S.H.I.E.L.D. T4 (Ep. 1-8)', tEn: 'AoS S4 (1-8)', y_in: 2016, y_out: 2016, ty: 'series', d: 336, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 64, tEs: 'Agents of S.H.I.E.L.D.: Slingshot', tEn: 'Slingshot', y_in: 2016, y_out: 2016, ty: 'oneshot', d: 30, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 65, tEs: 'Agents of S.H.I.E.L.D. T4 (Ep. 9-22)', tEn: 'AoS S4 (9-22)', y_in: 2017, y_out: 2017, ty: 'series', d: 588, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 66, tEs: 'The Punisher (T1)', tEn: 'The Punisher S1', y_in: 2017, y_out: 2017, ty: 'series', d: 650, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 67, tEs: 'Thor: Ragnarok', tEn: 'Thor: Ragnarok', y_in: 2017, y_out: 2017, ty: 'movie', d: 130, pc: 2, cr: false, uni: 'UCM', earth: '616'},
    {id: 68, tEs: 'Agents of S.H.I.E.L.D. T5 (Ep. 1-19)', tEn: 'AoS S5 (1-19)', y_in: 2017, y_out: 2018, ty: 'series', d: 810, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 69, tEs: 'Venom', tEn: 'Venom', y_in: 2018, y_out: 2018, ty: 'movie', d: 112, pc: 2, cr: false, uni: 'SONY', earth: '688'},
    {id: 70, tEs: 'Ant-Man y la Avispa', tEn: 'Ant-Man and the Wasp', y_in: 2018, y_out: 2018, ty: 'movie', d: 118, pc: 2, cr: true, uni: 'UCM', earth: '616'},
    {id: 71, tEs: 'Deadpool 2', tEn: 'Deadpool 2', y_in: 2018, y_out: 2018, ty: 'movie', d: 119, pc: 4, cr: true, uni: 'FOX', earth: '10005'},
    {id: 72, tEs: 'Vengadores: Infinity War', tEn: 'Avengers: Infinity War', y_in: 2018, y_out: 2018, ty: 'movie', d: 149, pc: 1, cr: true, uni: 'UCM', earth: '616'},
    {id: 73, tEs: 'Agents of S.H.I.E.L.D. T5 (Ep. 20-22)', tEn: 'AoS S5 (20-22)', y_in: 2018, y_out: 2018, ty: 'series', d: 126, pc: 0, cr: false, uni: 'MTV', earth: '616'},
    {id: 74, tEs: 'Agents of S.H.I.E.L.D. (T6 y T7)', tEn: 'AoS S6 & S7', y_in: 2019, y_out: 2020, ty: 'series', d: 1092, pc: 0, cr: false, uni: 'MTV', earth: '616'},

    // ERA 5: Ruptura Multiversal
    {id: 75, tEs: 'Vengadores: Endgame', tEn: 'Avengers: Endgame', y_in: 2023, y_out: 2019, ty: 'movie', d: 181, pc: 0, cr: true, uni: 'UCM', earth: '616'},
    {id: 76, tEs: 'Loki', tEn: 'Loki', y_in: 2023, y_out: 2021, ty: 'series', d: 550, pc: 2, cr: true, uni: 'UCM', earth: 'Fuera del Tiempo'},
    {id: 77, tEs: '¿Qué pasaría si...?', tEn: 'What If...?', y_in: 2023, y_out: 2021, ty: 'series', d: 810, pc: 1, cr: true, uni: 'UCM', earth: 'Multiverso'},
    {id: 78, tEs: 'Bruja Escarlata y Visión', tEn: 'WandaVision', y_in: 2023, y_out: 2021, ty: 'series', d: 350, pc: 2, cr: true, uni: 'UCM', earth: '616'},
    {id: 79, tEs: 'Shang-Chi', tEn: 'Shang-Chi', y_in: 2024, y_out: 2021, ty: 'movie', d: 132, pc: 2, cr: false, uni: 'UCM', earth: '616'},
    {id: 80, tEs: 'Falcon y el Soldado de Invierno', tEn: 'TFATWS', y_in: 2024, y_out: 2021, ty: 'series', d: 300, pc: 1, cr: false, uni: 'UCM', earth: '616'},
    {id: 81, tEs: 'Spider-man: Lejos de casa', tEn: 'Spider-Man: Far From Home', y_in: 2024, y_out: 2019, ty: 'movie', d: 129, pc: 2, cr: false, uni: 'UCM', earth: '616'},
    {id: 82, tEs: 'Venom: Habrá Matanza', tEn: 'Venom: Let There Be Carnage', y_in: 2024, y_out: 2021, ty: 'movie', d: 97, pc: 1, cr: false, uni: 'SONY', earth: '688'},
    {id: 83, tEs: 'Spider-Man: No Way Home', tEn: 'Spider-Man: No Way Home', y_in: 2024, y_out: 2021, ty: 'movie', d: 148, pc: 2, cr: true, uni: 'UCM', earth: '616'},
    {id: 84, tEs: 'Morbius', tEn: 'Morbius', y_in: 2024, y_out: 2022, ty: 'movie', d: 104, pc: 2, cr: false, uni: 'SONY', earth: '688'},
    {id: 85, tEs: 'Doctor Strange 2', tEn: 'Multiverse of Madness', y_in: 2024, y_out: 2022, ty: 'movie', d: 126, pc: 2, cr: true, uni: 'UCM', earth: '616'},
    {id: 86, tEs: 'Ojo de Halcón', tEn: 'Hawkeye', y_in: 2024, y_out: 2021, ty: 'series', d: 270, pc: 1, cr: false, uni: 'UCM', earth: '616'},
    {id: 87, tEs: 'Caballero Luna', tEn: 'Moon Knight', y_in: 2025, y_out: 2022, ty: 'series', d: 280, pc: 1, cr: false, uni: 'UCM', earth: '616'},
    {id: 88, tEs: 'Black Panther: Wakanda Forever', tEn: 'Wakanda Forever', y_in: 2025, y_out: 2022, ty: 'movie', d: 161, pc: 1, cr: false, uni: 'UCM', earth: '616'},
    {id: 89, tEs: 'She-Hulk', tEn: 'She-Hulk', y_in: 2025, y_out: 2022, ty: 'series', d: 280, pc: 1, cr: false, uni: 'UCM', earth: '616'},
    {id: 90, tEs: 'Ms. Marvel', tEn: 'Ms. Marvel', y_in: 2025, y_out: 2022, ty: 'series', d: 280, pc: 1, cr: false, uni: 'UCM', earth: '616'},
    {id: 91, tEs: 'Thor: Love and Thunder', tEn: 'Thor: Love and Thunder', y_in: 2025, y_out: 2022, ty: 'movie', d: 119, pc: 2, cr: false, uni: 'UCM', earth: '616'},
    {id: 92, tEs: 'La maldición del hombre lobo', tEn: 'Werewolf by Night', y_in: 2025, y_out: 2022, ty: 'oneshot', d: 53, pc: 0, cr: false, uni: 'UCM', earth: '616'},
    {id: 93, tEs: 'Especial Felices Fiestas', tEn: 'GotG Holiday Special', y_in: 2025, y_out: 2022, ty: 'oneshot', d: 42, pc: 1, cr: false, uni: 'UCM', earth: '616'},
    {id: 94, tEs: 'Ant-Man y la Avispa: Quantumania', tEn: 'Quantumania', y_in: 2026, y_out: 2023, ty: 'movie', d: 125, pc: 2, cr: true, uni: 'UCM', earth: '616'},
    {id: 95, tEs: 'Guardianes de la Galaxia Vol. 3', tEn: 'GotG Vol. 3', y_in: 2026, y_out: 2023, ty: 'movie', d: 150, pc: 2, cr: false, uni: 'UCM', earth: '616'},
    {id: 96, tEs: 'Invasión secreta', tEn: 'Secret Invasion', y_in: 2026, y_out: 2023, ty: 'series', d: 250, pc: 0, cr: false, uni: 'UCM', earth: '616'},
    {id: 97, tEs: 'The Marvels', tEn: 'The Marvels', y_in: 2026, y_out: 2023, ty: 'movie', d: 105, pc: 1, cr: true, uni: 'UCM', earth: '616'},
    {id: 98, tEs: 'Echo', tEn: 'Echo', y_in: 2025, y_out: 2024, ty: 'series', d: 200, pc: 1, cr: false, uni: 'UCM', earth: '616'},
    {id: 99, tEs: 'Deadpool y Lobezno', tEn: 'Deadpool & Wolverine', y_in: 2024, y_out: 2024, ty: 'movie', d: 127, pc: 1, cr: true, uni: 'UCM', earth: '10005'},
    {id: 100, tEs: 'Kraven el Cazador', tEn: 'Kraven the Hunter', y_in: 2024, y_out: 2024, ty: 'movie', d: 120, pc: 1, cr: false, uni: 'SONY', earth: '688'},
    {id: 101, tEs: 'Venom: El Último Baile', tEn: 'Venom: The Last Dance', y_in: 2024, y_out: 2024, ty: 'movie', d: 120, pc: 2, cr: false, uni: 'SONY', earth: '688'},
    
    // ERA 6: Futuro y Alternos Conectados
    {id: 102, tEs: 'Agatha, ¿Quién si no?', tEn: 'Agatha All Along', y_in: 2026, y_out: 2024, ty: 'series', d: 360, pc: 0, cr: false, uni: 'UCM', earth: '616'},
    {id: 103, tEs: 'Daredevil: Born Again', tEn: 'Daredevil: Born Again', y_in: 2026, y_out: 2025, ty: 'series', d: 800, pc: 0, cr: false, uni: 'UCM', earth: '616'},
    {id: 104, tEs: 'Capitán América: Brave New World', tEn: 'CA: Brave New World', y_in: 2026, y_out: 2025, ty: 'movie', d: 135, pc: 2, cr: false, uni: 'UCM', earth: '616'},
    {id: 105, tEs: 'Thunderbolts*', tEn: 'Thunderbolts*', y_in: 2026, y_out: 2025, ty: 'movie', d: 130, pc: 2, cr: false, uni: 'UCM', earth: '616'},
    {id: 106, tEs: 'Ironheart', tEn: 'Ironheart', y_in: 2026, y_out: 2025, ty: 'series', d: 250, pc: 0, cr: false, uni: 'UCM', earth: '616'},
    {id: 107, tEs: 'Marvel Zombis', tEn: 'Marvel Zombies', y_in: 2026, y_out: 2025, ty: 'series', d: 150, pc: 0, cr: false, uni: 'UCM', earth: 'Multiverso'},
    {id: 108, tEs: 'Wonder Man', tEn: 'Wonder Man', y_in: 2026, y_out: 2026, ty: 'series', d: 300, pc: 0, cr: false, uni: 'UCM', earth: '616'},
    {id: 109, tEs: 'Logan', tEn: 'Logan', y_in: 2029, y_out: 2017, ty: 'movie', d: 137, pc: 0, cr: true, uni: 'FOX', earth: '10005'}
];
