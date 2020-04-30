import { IParty } from "./parties/IParty";
import { GlobalEventDealer } from "./globalEvents/GlobalEventDealer";
import { IGlobalEvent } from "./globalEvents/IGlobalEvent";
import { SerializedPlayer } from "../SerializedPlayer";

export interface SerializedTurmoil {
    chairman: undefined | SerializedPlayer | "NEUTRAL";
    rulingParty: undefined | IParty;
    dominantParty: undefined | IParty;
    lobby: Set<SerializedPlayer>;
    delegate_reserve: Array<SerializedPlayer | "NEUTRAL">;
    parties: Array<IParty>;
    playersInfluenceBonus: Map<string, number>;
    globalEventDealer: GlobalEventDealer;
    distantGlobalEvent: IGlobalEvent | undefined;
    commingGlobalEvent: IGlobalEvent | undefined;
    currentGlobalEvent: IGlobalEvent | undefined;
}
