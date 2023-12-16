import React, { ChangeEvent, useState } from "react";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { LeagueFF } from "../../../features/external/fleaflicker/fleaflickerTypes";

export const SyncLeagueForm = ({ data }: { data: LeagueFF[] }) => {
  const [leaguesToSync, setLeaguesToSync] = useState(data);

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    league: LeagueFF,
  ) => {
    const checked = e.target.checked;
    const exists = leaguesToSync.some(
      (leagueInState: LeagueFF) => leagueInState.id === league.id,
    );

    if (checked && !exists) {
      leaguesToSync.push(league);
    } else if (!checked && exists) {
      // Remove league from leaguesToSync
      setLeaguesToSync((prev) => {
        return prev.filter((leagueInState) => leagueInState.id !== league.id);
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        {data?.map((league: LeagueFF) => {
          const isChecked = leaguesToSync.some((leagueFromData) => {
            leagueFromData.id === league.id;
          });

          return (
            <FormControlLabel
              key={league.id}
              control={
                <Checkbox
                  defaultChecked
                  value={isChecked}
                  onChange={(e) => handleCheckboxChange(e, league)}
                />
              }
              label={league.name}
            />
          );
        })}
      </FormGroup>
      <Button type="submit">Sync</Button>
    </form>
  );
};
