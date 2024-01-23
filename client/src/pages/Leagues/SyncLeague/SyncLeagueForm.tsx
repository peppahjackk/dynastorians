import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
} from "@mui/material";
import { LeagueFF } from "../../../features/external/fleaflicker/fleaflickerTypes";
import CheckIcon from "@mui/icons-material/Check";
import { CircularProgress } from "@mui/material";

interface LeagueSyncStatus {
  [key: string]: {
    status: "unselected" | "selected" | "syncing" | "success" | "error";
    message: string;
  };
}

const postLeagueSync = async (league: LeagueFF) => {
  console.log("postLeagueSync", league);

  const response = await axios.post("/api/leagues/sync", {
    id: league.id,
    name: league.name,
    external_system: "fleaflicker",
    sport: "NFL",
    owned_team_id: league.owned_team.id
  });

  console.log("response", response);

  return response.data;
};

const buildSyncStatus = (leagues: LeagueFF[]) => {
  const status: LeagueSyncStatus = {};
  leagues.forEach((league) => {
    status[league.id] = {
      status: "selected",
      message: "",
    };
  });

  return status;
};

export const SyncLeagueForm = ({
  data,
  onComplete,
}: {
  data: LeagueFF[];
  onComplete?: () => void;
}) => {
  const [processing, setProcessing] = useState(false);
  const [leagueSyncStatus, setLeagueSyncStatus] = useState<LeagueSyncStatus>(
    buildSyncStatus(data),
  );

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    league: LeagueFF,
  ) => {
    const checked = e.target.checked;
    setLeagueSyncStatus((prev) => {
      return {
        ...prev,
        [league.id]: {
          status: checked ? "selected" : "unselected",
          message: "",
        },
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const promises = Object.entries(leagueSyncStatus)
        .filter(([, syncLeague]) => syncLeague.status === "selected")
        .map(([id]) => {
          const leagueToSync = data.find((l) => l.id.toString() === id);
          if (!leagueToSync) {
            throw new Error(`League ${id} not found`);
          }

          setLeagueSyncStatus((prev) => {
            return {
              ...prev,
              [leagueToSync.id]: {
                status: "syncing",
                message: "",
              },
            };
          });

          return postLeagueSync(leagueToSync).then((payload) => {
            return setLeagueSyncStatus((prev) => {
              return {
                ...prev,
                [leagueToSync.id]: {
                  status: "success",
                  message: payload.message,
                },
              };
            });
          });
        });
      await Promise.all(promises);

      onComplete && onComplete();
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  const CheckboxSubstitue = ({ children }: { children: React.ReactNode }) => (
    <div
      style={{
        height: "42px",
        width: "42px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="column" spacing={2}>
        <FormGroup>
          {Object.entries(leagueSyncStatus).map(([id, leagueSync]) => {
            const leagueStatus = leagueSync.status;
            const league = data.find((l) => l.id === parseInt(id));

            if (!league) {
              throw new Error(`League ${id} not found`);
            }

            if (leagueStatus === "syncing") {
              return (
                <FormControlLabel
                  key={league.id}
                  control={
                    <CheckboxSubstitue>
                      <CircularProgress size={24} />
                    </CheckboxSubstitue>
                  }
                  label={league.name}
                />
              );
            } else if (leagueStatus === "success") {
              return (
                <FormControlLabel
                  key={league.id}
                  control={
                    <CheckboxSubstitue>
                      <CheckIcon />
                    </CheckboxSubstitue>
                  }
                  label={league.name}
                />
              );
            } else if (leagueStatus === "error") {
              return (
                <FormControlLabel
                  key={league.id}
                  control={<div>error</div>}
                  label={league.name}
                />
              );
            } else if (
              leagueStatus !== "unselected" &&
              leagueStatus !== "selected"
            ) {
              throw new Error(
                `Invalid league status: ${leagueStatus} on league ${league.id}`,
              );
            }

            return (
              <FormControlLabel
                key={league.id}
                control={
                  <Checkbox
                    disabled={processing}
                    checked={leagueStatus === "selected"}
                    onChange={(e) => handleCheckboxChange(e, league)}
                  />
                }
                label={league.name}
              />
            );
          })}
        </FormGroup>
        <Button type="submit" variant="contained" disabled={processing}>
          {processing ? "Syncing..." : "Sync"}
        </Button>
      </Stack>
    </form>
  );
};
