import {PlayerId} from './Player';
import {CardName} from './CardName';
import {Color} from './Color';
import {SerializedCard} from './SerializedCard';
import {VictoryPointsBreakdown} from './VictoryPointsBreakdown';
import {SerializedTimer} from './SerializedTimer';

export interface SerializedPlayer {
    actionsTakenThisRound: number;
    actionsThisGeneration: Array<CardName>;
    beginner: boolean;
    canUseHeatAsMegaCredits: boolean;
    cardCost: number;
    cardDiscount: number;
    cardsInHand: Array<CardName>;
    colonyTradeDiscount: number;
    colonyTradeOffset: number;
    colonyVictoryPoints: number;
    color: Color;
    corporationCard: SerializedCard | undefined;
    corporationInitialActionDone: boolean;
    dealtCorporationCards: Array<CardName>;
    dealtPreludeCards: Array<CardName>;
    dealtProjectCards: Array<CardName>;
    draftedCards: Array<CardName>;
    energy: number;
    energyProduction: number;
    fleetSize: number;
    handicap: number;
    hasIncreasedTerraformRatingThisGeneration: boolean;
    hasTurmoilScienceTagBonus: boolean;
    heat: number;
    heatProduction: number;
    id: string;
    lastCardPlayed?: CardName;
    megaCreditProduction: number;
    megaCredits: number;
    name: string;
    needsToDraft: boolean | undefined;
    oceanBonus: number;
    pickedCorporationCard: CardName | undefined;
    plantProduction: number;
    plants: number;
    plantsNeededForGreenery: number;
    playedCards: Array<SerializedCard>;
    politicalAgendasActionUsedCount: number;
    preludeCardsInHand: Array<CardName>;
    removedFromPlayCards: Array<CardName>;
    removingPlayers: Array<PlayerId>;
    scienceTagCount: number;
    steel: number;
    steelProduction: number;
    steelValue: number;
    terraformRating: number;
    terraformRatingAtGenerationStart: number;
    timer: SerializedTimer;
    titanium: number;
    titaniumProduction: number;
    titaniumValue: number;
    tradesThisTurn: number;
    turmoilPolicyActionUsed: boolean;
    usedUndo: boolean;
    victoryPointsBreakdown: VictoryPointsBreakdown;
}
