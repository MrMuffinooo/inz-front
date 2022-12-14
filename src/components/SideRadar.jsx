import React from "react";
import { useContext } from "react";
import styled from "styled-components";

import { GameContext, RoundContext } from "../utils/Contexts";
import { PlayerStatus } from "./PlayerStatus";

const Container = styled.div`
  min-width: 170px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export function SideRadar({ isLeft, tick }) {
  const game = useContext(GameContext);
  const round = useContext(RoundContext);

  const listPlayers = (array) => {
    return array
      .sort((a, b) => {
        return a.id - b.id;
      })
      .filter((p) => {
        if (isLeft) {
          return p.team === "CT";
        }
        return p.team === "T";
      })
      .map((p) => {
        return (
          <PlayerStatus
            no={p.id}
            key={p.id}
            name={p.name}
            hp={p.hp[tick]}
            isLeft={isLeft}
            isT={p.team === "T"}
            primaryWeapon={p.mainWeapon[tick]}
            hasArmor={p.hasArmor}
            hasHelmet={p.hasHelmet}
            hasDef={p.hasDef[tick]}
            rating={Math.round(p.sumRating * 1000) / 10}
            ratings={p.ratings}
          />
        );
      });
  };
  if (!round.players || !game.teams) {
    return <Container></Container>;
  }
  return <Container>{listPlayers(round.players)}</Container>;
}
