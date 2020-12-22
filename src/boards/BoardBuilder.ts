import {ISpace} from '../ISpace';
import {Random} from '../Random';
import {SpaceBonus} from '../SpaceBonus';
import {SpaceName} from '../SpaceName';
import {SpaceType} from '../SpaceType';

export class BoardBuilder {
    private rng: Random;

    // This builder assumes the map has nine rows, of tile counts [5,6,7,8,9,8,7,6,5].
    //
    // "Son I am able, " she said "though you scare me."
    // "Watch, " said I
    // "Beloved, " I said "watch me scare you though." said she,
    // "Able am I, Son."

    private oceans: Array<boolean> = [];
    private bonuses: Array<Array<SpaceBonus>> = [];
    private spaces: Array<ISpace> = [];
    private unshufflableSpaces: Array<number> = [];

    constructor(seed: number, private includeVenus: boolean) {
      this.spaces.push(new BoardColony(SpaceName.GANYMEDE_COLONY));
      this.spaces.push(new BoardColony(SpaceName.PHOBOS_SPACE_HAVEN));
      this.rng = new Random(seed);
    }

    ocean(...bonus: Array<SpaceBonus>) {
      this.oceans.push(true);
      this.bonuses.push(bonus);
      return this;
    }

    land(...bonus: Array<SpaceBonus>) {
      this.oceans.push(false);
      this.bonuses.push(bonus);
      return this;
    }

    doNotShuffleLastSpace() {
      this.unshufflableSpaces.push(this.oceans.length - 1);
      return this;
    }


    build(): Array<ISpace> {
      const tilesPerRow = [5, 6, 7, 8, 9, 8, 7, 6, 5];
      const idOffset = this.spaces.length + 1;
      let idx = 0;

      for (let row = 0; row < 9; row++) {
        const tilesInThisRow = tilesPerRow[row];
        const xOffset = 9 - tilesInThisRow;
        for (let i = 0; i < tilesInThisRow; i++) {
          const space = this.newTile(idx + idOffset, xOffset + i, row, this.oceans[idx], this.bonuses[idx]);
          this.spaces.push(space);
          idx++;
        }
      }

      this.spaces.push(new BoardColony(SpaceName.STANFORD_TORUS));
      if (this.includeVenus) {
        this.spaces.push(
          new BoardColony(SpaceName.DAWN_CITY),
          new BoardColony(SpaceName.LUNA_METROPOLIS),
          new BoardColony(SpaceName.MAXWELL_BASE),
          new BoardColony(SpaceName.STRATOPOLIS),
        );
      }

      return this.spaces;
    }

    public shuffleArray(array: Array<Object>): void {
      this.unshufflableSpaces.sort((a, b) => a < b ? a : b);
      // Reverseing the indexes so the elements are pulled from the right.
      // Revering the result so elements are listed left to right.
      const spliced = this.unshufflableSpaces.reverse().map((idx) => array.splice(idx, 1)[0]).reverse();
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(this.rng.next() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      for (let idx = 0; idx < this.unshufflableSpaces.length; idx++) {
        array.splice(this.unshufflableSpaces[idx], 0, spliced[idx]);
      }
    }

    // Shuffle the ocean spaces and bonus spaces. But protect the land spaces supplied by
    // |lands| so that those IDs most definitely have land spaces.
    public shuffle(...lands: Array<SpaceName>) {
      this.shuffleArray(this.oceans);
      this.shuffleArray(this.bonuses);
      let safety = 0;
      while (safety < 1000) {
        let satisfy = true;
        for (const land of lands) {
          // Why -3?
          const land_id = Number(land) - 3;
          while (this.oceans[land_id]) {
            satisfy = false;
            const idx = Math.floor(this.rng.next() * (this.oceans.length + 1));
            [this.oceans[land_id], this.oceans[idx]] = [this.oceans[idx], this.oceans[land_id]];
          }
        }
        if (satisfy) return;
        safety++;
      }
      throw new Error('infinite loop detected');
    }

    private newTile(idx: number, pos_x: number, pos_y: number, is_ocean: boolean, bonus: Array<SpaceBonus>) {
      if (is_ocean) {
        return new Ocean(idx, pos_x, pos_y, bonus);
      } else {
        return new Land(idx, pos_x, pos_y, bonus);
      }
    }
}

abstract class Space implements ISpace {
  constructor(public id: string, public spaceType: SpaceType, public bonus: Array<SpaceBonus>, public x: number, public y: number ) {

  }
}

class BoardColony extends Space {
  constructor(id: string) {
    super(id, SpaceType.COLONY, [], -1, -1);
  }
}

class Land extends Space {
  constructor(id: number, x: number, y: number, bonus: Array<SpaceBonus> = []) {
    let str_id = id.toString();
    if (id < 10) {
      str_id = '0'+str_id;
    }
    super(str_id, SpaceType.LAND, bonus, x, y);
  }
}

class Ocean extends Space {
  constructor(id: number, x: number, y: number, bonus: Array<SpaceBonus> = []) {
    let str_id = id.toString();
    if (id < 10) {
      str_id = '0'+str_id;
    }
    super(str_id, SpaceType.OCEAN, bonus, x, y);
  }
}
