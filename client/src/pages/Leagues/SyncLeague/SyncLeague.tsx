import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { Layout } from "../../../components/Layout";
import { useAuth } from "../../../features/auth/useAuth";
import { useUserLeaguesFFQuery } from "../../../features/external/fleaflicker/useUserLeagues";
import { SyncLeagueForm } from "./SyncLeagueForm";
import { useNavigate } from "react-router-dom";
import { useManagersQuery } from "../../../features/managers/useManagersQuery";
import { Manager } from "../../../features/managers/managerTypes";
import { AddNewManager } from "../../../features/managers/AddNewManager";

export const SyncLeague = () => {
  const [selectedManager, setSelectedManager] = useState<string>("");
  const { user } = useAuth();
  const userId = user?._id ?? undefined;
  const { data: managersData, refetch: refetchManagers } = useManagersQuery({
    userId: userId ? userId.toString() : undefined,
  });
  const managerObject = managersData
    ? managersData.find((manager: Manager) => manager._id === selectedManager)
    : null;
  const { data, isLoading, error } = useUserLeaguesFFQuery({
    email: managerObject?.email ?? undefined,
  });
  const navigate = useNavigate();

  if (user == null) {
    return <div></div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const newManagerMode = selectedManager === "NEW_MANAGER";

  return (
    <Layout title="Sync Leagues">
      <Typography variant="body1">
        Select a manager to sync leagues from{" "}
        <span
          style={{
            background: "#333",
            fontFamily: "monospace",
            padding: "4px 8px",
          }}
        >
          Fleaflicker
        </span>
      </Typography>
      <FormControl fullWidth>
        {managersData && managersData.length >= 0 && !newManagerMode && (
          <Select
            value={selectedManager}
            onChange={(e) => setSelectedManager(e.target.value)}
          >
            {managersData?.map((manager: Manager) => (
              <MenuItem key={manager._id} value={manager._id}>
                {manager.email || manager.username || "Unknown"}
              </MenuItem>
            ))}
            <MenuItem key="new" value="NEW_MANAGER">
              + Add new manager
            </MenuItem>
          </Select>
        )}
      </FormControl>
      {selectedManager && newManagerMode && (
        <AddNewManager
          userId={user._id.toString()}
          externalSystem="fleaflicker"
          onCancel={() => setSelectedManager("")}
          onComplete={() => {
            refetchManagers();
            setSelectedManager("");
          }}
        />
      )}
      {data && (
        <SyncLeagueForm data={data} manager={managersObject} onComplete={() => navigate("/leagues")} />
      )}
    </Layout>
  );
};
