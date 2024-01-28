import React, { useState } from "react";
import { Button, FormControl, Input, Stack } from "@mui/material";
import { useAddManagerMutation } from "./useManagersQuery";
import { Manager } from "./managerTypes";

export const AddNewManager = ({
  onComplete,
  onCancel,
  externalSystem,
  userId,
}: {
  onComplete: (manager: Manager) => void;
  onCancel: () => void;
  externalSystem: string;
  userId: string;
}) => {
  const [newManager, setNewManager] = useState<string>("");
  const addManager = useAddManagerMutation();

  const handleAddNewManager = async () => {
    try {
      const newManagerResource = await addManager.mutateAsync({
        email: newManager,
        externalSystem,
        userId,
      });

      onComplete(newManagerResource);
      setNewManager("");
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <FormControl>
      <Stack spacing={2}>
        <Input
          placeholder="Email"
          type="email"
          value={newManager}
          onChange={(e) => setNewManager(e.target.value)}
        />
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button
            variant="outlined"
            onClick={() => {
              setNewManager("");
              onCancel && onCancel();
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddNewManager}>
            Add
          </Button>
        </Stack>
      </Stack>
    </FormControl>
  );
};
